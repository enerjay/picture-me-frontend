function initializeMasonryGrid() {
  
  $('.grid').masonry({
    itemSelector: '.grid-item',
    columnWidth: 100
  });
  $('.img-zoom').focus(function() {
    $(this).addClass('transition');
  });  
};

