// public/js/main.js
$(document).ready(function() {
    $('#searchForm').submit(function(event) {
        event.preventDefault();

        $.ajax({
            url: '/products/search',
            method: 'GET',
            data: $(this).serialize(),
            success: function(data) {
                $('#productList').empty(); // Clear the current list
                data.forEach(function(product) {
                    $('#productList').append(
                        '<li>' + product.name + ' - ' + product.price + ' - ' + product.category + '</li>'
                    );
                });
            },
            error: function(err) {
                console.error('Search Error:', err);
            }
        });
    });
});
