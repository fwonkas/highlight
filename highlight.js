(function($, global) {
	$(document).ready(function() {
		var sentences, pCount = 1,
			ws = /^\s+/,
			space, marker = '.',
		    highlightClass = 'highlight',
		    root = $(document.body);
		// Wrap all sentences with span tags with class "sentence".  Ugly.
		// There's got to be a better way.
		var wrapSentences = function wrapSentences() {
			console.log(root);
			root.find('p').each(function(index) {
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
		}

		var highlightSentence = function highlightSentence(paragraph, sentence, end) {
			for (var i=sentence; i <= (end || sentence); i++) {
		    	paragraph.find('span.sentence').eq(i).addClass(highlightClass);
			}
	    }

		var digits = function digits(str) {
			return parseInt(/\d+/.exec(str) - 1, 10);
		}

		var determineRootEl = function determineRootEl(arguments) {
			var args = Array.prototype.slice.call(arguments),
			    id, idRe = /^#/;
			for (var i=0; i < args.length; i++) {
				if (args[i] instanceof HTMLElement) {
					return $(args[i]);
				} else if (typeof args[i] == 'string') {
					id = args[i].replace(idRe, '');
					if (document.getElementById(id)) {
						return $('#' + id);
					}
				}
			};
			return root;
			
		}

		global.highlight = function highlight() {
			var hash = document.location.hash,
			    h = /h\d+/.exec(hash),
			    s = /s\d+-\d+/.exec(hash) || /s\d+/.exec(hash),
			    p = /p\d+/.exec(hash),
			    pNum, sNum, selPar, sSpan, first, last, params = [];
			    

			root = determineRootEl(arguments);
			wrapSentences(root);
			wrapSentences = function (){return false;}

			root.find('p').removeClass(highlightClass);
			root.find('p span').removeClass(highlightClass);

			if (h) {
				pNum = /\d+/.exec(h) - 1;
				selPar = root.find('p').eq(pNum);
				if (!s) {
					selPar.addClass(highlightClass);
				} else {
					sSpan = String(s).split('-');
					params.push(selPar);
					for (var i=0; i < sSpan.length; i++) {
						params.push(digits(sSpan[i]));
					};
					highlightSentence.apply(this, params);
				}
			}
			if (p) {
				setTimeout(function() {window.scrollTo(0, $('[name=' + p + ']').first().position().top)}, 20);
			}
		};
		$(window).bind('hashchange', global.highlight);
	} ());
} (jQuery, this));
