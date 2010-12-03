(function($) {
	$(document).ready(function() {
		var sentences, pCount = 1,
			ws = /^\s+/,
			space, marker = '.';
		// Wrap all sentences with span tags with class "sentence".  Ugly.
		// There's got to be a better way.
		$('p').each(function(index) {
			sentences = $(this).html().split(marker);
			$(this).html(function() {
				// Yes, length - 2.  Otherwise it wraps the final period of the paragraph with a span.
				for (i = sentences.length - 2; i >= 0; i -= 1) {
					space = ws.exec(sentences[i]);
					sentences[i] = sentences[i].replace(ws, '');
					sentences[i] = '<span class="sentence">' + sentences[i] + marker + '</span>' + space;
				};
				return sentences.join('');
			});
			$(this).prepend('<a name="p' + (pCount++) + '"></a>');
		});

		var highlight = function() {
			var hash = document.location.hash,
				p = /h\d+/.exec(hash),
				s = /s\d+/.exec(hash),
				highlightClass = 'highlight',
				pNum, sNum, selPar;

			$('p').removeClass(highlightClass);
			$('p span').removeClass(highlightClass);
			if (p) {
				pNum = /\d+/.exec(p) - 1;
				selPar = $('p').eq(pNum);
				if (!s) {
					selPar.addClass(highlightClass);
				} else {
					sNum = /\d+/.exec(s) - 1;
					selPar.find('span.sentence').eq(sNum).addClass(highlightClass);
				}
			}
		};
		$(window).bind('hashchange', highlight);
		highlight();
	} ());
} (jQuery));
