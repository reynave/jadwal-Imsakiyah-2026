let selectedCity = localStorage.getItem("selectedCity") || "jakarta";
if (localStorage.getItem("selectedCity") === null) {
    localStorage.setItem("selectedCity", "jakarta");
}

$(function () {
    var $moonStar = $(".bulanbintang-area img");
    if (!$moonStar.length) {
        return;
    }

    var maxShiftX = 12;
    var maxShiftY = 8;
    var pending = false;
    var targetX = 0;
    var targetY = 0;

    $(window).on("mousemove", function (event) {
        var winW = window.innerWidth || document.documentElement.clientWidth;
        var winH = window.innerHeight || document.documentElement.clientHeight;

        var normalizedX = (event.clientX / winW - 0.5) * -1;
        var normalizedY = (event.clientY / winH - 0.5) * -1;

        targetX = normalizedX * maxShiftX * 2;
        targetY = normalizedY * maxShiftY * 2;

        if (!pending) {
            pending = true;
            window.requestAnimationFrame(function () {
                $moonStar.css("transform", "translate(" + targetX + "px, " + targetY + "px)");
                pending = false;
            });
        }
    });

    $(window).on("mouseout", function (event) {
        if (!event.relatedTarget) {
            $moonStar.css("transform", "translate(0, 0)");
        }
    });


});
let today = new Date();
let day = today.getDate(); // returns the day of the month (1-31)
// bisa buatkan today di tambah 2 hari dengan format misal 2 Febuari 2026
let twoDaysLater = new Date(today);
twoDaysLater.setDate(today.getDate() + 2);
const baseScheduleDate = new Date(2026, 1, 18); // 18 Februari 2026 sebagai tanggal awal jadwal


