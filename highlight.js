(function($, global) {
	$(document).ready(function() {
		var sentences, pCount = 1,
			ws = /^\s+/,
			space, marker = '.',
		    highlightClass = 'highlight',
		    root = $(document.body),
		    blocks = ['p', 'blockquote'].join(',');
		// Wrap all sentences with mark tags with class "sentence".
		var hl = {
			wrapSentences: function wrapSentences() {
				var stop = /[.?!]/,
					trim = function(str) {
						return str.replace(/^\s+/, '').replace(/\s+$/, '');
					},
					splitSentences = function(str) {
						var sentencePoints = [],
							inTag = false,
							lookForStart = true,
							thisChar = '',
							i = 0, whiteSpace = true;

						for (; i < str.length; i++) {
							thisChar = str.charAt(i);
							if (!inTag) {
								if (lookForStart == true) {
									if (sentencePoints.length == 0 || !thisChar.match(/\s/)) {
										lookForStart = false;
										sentencePoints.push({start: i});
									}
								} else {
									if (thisChar.match(stop)) {
										while (whiteSpace) {
											if (!str.charAt(i + 1).match(/\s/)) {
												whiteSpace = false;
											} else {
												i += 1;
											}
										}
										sentencePoints[sentencePoints.length - 1].end = i;
										whiteSpace = true;
										lookForStart = true;
									}
								}
							}
							if (thisChar == '<') {
								inTag = true;
							} else if (thisChar == '>') {
								inTag = false;
							}
						};
						return sentencePoints;
					},
					assembleParagraph = function(points, p) {
						var paragraph = '',
							i = 0,
							point,
							sentence = '',
							trailing = '';

						for (; i < points.length; i++) {
							point = points[i];
							sentence = p.slice(point.start, point.end + 1);
							trailing = sentence.match(/\s+$/) || '';
							sentence = trim(sentence);
							sentence = '<mark class="sentence">' + sentence + '</mark>' + trailing;
							paragraph += sentence;
						};

						return '<a name="p' + (pCount++) + '"></a>' + paragraph;
					};
				
				root.find(blocks).each(function() {
					var oldParagraph = $(this).html().trim(),
						sentencePoints = splitSentences(oldParagraph);

					$(this).html(assembleParagraph(sentencePoints, oldParagraph));
				});
				this.wrapSentences = function(){};
			},
			sentence: function sentence(paragraph, begin, end) {
				for (var i=begin; i <= (parseInt(end, 10) || parseInt(begin, 10)); i++) {
			    	paragraph.find('mark.sentence').eq(i).addClass(highlightClass);
				}
		    },
			determineRootEl: function determineRootEl(args) {
				var id, idRe = /^#/;
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
		};

		global.highlight = function highlight() {
			var hash = document.location.hash,
			    h = /h\d+/.exec(hash),
			    s = /s\d+-\d+/.exec(hash) || (/s\d+/).exec(hash),
			    p = /p\d+/.exec(hash),
			    pNum, sNum, selPar, sSpan, params = [],
			    args = Array.prototype.slice.call(arguments),
				i = 0;
			    

			root = hl.determineRootEl(args);
			
			hl.wrapSentences();

			root.find(blocks).removeClass(highlightClass).find('mark').removeClass(highlightClass);
			if (h) {
				pNum = /\d+/.exec(h) - 1;
				selPar = root.find(blocks).eq(pNum);
				if (!s) {
					selPar.addClass(highlightClass);
				} else {
					sSpan = String(s).split('-');
					params.push(selPar);
					for (; i < sSpan.length; i++) {
						params.push(parseInt(/\d+/.exec(sSpan[i]) - 1, 10));
					};
					hl.sentence.apply(this, params);
				}
			};
			if (p) {
				setTimeout(function() {window.scrollTo(0, $('[name=' + p + ']').first().position().top);}, 20);
			}
		};
		$(window).bind('hashchange', highlight);
	} ());
} (jQuery, this));
