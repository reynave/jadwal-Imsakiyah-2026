
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

$(document).ready(function () {
    $("#modal").html(`
        <div style="display: none;" id="f01" class="animated-modal">
			<h2>Hello!</h2>
			<p>This is animated content! Cool, right?</p>
		</div>
    `);

    for (let i = 1; i <= 30; i++) {

        let colDiv = $(`
            <div class="col-2">
                <a href="#timeModalTemplate${i}">
                    <div class="btn-day" data-bs-toggle="modal" data-bs-target="#exampleModal${i}" >
                        <img src="./assets/imgs/days/kalende-per-hari_${i}.png" width="100%">
                    </div>
                </a>
            </div>
        `);
        if (i == 3) {
            colDiv = $(`
            <div class="col-2">
            <a  href="#timeModalTemplate${i}">
                <div class="btn-day btn-day-active" data-bs-toggle="modal" data-bs-target="#exampleModal${i}">
                    <div class="btn-day-active-inside">
                        <img src="./assets/imgs/days/kalende-per-hari_3.png" width="100%">
                    </div>
                </div>
                </a>
            </div>
            `);
        }


        let dayNumber = `
            <div class="col">
                <a data-bs-toggle="modal" data-bs-target="#exampleModal${i}" href="javascript:;">
                    <div class="btn-day">
                        <img src="./assets/imgs/days/kalende-per-hari_${i}.png" width="100%">
                    </div>
                </a>
            </div>
        `;
         if (i == 3) {
            dayNumber = `
            <div class="col">
                <a data-bs-toggle="modal" data-bs-target="#exampleModal${i}" href="javascript:;">
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
        var output = template.replace(/{{i}}/ig, i);

        $("#modalTimeTemplate").append(output);

        $("#mobileDays").append(colDiv);

    }

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