$(document).ready(function () {

    let data = {};
    let prov = '';
    function loadJsonData(area = selectedCity) {
        return $.getJSON("assets/json/" + area + ".json").then(function (jsonData) {
            console.log(jsonData)
            prov = jsonData && jsonData.kabko ? jsonData.kabko : '';
            data = jsonData && jsonData.data ? jsonData.data : {};
            return data;
        }).fail(function (jqXHR, textStatus, errorThrown) {
            console.error("Gagal memuat data " + area + ":", textStatus || errorThrown);
            data = {};
            return data;
        });
    }

    function setActiveCityButton(city) {
        $(".btn-city").removeClass("btn-city-active");
        $('.btn-city[data-city="' + city + '"]').addClass("btn-city-active");

    }

    const scheduleDays = [ 
        219, 220, 221, 222, 223, 224, 225, 226, 227, 228,
        301, 302, 303, 304, 305, 306, 307, 308, 309, 310,
        311, 312, 313, 314, 315, 316, 317, 318, 319, 320,
    ];
    function renderSchedule() {
        $("#row1, #row2, #row3, #mobileDays, #modalTimeTemplate").empty();

        //buat buatkan tanggal hari ini dengan format ddmmyyyy
        let todayFormatted = ((today.getMonth() + 1) * 100) + today.getDate();
        console.log("Hari ini tanggal:", todayFormatted);
        for (let i = 1; i <= 30; i++) {

            const dayRecord = data[i] || {};

            let colDiv = $(`
                <div class="col-2">
                    <a href="#timeModalTemplate${i}" class='action-day'  data-id="${i}">
                        <div class="btn-day" data-bs-toggle="modal" data-bs-target="#exampleModal${i}" >
                            <img src="./assets/imgs/days/kalende-per-hari_${i}.png" width="100%">
                        </div>
                    </a>
                </div>
            `);
            if (scheduleDays[i-1] == todayFormatted) {
                colDiv = $(`
            <div class="col-2">
            <a  href="#timeModalTemplate${i}">
                <div class="btn-day btn-day-active" data-bs-toggle="modal" data-bs-target="#exampleModal${i}">
                    <div class="btn-day-active-inside">
                        <img src="./assets/imgs/days/kalende-per-hari_${i}.png" width="100%">
                    </div>
                </div>
                </a>
            </div>
            `);
            }


            let dayNumber = `
            <div class="col">
                <a data-bs-toggle="modal"  data-bs-target="#exampleModal${i}" href="javascript:;">
                    <div class="btn-day">
                        <img src="./assets/imgs/days/kalende-per-hari_${i}.png" width="100%">
                    </div>
                </a>
            </div>
            `;
            if (scheduleDays[i-1] == todayFormatted) {
                dayNumber = `
            <div class="col">
                <a data-bs-toggle="modal"  data-bs-target="#exampleModal${i}" href="javascript:;">
                    <div class="btn-day btn-day-active">
                        <div class="btn-day-active-inside">
                            <img src="./assets/imgs/days/kalende-per-hari_${i}.png" width="100%">
                        </div>
                    </div>
                </a>
            </div>
            `;
            }


            if (i <= 10) {
                $("#row1").append(dayNumber);
            } else if (i <= 20) {
                $("#row2").append(dayNumber);
            } else {
                $("#row3").append(dayNumber);
            }


            var template = $.trim($('#timeTemplate').html());
            var output = template.replace(/{{(\w+)}}/g, function (_, key) {
                switch (key) {
                    case "i": return i;
                    case "tanggal": {
                        var offsetDay = parseInt(dayRecord.tanggal, 10) || 0;
                        var displayDate = new Date(baseScheduleDate);
                        displayDate.setDate(baseScheduleDate.getDate() + offsetDay);
                        return displayDate.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
                    }
                    case "ashar": return dayRecord.ashar || "";
                    case "dhuha": return dayRecord.dhuha || "";
                    case "dzuhur": return dayRecord.dzuhur || "";
                    case "imsak": return dayRecord.imsak || "";
                    case "isya": return dayRecord.isya || "";
                    case "maghrib": return dayRecord.maghrib || "";
                    case "subuh": return dayRecord.subuh || "";
                    case "terbit": return dayRecord.terbit || "";
                    case "prov": return prov || "";

                    default: return "";
                }
            });

            $("#modalTimeTemplate").append(output);

            $("#mobileDays").append(colDiv);

        }
    }

    function loadAndRenderCity(city) {
        setActiveCityButton(city);
        return loadJsonData(city).then(function () {
            selectedCity = city;
            localStorage.setItem("selectedCity", city);
            $('.loading').hide()
            renderSchedule();
            //  $("#selectCity").val(city);
        });
    }

    function initializeCitySelection() {
        //buatkan select option berdasarkan isi dari assets/json/*.json, pakah bisa baca file dari folder json?
        $.getJSON("assets/js/cities.json").then(function (citiesData) {
            var $selectCity = $("#selectCity");
            var $itemCities = $("#itemCities");
            $selectCity.empty();
            $.each(citiesData, function (index, city) {
                var option = $("<option></option>")
                    .attr("value", city)
                    .text(city.toUpperCase());
                $selectCity.append(option);


                var cityButton = $(`<div class="col-12 col-md-6">
                                    <a href="javascript:void(0);" class="btn btn-city" data-bs-dismiss="modal" data-city="${city}" onclick="return false;">
                                        ${city.toUpperCase()}
                                    </a>
                                </div>`); 
                $itemCities.append(cityButton);

                

            }
            );
            $selectCity.val(selectedCity);
        });

    }
    initializeCitySelection();

    loadAndRenderCity(selectedCity);

    $(document).on("change", "#selectCity", function (event) {
        event.preventDefault();
        var city = $(this).val();
        localStorage.setItem("selectedCity", city);
        loadAndRenderCity(city);

    });

    $(document).on("click", ".btn-city[data-city]", function (event) {
        event.preventDefault();
        $('#selectCity').val($(this).data("city"));
        // var city = $(this).data("city");
        localStorage.setItem("selectedCity", $(this).data("city"));
        var city = $(this).data("city");
        console.log("clicked city:", city);


        loadAndRenderCity(city);
    });
    var modalClosedViaPopstate = false;
    if (window.history && window.history.pushState) {
        $(document).on("shown.bs.modal", ".modal", function () {
            if (!this.dataset.modalHistoryPushed) {
                history.pushState({ modalOpen: true }, "", window.location.href);
                this.dataset.modalHistoryPushed = "true";
            }
        });

        $(document).on("hidden.bs.modal", ".modal", function () {
            if (this.dataset.modalHistoryPushed) {
                delete this.dataset.modalHistoryPushed;
                if (modalClosedViaPopstate) {
                    modalClosedViaPopstate = false;
                } else {
                    history.back();
                }
            }
        });

        window.addEventListener("popstate", function () {
            var openModal = document.querySelector(".modal.show");
            if (!openModal) {
                return;
            }

            modalClosedViaPopstate = true;

            if (window.bootstrap && window.bootstrap.Modal) {
                var modalInstance = window.bootstrap.Modal.getInstance(openModal);
                if (!modalInstance) {
                    modalInstance = new window.bootstrap.Modal(openModal);
                }
                modalInstance.hide();
            } else {
                $(openModal).removeClass("show").attr("aria-hidden", "true").hide();
            }
        });
    }
});