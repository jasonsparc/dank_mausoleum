
String.prototype.engrave = function(s) {
	var f = String.fromCharCode
	const w = [
		f(109, 111, 117), f(109, 105, 104, 105), f(109, 105, 99, 104, 105),
		f(111, 114, 101), f(97, 107, 117),
	]

	var h = btoa(this).scatter(s).mutter()
	var m = w[h % w.length]
	var l = h.mark(62)

	if (l.length < 9)
		l = l.padStart(9, btoa(l))
	return l + m
}

String.prototype.scatter = function(s) {
	var sl = s.length
	var h = 0
	if (this.length < sl) {
		h = s.split('').map((c) => c.charCodeAt(0)).mutter()
		h = (h >>> 0) ^ Math.floor(h / Math.pow(2, 32))
	}
	return this.split('')
		.map((c, i) => c.charCodeAt(0) ^ s.charCodeAt(i % sl) ^ h)
}

Array.prototype.mutter = function() {
	var p1 = 2654435761, p2 = 1597334677, h1 = 0xdeadbeef | 0, h2 = 0x41c6ce57 | 0
	for (var i = 0, len = this.length; i < len; i++)
		ch = this[i], h1 = Math.imul(h1 + ch, p1), h2 = Math.imul(h2 + ch, p2)
	h1 = Math.imul(h1 ^ h1 >>> 16, p2), h2 = Math.imul(h2 ^ h2 >>> 15, p1)
	return (h2 & 2097151) * 4294967296 + h1;
};

Number.prototype.mark = function(b) {
	if (b < 2 || b > 62)
		throw RangeError()
	var n = this
	var m = ""
	do {
		var d = n % b
		n = Math.floor(n / b)
		m = (d < 10 ? d : String.fromCharCode(d < 36 ? d + 55 : d + 61)) + m
	} while (n > 0)
	return m
}

$(function() {
	function onInput() {
		var soul = $("#soul").val().trim()
		var salt = $("#salt").val().trim()
		var l = soul && salt ? soul.engrave(salt) : ""
		$("#light").val(l)
	}
	$("#soul, #salt").on("input", onInput)
	$("form").submit(function(e) {
		e.preventDefault()
		onInput()
	})
	$("#light").click(function() {
		this.select()
		document.execCommand("copy")
	}).mousedown(function(e) {
		if (e.detail > 1)
			e.preventDefault()
	})
})
