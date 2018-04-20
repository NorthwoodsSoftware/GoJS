function showSummaries(yesNo) {
  if (yesNo) {
    $("span.details").hide();
    $("div.details").hide();
    $("span.nodetails").show();
  } else {
    $("span.details").show();
    $("div.details").show();
    $("span.nodetails").hide();
  }
  try {
    localStorage.setItem("showSummaries", yesNo);
  } catch (e) { }
}

$(document).ready(function () {
  var $showsumms = $("#showsumms");
  $showsumms.on("change", function () {
    showSummaries($showsumms.prop("checked"));
  })

  try {
    if (localStorage.getItem("showSummaries") === "true") {
      $showsumms.prop("checked") = true;
      $("span.details").toggle();
      $("span.nodetails").toggle(); // the "More..." button
      $("div.details").toggle();
    }
  } catch (e) { };
});


function hst(section) {
  $("#" + section).toggle(500); // span details
  $("#d" + section).toggle(500); // div details
  $("#x" + section).toggle(); // "More..."

}

$('#bluecss').click(function () {
  $('link[title="colorful"]').attr('rel', 'alternate stylesheet');
  $('link[title="blue"]').attr('rel', 'stylesheet');
});
$('#colorfulcss').click(function () {
  $('link[title="colorful"]').attr('rel', 'stylesheet');
  $('link[title="blue"]').attr('rel', 'alternate stylesheet');
});

var hash = null;
function changeHash() {
  if (hash !== null) $(hash).css('background-color', '');
  hash = window.location.hash.replace("#.", "#\\.");
  $(hash).css('background-color', '#feffd3'); // light yellow
}
$(document).ready(changeHash);
$(window).on('hashchange', changeHash);

/* Based on typedoc search functionality */
function initSearch () {
  var SearchLoadingState;
  (function (SearchLoadingState) {
    SearchLoadingState[SearchLoadingState["Idle"] = 0] = "Idle";
    SearchLoadingState[SearchLoadingState["Loading"] = 1] = "Loading";
    SearchLoadingState[SearchLoadingState["Ready"] = 2] = "Ready";
    SearchLoadingState[SearchLoadingState["Failure"] = 3] = "Failure";
  })(SearchLoadingState || (SearchLoadingState = {}));
  var $el = $('#apisearch');
  var $field = $('#search-field');
  var $results = $('.results');
  var base = $el.attr('data-base');
  var query = '';
  var loadingState = SearchLoadingState.Idle;
  var hasFocus = false;
  var preventPress = false;
  var search;
  var index;
  var fuse;
  function createIndex() {
    // get search data JSON
    $.getJSON(base + 'search.json')
      .done(function (json) {
        search = json;
        // build the fuse.js search
        var options = {
          shouldSort: true,
          threshold: 0.1,
          location: 0,
          distance: 100,
          maxPatternLength: 50,
          minMatchCharLength: 1,
          keys: ['name', 'member'] // search the full name and the member name
        };
        fuse = new Fuse(search, options);
        setLoadingState(SearchLoadingState.Ready);
      })
      .fail(function () {
        setLoadingState(SearchLoadingState.Failure)
      });
  }
  function loadIndex() {
    if (loadingState != SearchLoadingState.Idle)
      return;
    setTimeout(function () {
      if (loadingState == SearchLoadingState.Idle) {
        setLoadingState(SearchLoadingState.Loading);
      }
    }, 500);
    createIndex();
  }
  function updateResults() {
    if (loadingState != SearchLoadingState.Ready)
      return;
    $results.empty();
    var res = fuse.search(query);
    for (var i = 0, c = 0; i < res.length && c <= 10; i++) {
      var match = res[i];
      var name = match.name;
      if (match.parent && match.member) name = `<span class="parent">${match.parent}.</span>${match.member}`;
      $results.append(`<li><a href="${base}${match.url}">${name}</li>`);
      c++;
    }
  }
  function setLoadingState(value) {
    if (loadingState == value)
      return;
    $el.removeClass(SearchLoadingState[loadingState].toLowerCase());
    loadingState = value;
    $el.addClass(SearchLoadingState[loadingState].toLowerCase());
    if (value == SearchLoadingState.Ready) {
      updateResults();
    }
  }
  function setHasFocus(value) {
    if (hasFocus == value)
      return;
    hasFocus = value;
    $el.toggleClass('has-focus');
    if (!value) {
      $field.val(query);
    } else {
      setQuery('');
      $field.val('');
    }
  }
  function setQuery(value) {
    query = $.trim(value);
    updateResults();
  }
  function setCurrentResult(dir) {
    var $current = $results.find('.current');
    if ($current.length == 0) {
      $results.find(dir == 1 ? 'li:first-child' : 'li:last-child').addClass('current');
    } else {
      var $rel = dir == 1 ? $current.next('li') : $current.prev('li');
      if ($rel.length > 0) {
        $current.removeClass('current');
        $rel.addClass('current');
      }
    }
  }
  function gotoCurrentResult() {
    var $current = $results.find('.current');
    if ($current.length == 0) {
      $current = $results.find('li:first-child');
    }
    if ($current.length > 0) {
      window.location.href = $current.find('a').prop('href');
      $field.blur();
    }
  }
  $field.on('focusin', function () {
    setHasFocus(true);
    loadIndex();
  }).on('focusout', function () {
    setTimeout(function () { return setHasFocus(false); }, 100);
  }).on('input', function () {
    setQuery($.trim($field.val()));
  }).on('keydown', function (e) {
    if (e.keyCode == 13 || e.keyCode == 27 || e.keyCode == 38 || e.keyCode == 40) {
      preventPress = true;
      e.preventDefault();
      if (e.keyCode == 13) {
        gotoCurrentResult();
      } else if (e.keyCode == 27) {
        $field.blur();
      } else if (e.keyCode == 38) {
        setCurrentResult(-1);
      } else if (e.keyCode == 40) {
        setCurrentResult(1);
      }
    } else {
      preventPress = false;
    }
  }).on('keypress', function (e) {
    if (preventPress)
      e.preventDefault();
  });

  /**
   * Start searching by pressing a key on the body.
   */
  $('body').on('keydown', function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    if (!hasFocus && e.keyCode > 47 && e.keyCode < 112) {
        $field.focus();
    }
  });
}
$(document).ready(initSearch);

(function (i, s, o, g, r, a, m) {
i['GoogleAnalyticsObject'] = r; i[r] = i[r] || function () {
  (i[r].q = i[r].q || []).push(arguments)
}, i[r].l = 1 * new Date(); a = s.createElement(o),
  m = s.getElementsByTagName(o)[0]; a.async = 1; a.src = g; m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-1506307-5', 'auto');
ga('send', 'pageview');