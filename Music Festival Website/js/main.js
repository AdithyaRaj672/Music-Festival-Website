// Shared functionality for the festival website
$(document).ready(function() {
    // Navbar active state management
    function setActiveNavItem() {
        const currentPage = window.location.pathname.split('/').pop();
        $('.nav-link').removeClass('active');
        $(`.nav-link[href="${currentPage}"]`).addClass('active');
    }

    // Initialize active nav state
    setActiveNavItem();

    // Smooth scrolling for anchor links
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        const target = $(this.hash);
        if (target.length) {
            $('html, body').animate({
                scrollTop: target.offset().top - 70
            }, 1000);
        }
    });

    // Add loading animation for images
    $('.artist-card img, .artist-bio-img').on('load', function() {
        $(this).addClass('loaded');
    }).each(function() {
        if (this.complete) {
            $(this).trigger('load');
        }
    });

    // Global modal functionality
    $('.modal').on('show.bs.modal', function() {
        $('body').addClass('modal-open');
    }).on('hidden.bs.modal', function() {
        $('body').removeClass('modal-open');
    });

    // Form validation enhancement
    $('form').on('submit', function() {
        if (this.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        $(this).addClass('was-validated');
    });

    // Responsive image handling
    function handleResponsiveImages() {
        const windowWidth = $(window).width();
        $('.artist-card img').each(function() {
            const img = $(this);
            if (windowWidth < 768) {
                img.attr('src', img.attr('src').replace('-full.jpg', '-mobile.jpg'));
            } else {
                img.attr('src', img.attr('src').replace('-mobile.jpg', '-full.jpg'));
            }
        });
    }

    // Call on page load and window resize
    handleResponsiveImages();
    $(window).on('resize', handleResponsiveImages);

    // Schedule tab persistence
    const activeTab = sessionStorage.getItem('activeScheduleTab');
    if (activeTab) {
        $(`#scheduleTabs button[data-bs-target="${activeTab}"]`).tab('show');
    }

    $('#scheduleTabs button').on('shown.bs.tab', function(e) {
        sessionStorage.setItem('activeScheduleTab', $(e.target).data('bs-target'));
    });
});