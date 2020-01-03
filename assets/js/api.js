/* Copyright (C) 1998-2020 by Northwoods Software Corporation. All Rights Reserved. */
var hash = null;
function changeHash() {
  if (hash !== null) $("[name='" + hash + "']").parent().css('background', '');
  hash = window.location.hash.slice(1);
  $("[name='" + hash + "']").parent().css('background-color', 'rgba(230, 242, 255, .4)'); // light blue
}
$(document).ready(changeHash);
$(window).on('hashchange', changeHash);