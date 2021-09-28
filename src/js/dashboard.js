var _dashboard = {

    days: 15,
    readMessages: false,
    dataSetProjectRaised: [],

    render: function() {
        _content.title("Dashboard", "");
        _content.header("<select style='margin-top: 5px' onchange=\"_dashboard.days=$(this).val();_dashboard.init()\"><option value='15'>Ultimi 15 giorni</option><option value='30'>Ultimi 30 giorni</option><option value='60'>Ultimi 60 giorni</option><option value='90'>Ultimi 90 giorni</option><option value='120'>Ultimi 120 giorni</option></select>");
        $("#main-content").load("pages/dashboard.html", function() {
            _dashboard.init();
        });
    },

    init: function() {

        $('.dash-days').text(this.days);
        $('#recap-project-live').html("");
        $('#recap-project-archive').html("");
        $('.content-header select').val(this.days);

        _system.database.ref("users").once('value').then(function(data) {
            var items = data.val();
            var itemsLatestDays = 0;
            $('#totals-users').text(data.numChildren());
            for (key in items) {
                var item = items[key];
                if (item.created_at > new Date(_system.dateNow()).getTime() - (86400000 * _dashboard.days)) itemsLatestDays++;
            }
            $('#totals-users-last-month').text(itemsLatestDays);
        });

        $('#recap-project-live').html("");
        _system.database.ref("projects").once('value').then(function(data) {
            var totProjects = data.numChildren();
            var totProjectsLive = 0;
            var totProjectsFunded = 0;
            var totProjectsNotFunded = 0;
            var totProjectsValidation = 0;
            var items = data.val();
            for (key in items) {
                var item = items[key];
                if (item.status == "live") {
                    totProjectsLive++;
                    _dashboard.renderProjectStatus(key, item, undefined, undefined, "LIVE");
                }
                if (item.status == "funded") {
                    totProjectsFunded++;
                    _dashboard.renderProjectStatus(key, item, "aqua", "recap-project-archive", "FUNDED");
                }
                if (item.status == "notfunded") {
                    totProjectsNotFunded++;
                    _dashboard.renderProjectStatus(key, item, "red", "recap-project-archive", "NOTFUNDED");
                }
                if (item.status == "submitted") totProjectsValidation++;
            }
            $('#totals-projects').text(totProjects);
            $('#totals-projects-live').text(totProjectsLive);
            $('#totals-projects-funded').text(totProjectsFunded);
            $('#totals-projects-notfunded').text(totProjectsNotFunded);
            if (totProjectsValidation > 0) _dashboard.renderMessageValidation(totProjectsValidation);
            var projects = items;

            _system.database.ref("transactions").once('value').then(function(data) {
                var items = data.val();
                var totDonations = 0;
                var totDonationsMonth = 0;
                var totDonationsConfirmed = 0;
                var totDonationsConfirmedMonth = 0;
                var totDonationsPending = 0;
                var totDonationsPendingMonth = 0;
                var totDonationsFailed = 0;
                var totDonationsFailedMonth = 0;
                for (key in items) {
                    var item = items[key];
                    var amount = item['amount'];
                    totDonations += parseInt(amount);
                    if (item.created_at > new Date(_system.dateNow()).getTime() - (86400000 * _dashboard.days)) totDonationsMonth += parseInt(amount);
                    if (item.payment_status == "confirmed") totDonationsConfirmed += parseInt(amount);
                    if (item.payment_status == "pending") totDonationsPending += parseInt(amount);
                    if (item.payment_status == "failed") totDonationsFailed += parseInt(amount);
                    if (item.payment_status == "confirmed" && item.created_at > new Date(_system.dateNow()).getTime() - (86400000 * _dashboard.days)) totDonationsConfirmedMonth += parseInt(amount);
                    if (item.payment_status == "pending" && item.created_at > new Date(_system.dateNow()).getTime() - (86400000 * _dashboard.days)) totDonationsPendingMonth += parseInt(amount);
                    if (item.payment_status == "failed" && item.created_at > new Date(_system.dateNow()).getTime() - (86400000 * _dashboard.days)) totDonationsFailedMonth += parseInt(amount);
                }

                $('#totals-transactions').text(totDonations);
                $('#totals-transactions-last-month').text(totDonationsMonth);
                $('#totals-transactions-confirmed').text(totDonationsConfirmed);
                $('#totals-transactions-pending').text(totDonationsPending);
                $('#totals-transactions-failed').text(totDonationsFailed);
                $('#totals-transactions-confirmed-last-month').text(totDonationsConfirmedMonth);
                $('#totals-transactions-pending-last-month').text(totDonationsPendingMonth);
                $('#totals-transactions-failed-last-month').text(totDonationsFailedMonth);

                var dataGraph = {
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            data: [totDonationsConfirmed, totDonationsPending, totDonationsFailed],
                            backgroundColor: ["#00a65a","#f39c12","#dd4b39"],
                        }],
                        labels: ['Prelevate','In Attesa','Non Prelevate']
                    },
                    options: {
                        animation: {
                            animateRotate: true
                        },
                        maintainAspectRatio: true
                    }
                };
                var chartPieTransactionsTotal = new Chart(document.getElementById("chartPieTransactionsTotal"), dataGraph);

                dataGraph = {
                    type: 'doughnut',
                    data: {
                        datasets: [{
                            data: [totDonationsConfirmedMonth, totDonationsPendingMonth, totDonationsFailedMonth],
                            backgroundColor: ["#00a65a","#f39c12","#dd4b39"],
                        }],
                        labels: ['Prelevate','In Attesa','Non Prelevate']
                    },
                    options: {
                        animation: {
                            animateRotate: true
                        },
                        maintainAspectRatio: true
                    }
                };
                var chartPieTransactionsLastDays = new Chart(document.getElementById("chartPieTransactionsLastDays"), dataGraph);

                _dashboard.composeDataSetProjectsRaised(projects, items);

            });

        });

    },

    composeDataSetProjectsRaised: function(projects, transactions, days) {
        if (days === undefined) days = _dashboard.days;
        var colors = ["#FF6384", "#36A2EB", "#FFCE56", "#8bc34a", "#607d8b", "#9e9e9e", "#673ab7", "#9c27b0", "#795548", "#ff5722", "#cddc39", "#3f51b5", "#FF6384", "#36A2EB", "#FFCE56", "#8bc34a", "#607d8b", "#9e9e9e", "#673ab7", "#9c27b0", "#795548", "#ff5722"];
        var dateValues = [];
        var labels = [];
        var iDays = days;
        var stringDate = _system.dateBack(-iDays);
        while (stringDate <= _system.dateNow()) {
            iDays--;
            stringDate = _system.dateBack(-iDays);
            labels.push(stringDate);
            dateValues.push(0);
        }
        var chartProjectsId= [];
        var chartProjectsData = [];
        var endControl = false;
        for (key in transactions) {
            var transaction = transactions[key];
            if (transaction.payment_status == "confirmed" || transaction.payment_status == "pending") {
                if (transaction.created_at > new Date(_system.dateNow()).getTime() - (86400000 * days)) {
                    var idProject = transaction['projects_id'];
                    if (chartProjectsId.indexOf(idProject) == -1) {
                        chartProjectsId.push(idProject);
                        chartProjectsData.push({ label: projects[idProject].title.it, data: [], backgroundColor: colors[chartProjectsId.length-1] });
                        for  (z = 0; z <= 365; z++) chartProjectsData[chartProjectsData.length - 1].data[z] = 0;
                    }
                    //console.log(idProject+" > "+tDate+": "+(transaction['amount']*1));
                    var tDate = _system.dateStandard(_system.dateFromUnix(transaction.created_at));
                    var iProject = chartProjectsId.indexOf(idProject);
                    var iDate = labels.indexOf(tDate);
                    chartProjectsData[iProject]['data'][iDate] = (chartProjectsData[iProject]['data'][iDate] !== undefined ? chartProjectsData[iProject]['data'][iDate] : 0) + (transaction['amount']*1);
                } else {
                    endControl = true;
                }
            }
        }
        this.dataSetProjectRaised = chartProjectsData;
        this.renderProjectRaisedGraph(labels,chartProjectsData);
    },
    
    renderProjectRaisedGraph: function(labels, data) {
        var dataset = {
            type: 'bar',
            data: {
                datasets: data,
                labels: labels
            },
            options: {
                scales: { yAxes: [{ stacked: true }] },
                animation: { animateScale: true }
            },
        };
        var chartColumnTransactionsTotal = new Chart(document.getElementById("chartColumnTransactionsTotal"), dataset);
    },

    renderMessageValidation: function(count) {
        if (this.readMessages == false) {
            var message = "Son presenti "+count+" richieste di validazione progetto. <a href='javascript:void(0)' action=\"_section.grid('projects','status','submitted')\">Controlla</a>";
            if (count == 1) message = "&Egrave; presente una richiesta di validazione progetto. <a href='javascript:void(0)' action=\"_section.grid('projects','status','submitted')\">Controlla</a>";
            $('#main-content .alert').remove();
            $('#main-content').prepend("\n\
                <div class='alert alert-warning alert-dismissible'>\n\
                    <button type='button' class='close' onclick=\"_dashboard.readMessages=true\" data-dismiss='alert' aria-hidden='true'>×</button>\n\
                    <h4><i class='icon fa fa-warning'></i> Attenzione!</h4>\n\
                    "+message+"\n\
                </div>\n\
            ");
        }
    },

    renderProjectStatus: function(id, project, color, idRender, label) {
        if (color == undefined) color = "green";
        if (idRender == undefined) idRender = "recap-project-live";
        var labelTitle = "";
        if (label == "LIVE") labelTitle = "<small class='label pull-center bg-green'>PUBBLICATO</small>";
        if (label == "FUNDED") labelTitle = "<small class='label pull-center bg-aqua'>CHIUSO CON SUCCESSO</small>";
        if (label == "NOTFUNDED") labelTitle = "<small class='label pull-center bg-red'>CHIUSO SENZA SUCCESSO</small>";
        _system.database.ref("logs/projects/"+id).once('value').then(function(data) {
            var recap = data.val();
            var payed = (recap.raised.payed !== undefined ? recap.raised.payed : 0) * 1;
            var pending = (recap.raised.pending !== undefined ? recap.raised.pending : 0) * 1;
            var avp = parseInt((payed + pending) * 100 / project.goal);
            var avpBar = avp;
            if (avpBar > 100) avpBar = 100;
            $('#'+idRender).append("\n\
            <div class='progress-group'>\n\
                <div class='progress-text'>"+project.title.it+" ("+avp+"%) "+labelTitle+"</div>\n\
                <div><b>"+payed+" &euro;</b> prelevati, <b>"+pending+" &euro;</b> in attesa su obiettivo <b>"+project.goal+" &euro;</b></div>\n\
                <div class='progress sm'>\n\
                    <div class='progress-bar progress-bar-aqua' style='width: "+avpBar+"%'></div>\n\
                </div>\n\
            </div>\n\
            ");

        });
    }

}
