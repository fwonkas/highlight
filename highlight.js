(function($) {
	$(document).ready(function(start) {
		var sentences, pCount = 1,
			ws = /^\s+/,
			space, marker = '.';
		// Wrap all sentences with span tags with class "sentence".  Ugly.
		// There's got to be a better way.
		start.find('p').each(function(index) {
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
			    s = /s\d+-\d+/.exec(hash) || /s\d+/.exec(hash),
			    highlightClass = 'highlight',
			    pNum, sNum, selPar, sSpan, first, last,
			    highlightSentence = function highlightSentence(p, s) {
			    	p.find('span.sentence').eq(s).addClass(highlightClass);
			    },
			    digits = function digits(str) {
			    	return parseInt(/\d+/.exec(str) - 1, 10);
			    };

			start.find('p').removeClass(highlightClass);
			start.find('p span').removeClass(highlightClass);
			if (p) {
				pNum = /\d+/.exec(p) - 1;
				selPar = start.find('p').eq(pNum);
				if (!s) {
					selPar.addClass(highlightClass);
				} else {
					sSpan = String(s).split('-');
						if (sSpan.length > 1) {
							first = digits(sSpan[0]);
							last = digits(sSpan[1]);
							for (var i=first; i <= last; i++) {
								highlightSentence(selPar, i);
							};
						} else {
							highlightSentence(selPar, digits(s));
					};
				}
			}
		};
		$(window).bind('hashchange', highlight);
		highlight();
	} ($('#story'))); // The value passed specifies what element the relevant paragraphs are in.
} (jQuery));
