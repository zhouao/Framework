/**
* jQuery MiniUI 2.1
*
* Date : 2012-8-16
* 
* Commercial License : http://www.miniui.com/license
*
* Copyright(c) 2012 All Rights Reserved. PluSoft Co., Ltd (�Ϻ��ռ�������޹�˾) [ services@plusoft.com.cn ]. 
*
*/
mini = {
	components: {},
	uids: {},
	ux: {},
	isReady: false,
	byClass: function(_, $) {
		if (typeof $ == "string") $ = PBm($);
		return jQuery("." + _, $)[0]
	},
	getComponents: function() {
		var _ = [];
		for (var A in mini.components) {
			var $ = mini.components[A];
			_.push($)
		}
		return _
	},
	get: function(_) {
		if (!_) return null;
		if (mini.isControl(_)) return _;
		if (typeof _ == "string") if (_.charAt(0) == "#") _ = _.substr(1);
		if (typeof _ == "string") return mini.components[_];
		else {
			var $ = mini.uids[_.uid];
			if ($ && $.el == _) return $
		}
		return null
	},
	getbyUID: function($) {
		return mini.uids[$]
	},
	findControls: function(E, B) {
		if (!E) return [];
		B = B || mini;
		var $ = [],
		D = mini.uids;
		for (var A in D) {
			var _ = D[A],
			C = E[POm](B, _);
			if (C === true || C === 1) {
				$.push(_);
				if (C === 1) break
			}
		}
		return $
	},
	emptyFn: function() {},
	createNameControls: function(A, F) {
		if (!A || !A.el) return;
		if (!F) F = "_";
		var C = A.el,
		$ = mini.findControls(function($) {
			if (!$.el || !$.name) return false;
			if (Dmv(C, $.el)) return true;
			return false
		});
		for (var _ = 0,
		D = $.length; _ < D; _++) {
			var B = $[_],
			E = F + B.name;
			if (F === true) E = B.name[0].toUpperCase() + B.name.substring(1, B.name.length);
			A[E] = B
		}
	},
	getbyName: function(C, _) {
		var B = mini.isControl(_),
		A = _;
		if (_ && B) _ = _.el;
		_ = PBm(_);
		_ = _ || document.body;
		var $ = this.findControls(function($) {
			if (!$.el) return false;
			if ($.name == C && Dmv(_, $.el)) return 1;
			return false
		},
		this);
		if (B && $.length == 0 && A && A.getbyName) return A.getbyName(C);
		return $[0]
	},
	getParams: function(C) {
		if (!C) C = location.href;
		C = C.split("?")[1];
		var B = {};
		if (C) {
			var A = C.split("&");
			for (var _ = 0,
			D = A.length; _ < D; _++) {
				var $ = A[_].split("=");
				B[$[0]] = decodeURIComponent($[1])
			}
		}
		return B
	},
	reg: function($) {
		this.components[$.id] = $;
		this.uids[$.uid] = $
	},
	unreg: function($) {
		delete mini.components[$.id];
		delete mini.uids[$.uid]
	},
	classes: {},
	uiClasses: {},
	getClass: function($) {
		if (!$) return null;
		return this.classes[$.toLowerCase()]
	},
	getClassByUICls: function($) {
		return this.uiClasses[$.toLowerCase()]
	},
	idPre: "mini-",
	idIndex: 1,
	newId: function($) {
		return ($ || this.idPre) + this.idIndex++
	},
	copyTo: function($, A) {
		if ($ && A) for (var _ in A) $[_] = A[_];
		return $
	},
	copyIf: function($, A) {
		if ($ && A) for (var _ in A) if (mini.isNull($[_])) $[_] = A[_];
		return $
	},
	createDelegate: function(_, $) {
		if (!_) return function() {};
		return function() {
			return _.apply($, arguments)
		}
	},
	isControl: function($) {
		return !! ($ && $.isControl)
	},
	isElement: function($) {
		return $ && $.appendChild
	},
	isDate: function($) {
		return $ && $.getFullYear
	},
	isArray: function($) {
		return $ && !!$.unshift
	},
	isNull: function($) {
		return $ === null || $ === undefined
	},
	isNumber: function($) {
		return ! isNaN($) && typeof $ == "number"
	},
	isEquals: function($, _) {
		if ($ !== 0 && _ !== 0) if ((mini.isNull($) || $ == "") && (mini.isNull(_) || _ == "")) return true;
		if ($ && _ && $.getFullYear && _.getFullYear) return $.getTime() === _.getTime();
		if (typeof $ == "object" && typeof _ == "object" && $ === _) return true;
		return String($) === String(_)
	},
	forEach: function(E, D, B) {
		var _ = E.clone();
		for (var A = 0,
		C = _.length; A < C; A++) {
			var $ = _[A];
			if (D[POm](B, $, A, E) === false) break
		}
	},
	sort: function(A, _, $) {
		$ = $ || A;
		A.sort(_)
	},
	removeNode: function($) {
		jQuery($).remove()
	},
	elWarp: document.createElement("div")
};
J9_$ = function(A, _) {
	_ = _.toLowerCase();
	if (!mini.classes[_]) {
		mini.classes[_] = A;
		A[DK].type = _
	}
	var $ = A[DK].uiCls;
	if (!mini.isNull($) && !mini.uiClasses[$]) mini.uiClasses[$] = A
};
Mup = function(E, A, $) {
	if (typeof A != "function") return this;
	var D = E,
	C = D.prototype,
	_ = A[DK];
	if (D[Xc$] == _) return;
	D[Xc$] = _;
	D[Xc$][TYcW] = A;
	for (var B in _) C[B] = _[B];
	if ($) for (B in $) C[B] = $[B];
	return D
};
mini.copyTo(mini, {
	extend: Mup,
	regClass: J9_$,
	debug: false
});
LDkv = [];
Xs = function(_, $) {
	LDkv.push([_, $]);
	if (!mini._EventTimer) mini._EventTimer = setTimeout(function() {
		DjWk()
	},
	1)
};
DjWk = function() {
	for (var $ = 0,
	_ = LDkv.length; $ < _; $++) {
		var A = LDkv[$];
		A[0][POm](A[1])
	}
	LDkv = [];
	mini._EventTimer = null
};
JLGT = function(C) {
	if (typeof C != "string") return null;
	var _ = C.split("."),
	D = null;
	for (var $ = 0,
	A = _.length; $ < A; $++) {
		var B = _[$];
		if (!D) D = window[B];
		else D = D[B];
		if (!D) break
	}
	return D
};
mini.getAndCreate = function($) {
	if (!$) return null;
	if (typeof $ == "string") return mini.components[$];
	if (typeof $ == "object") if (mini.isControl($)) return $;
	else if (mini.isElement($)) return mini.uids[$.uid];
	else return mini.create($);
	return null
};
mini.create = function($) {
	if (!$) return null;
	if (mini.get($.id) === $) return $;
	var _ = this.getClass($.type);
	if (!_) return null;
	var A = new _();
	A.set($);
	return A
};
mini.append = function(_, A) {
	_ = PBm(_);
	if (!A || !_) return;
	if (typeof A == "string") {
		if (A.charAt(0) == "#") {
			A = PBm(A);
			if (!A) return;
			_.appendChild(A);
			return A
		} else {
			if (A.indexOf("<tr") == 0) {
				return jQuery(_).append(A)[0].lastChild;
				return
			}
			var $ = document.createElement("div");
			$.innerHTML = A;
			A = $.firstChild;
			while ($.firstChild) _.appendChild($.firstChild);
			return A
		}
	} else {
		_.appendChild(A);
		return A
	}
};
mini.prepend = function(_, A) {
	if (typeof A == "string") if (A.charAt(0) == "#") A = PBm(A);
	else {
		var $ = document.createElement("div");
		$.innerHTML = A;
		A = $.firstChild
	}
	return jQuery(_).prepend(A)[0].firstChild
};
var Rm2 = "getBottomVisibleColumns",
NRn = "setFrozenStartColumn",
Bdk = "showCollapseButton",
Ky6 = "showFolderCheckBox",
IR4 = "setFrozenEndColumn",
Q4sE = "getAncestorColumns",
HbLf = "getFilterRowHeight",
$fqc = "checkSelectOnLoad",
Tn = "frozenStartColumn",
THb5 = "allowResizeColumn",
S8XW = "showExpandButtons",
EoEr = "requiredErrorText",
Ryb = "getMaxColumnLevel",
$ra = "isAncestorColumn",
PTW = "allowAlternating",
JU = "getBottomColumns",
PkSz = "isShowRowDetail",
JTf = "allowCellSelect",
JYn3 = "showAllCheckBox",
Nc_ = "frozenEndColumn",
G7 = "allowMoveColumn",
VLR = "allowSortColumn",
S9Uy = "refreshOnExpand",
SVtU = "showCloseButton",
Bmi = "unFrozenColumns",
XCU = "getParentColumn",
VRL = "isVisibleColumn",
FLdM = "getFooterHeight",
VzAm = "getHeaderHeight",
F9k = "_createColumnId",
$Pe = "getRowDetailEl",
PhrG = "scrollIntoView",
_h = "setColumnWidth",
UNL = "setCurrentCell",
FYN = "allowRowSelect",
SlQ = "showSummaryRow",
JUC = "showVGridLines",
UsK = "showHGridLines",
OsXm = "checkRecursive",
JSO = "enableHotTrack",
N9cK = "popupMaxHeight",
ARjH = "popupMinHeight",
JM = "refreshOnClick",
PpG = "getColumnWidth",
U9Fj = "getEditRowData",
Pw = "getParentNode",
AkJ = "removeNodeCls",
X_t = "showRowDetail",
$If = "hideRowDetail",
SDM = "commitEditRow",
QYG = "beginEditCell",
_Qr = "allowCellEdit",
TdJm = "decimalPlaces",
WOm4 = "showFilterRow",
Fr2 = "dropGroupName",
Zj7 = "dragGroupName",
QTS0 = "showTreeLines",
P3c = "popupMaxWidth",
Y7X = "popupMinWidth",
WsX8 = "showMinButton",
MnY = "showMaxButton",
$Vy$ = "getChildNodes",
_If = "getCellEditor",
P2j = "cancelEditRow",
Ure = "getRowByValue",
FR$m = "removeItemCls",
YB = "_createCellId",
PwF = "_createItemId",
_FNO = "setValueField",
I9ni = "getAncestors",
L4N = "collapseNode",
W7e = "removeRowCls",
$XBP = "getColumnBox",
Ql0 = "showCheckBox",
Hlg = "autoCollapse",
ZMpm = "showTreeIcon",
Sak = "checkOnClick",
Kr2H = "defaultValue",
WPt = "resultAsData",
Ajh = "resultAsTree",
Dm7Q = "_ParseString",
V3WP = "getItemValue",
VA6 = "_createRowId",
_Y1 = "isAutoHeight",
H0$ = "findListener",
FnF = "getRegionEl",
UTn = "removeClass",
Cqg = "isFirstNode",
QN2 = "getSelected",
_Fs = "setSelected",
A0A = "multiSelect",
Usv = "tabPosition",
_zL = "columnWidth",
Q4M1 = "handlerSize",
QS = "allowSelect",
L_h5 = "popupHeight",
V_ = "contextMenu",
BFlw = "borderStyle",
L_o = "parentField",
E9w = "closeAction",
Lws = "_rowIdField",
Wpk = "allowResize",
Plr = "showToolbar",
Can = "deselectAll",
J19 = "treeToArray",
TuR = "eachColumns",
PTHV = "getItemText",
Zf6 = "isAutoWidth",
ZOZN = "_initEvents",
TYcW = "constructor",
JlgX = "addNodeCls",
PAAs = "expandNode",
L6r = "setColumns",
Nb = "cancelEdit",
CRtv = "moveColumn",
NlM = "removeNode",
B_w = "setCurrent",
ZUJ = "totalCount",
_8 = "popupWidth",
H35 = "titleField",
KQP = "valueField",
$gC = "showShadow",
NCGk = "showFooter",
Nd5 = "findParent",
Cye = "_getColumn",
CW7m = "_ParseBool",
Jhg = "clearEvent",
O0f = "getCellBox",
DmlL = "selectText",
AYD = "setVisible",
_oH = "isGrouping",
Pdp = "addItemCls",
$b3 = "isSelected",
Ot = "isReadOnly",
Xc$ = "superclass",
HvgL = "getRegion",
BMKa = "isEditing",
JAaF = "hidePopup",
PA = "removeRow",
$L1Z = "addRowCls",
YHnB = "increment",
I4f0 = "allowDrop",
S5r = "pageIndex",
QrZ = "iconStyle",
ULl = "errorMode",
XsI = "textField",
S4OT = "groupName",
Zl = "showEmpty",
Sa8 = "emptyText",
PXb = "showModal",
DA5 = "getColumn",
Ls = "getHeight",
_i = "_ParseInt",
Lvd = "showPopup",
Yh5 = "updateRow",
PHu = "deselects",
S8B = "isDisplay",
X7B7 = "setHeight",
TkP = "removeCls",
DK = "prototype",
X0R = "addClass",
LWgs = "isEquals",
Dk = "maxValue",
RyCH = "minValue",
GQXY = "showBody",
X21 = "tabAlign",
_0Sp = "sizeList",
Tc = "pageSize",
FQZ = "urlField",
PrF = "readOnly",
Hy = "getWidth",
JLT = "isFrozen",
_PR = "loadData",
G_o = "deselect",
G3S = "setValue",
$XOk = "validate",
Z_s = "getAttrs",
B26J = "setWidth",
WRl = "doUpdate",
QM = "doLayout",
PGt = "renderTo",
HH = "setText",
TKUG = "idField",
Lks = "getNode",
SJA = "getItem",
RX = "repaint",
Lhu = "selects",
Uq0 = "setData",
JLTb = "_create",
$Kt = "destroy",
Is = "jsName",
XnB6 = "getRow",
MAi = "select",
W05 = "within",
Mr = "addCls",
LV3H = "render",
UCK = "setXY",
POm = "call";
QFL = function() {
	this.MXr = {};
	this.uid = mini.newId(this.UrF);
	if (!this.id) this.id = this.uid;
	mini.reg(this)
};
QFL[DK] = {
	isControl: true,
	id: null,
	UrF: "mini-",
	CtH: false,
	D$z: true,
	set: function(B) {
		if (typeof B == "string") return this;
		var _ = this.Bfj;
		this.Bfj = false;
		var C = B[PGt] || B[LV3H];
		delete B[PGt];
		delete B[LV3H];
		for (var $ in B) if ($.toLowerCase().indexOf("on") == 0) {
			var F = B[$];
			this.on($.substring(2, $.length).toLowerCase(), F);
			delete B[$]
		}
		for ($ in B) {
			var E = B[$],
			D = "set" + $.charAt(0).toUpperCase() + $.substring(1, $.length),
			A = this[D];
			if (A) A[POm](this, E);
			else this[$] = E
		}
		if (C && this[LV3H]) this[LV3H](C);
		this.Bfj = _;
		if (this[QM]) this[QM]();
		return this
	},
	fire: function(A, B) {
		if (this.D$z == false) return;
		A = A.toLowerCase();
		var _ = this.MXr[A];
		if (_) {
			if (!B) B = {};
			if (B && B != this) {
				B.source = B.sender = this;
				if (!B.type) B.type = A
			}
			for (var $ = 0,
			D = _.length; $ < D; $++) {
				var C = _[$];
				if (C) C[0].apply(C[1], [B])
			}
		}
	},
	on: function(type, fn, scope) {
		if (typeof fn == "string") {
			var f = JLGT(fn);
			if (!f) {
				var id = mini.newId("__str_");
				window[id] = fn;
				eval("fn = function(e){var s = " + id + ";var fn = JLGT(s); if(fn) {fn[POm](this,e)}else{eval(s);}}")
			} else fn = f
		}
		if (typeof fn != "function" || !type) return false;
		type = type.toLowerCase();
		var event = this.MXr[type];
		if (!event) event = this.MXr[type] = [];
		scope = scope || this;
		if (!this[H0$](type, fn, scope)) event.push([fn, scope]);
		return this
	},
	un: function($, C, _) {
		if (typeof C != "function") return false;
		$ = $.toLowerCase();
		var A = this.MXr[$];
		if (A) {
			_ = _ || this;
			var B = this[H0$]($, C, _);
			if (B) A.remove(B)
		}
		return this
	},
	findListener: function(A, E, B) {
		A = A.toLowerCase();
		B = B || this;
		var _ = this.MXr[A];
		if (_) for (var $ = 0,
		D = _.length; $ < D; $++) {
			var C = _[$];
			if (C[0] === E && C[1] === B) return C
		}
	},
	setId: function($) {
		if (!$) throw new Error("id not null");
		if (this.CtH) throw new Error("id just set only one");
		mini["unreg"](this);
		this.id = $;
		if (this.el) this.el.id = $;
		if (this.H4) this.H4.id = $ + "$text";
		if (this.G5) this.G5.id = $ + "$value";
		this.CtH = true;
		mini.reg(this)
	},
	getId: function() {
		return this.id
	},
	destroy: function() {
		mini["unreg"](this);
		this.fire("destroy")
	}
};
DZV = function() {
	DZV[Xc$][TYcW][POm](this);
	this[JLTb]();
	this.el.uid = this.uid;
	this[ZOZN]();
	if (this._clearBorder) this.el.style.borderWidth = "0";
	this[Mr](this.uiCls);
	this[B26J](this.width);
	this[X7B7](this.height);
	this.el.style.display = this.visible ? this.K_7P: "none"
};
Mup(DZV, QFL, {
	jsName: null,
	width: "",
	height: "",
	visible: true,
	readOnly: false,
	enabled: true,
	tooltip: "",
	MHV: "mini-readonly",
	DB$k: "mini-disabled",
	_create: function() {
		this.el = document.createElement("div")
	},
	_initEvents: function() {},
	within: function($) {
		if (Dmv(this.el, $.target)) return true;
		return false
	},
	name: "",
	setName: function($) {
		this.name = $
	},
	getName: function() {
		return this.name
	},
	isAutoHeight: function() {
		var $ = this.el.style.height;
		return $ == "auto" || $ == ""
	},
	isAutoWidth: function() {
		var $ = this.el.style.width;
		return $ == "auto" || $ == ""
	},
	isFixedSize: function() {
		var $ = this.width,
		_ = this.height;
		if (parseInt($) + "px" == $ && parseInt(_) + "px" == _) return true;
		return false
	},
	isRender: function($) {
		return !! (this.el && this.el.parentNode && this.el.parentNode.tagName)
	},
	render: function(_, $) {
		if (typeof _ === "string") if (_ == "#body") _ = document.body;
		else _ = PBm(_);
		if (!_) return;
		if (!$) $ = "append";
		$ = $.toLowerCase();
		if ($ == "before") jQuery(_).before(this.el);
		else if ($ == "preend") jQuery(_).preend(this.el);
		else if ($ == "after") jQuery(_).after(this.el);
		else _.appendChild(this.el);
		this.el.id = this.id;
		this[QM]();
		this.fire("render")
	},
	getEl: function() {
		return this.el
	},
	setJsName: function($) {
		this[Is] = $;
		window[$] = this
	},
	getJsName: function() {
		return this[Is]
	},
	setTooltip: function($) {
		this.tooltip = $;
		this.el.title = $
	},
	getTooltip: function() {
		return this.tooltip
	},
	_sizeChaned: function() {
		this[QM]()
	},
	setWidth: function($) {
		if (parseInt($) == $) $ += "px";
		this.width = $;
		this.el.style.width = $;
		this._sizeChaned()
	},
	getWidth: function(_) {
		var $ = _ ? jQuery(this.el).width() : jQuery(this.el).outerWidth();
		if (_ && this.$Ar) {
			var A = Ps$(this.$Ar);
			$ = $ - A.left - A.right
		}
		return $
	},
	setHeight: function($) {
		if (parseInt($) == $) $ += "px";
		this.height = $;
		this.el.style.height = $;
		this._sizeChaned()
	},
	getHeight: function(_) {
		var $ = _ ? jQuery(this.el).height() : jQuery(this.el).outerHeight();
		if (_ && this.$Ar) {
			var A = Ps$(this.$Ar);
			$ = $ - A.top - A.bottom
		}
		return $
	},
	getBox: function() {
		return Vrm(this.el)
	},
	setBorderStyle: function($) {
		var _ = this.$Ar || this.el;
		MsRJ(_, $);
		this[QM]()
	},
	getBorderStyle: function() {
		return this[BFlw]
	},
	_clearBorder: true,
	setStyle: function($) {
		this.style = $;
		MsRJ(this.el, $);
		if (this._clearBorder) this.el.style.borderWidth = "0";
		this.width = this.el.style.width;
		this.height = this.el.style.height;
		this._sizeChaned()
	},
	getStyle: function() {
		return this.style
	},
	setCls: function($) {
		EhVe(this.el, this.cls);
		Rw(this.el, $);
		this.cls = $
	},
	getCls: function() {
		return this.cls
	},
	addCls: function($) {
		Rw(this.el, $)
	},
	removeCls: function($) {
		EhVe(this.el, $)
	},
	_doReadOnly: function() {
		if (this[PrF]) this[Mr](this.MHV);
		else this[TkP](this.MHV)
	},
	setReadOnly: function($) {
		this[PrF] = $;
		this._doReadOnly()
	},
	getReadOnly: function() {
		return this[PrF]
	},
	getParent: function(A) {
		var $ = document,
		B = this.el.parentNode;
		while (B != $ && B != null) {
			var _ = mini.get(B);
			if (_) {
				if (!mini.isControl(_)) return null;
				if (!A || _.uiCls == A) return _
			}
			B = B.parentNode
		}
		return null
	},
	isReadOnly: function() {
		if (this[PrF] || !this.enabled) return true;
		var $ = this.getParent();
		if ($) return $[Ot]();
		return false
	},
	setEnabled: function($) {
		this.enabled = $;
		if (this.enabled) this[TkP](this.DB$k);
		else this[Mr](this.DB$k);
		this._doReadOnly()
	},
	getEnabled: function() {
		return this.enabled
	},
	enable: function() {
		this.setEnabled(true)
	},
	disable: function() {
		this.setEnabled(false)
	},
	K_7P: "",
	setVisible: function($) {
		this.visible = $;
		if (this.el) {
			this.el.style.display = $ ? this.K_7P: "none";
			this[QM]()
		}
	},
	getVisible: function() {
		return this.visible
	},
	show: function() {
		this[AYD](true)
	},
	hide: function() {
		this[AYD](false)
	},
	isDisplay: function() {
		if (GZf == false) return false;
		var $ = document.body,
		_ = this.el;
		while (1) {
			if (_ == null || !_.style) return false;
			if (_ && _.style && _.style.display == "none") return false;
			if (_ == $) return true;
			_ = _.parentNode
		}
		return true
	},
	O7bE: true,
	beginUpdate: function() {
		this.O7bE = false
	},
	endUpdate: function() {
		this.O7bE = true;
		this[WRl]()
	},
	doUpdate: function() {},
	canLayout: function() {
		if (this.Bfj == false) return false;
		return this[S8B]()
	},
	doLayout: function() {},
	layoutChanged: function() {
		if (this.canLayout() == false) return;
		this[QM]()
	},
	destroy: function(_) {
		if (this.el);
		if (this.el) {
			mini[Jhg](this.el);
			if (_ !== false) {
				var $ = this.el.parentNode;
				if ($) $.removeChild(this.el)
			}
		}
		this.$Ar = null;
		this.el = null;
		mini["unreg"](this);
		this.fire("destroy")
	},
	focus: function() {
		try {
			var $ = this;
			$.el.focus()
		} catch(_) {}
	},
	blur: function() {
		try {
			var $ = this;
			$.el.blur()
		} catch(_) {}
	},
	allowAnim: true,
	setAllowAnim: function($) {
		this.allowAnim = $
	},
	getAllowAnim: function() {
		return this.allowAnim
	},
	Eb: function() {
		return this.el
	},
	mask: function($) {
		if (typeof $ == "string") $ = {
			html: $
		};
		$ = $ || {};
		$.el = this.Eb();
		if (!$.cls) $.cls = this.QEg;
		mini.mask($)
	},
	unmask: function() {
		mini.unmask(this.Eb())
	},
	QEg: "mini-mask-loading",
	loadingMsg: "Loading...",
	loading: function($) {
		this.mask($ || this.loadingMsg)
	},
	setLoadingMsg: function($) {
		this.loadingMsg = $
	},
	getLoadingMsg: function() {
		return this.loadingMsg
	},
	_getContextMenu: function($) {
		var _ = $;
		if (typeof $ == "string") {
			_ = mini.get($);
			if (!_) {
				mini.parse($);
				_ = mini.get($)
			}
		} else if (mini.isArray($)) _ = {
			type: "menu",
			items: $
		};
		else if (!mini.isControl($)) _ = mini.create($);
		return _
	},
	__OnHtmlContextMenu: function(_) {
		var $ = {
			popupEl: this.el,
			htmlEvent: _,
			cancel: false
		};
		this[V_].fire("BeforeOpen", $);
		if ($.cancel == true) return;
		this[V_].fire("opening", $);
		if ($.cancel == true) return;
		this[V_].showAtPos(_.pageX, _.pageY);
		this[V_].fire("Open", $);
		return false
	},
	contextMenu: null,
	setContextMenu: function($) {
		var _ = this._getContextMenu($);
		if (!_) return;
		if (this[V_] !== _) {
			this[V_] = _;
			this[V_].owner = this;
			VPoJ(this.el, "contextmenu", this.__OnHtmlContextMenu, this)
		}
	},
	getContextMenu: function() {
		return this[V_]
	},
	setDefaultValue: function($) {
		this[Kr2H] = $
	},
	getDefaultValue: function() {
		return this[Kr2H]
	},
	setValue: function($) {
		this.value = $
	},
	getValue: function() {
		return this.value
	},
	GX: function($) {},
	getAttrs: function(C) {
		var I = {},
		F = C.className;
		if (F) I.cls = F;
		mini[Dm7Q](C, I, ["id", "name", "width", "height", "borderStyle", "value", "defaultValue", "contextMenu", "tooltip"]);
		mini[CW7m](C, I, ["visible", "enabled", "readOnly"]);
		if (C[PrF] && C[PrF] != "false") I[PrF] = true;
		var E = C.style.cssText;
		if (E) I.style = E;
		if (isIE9) {
			var _ = C.style.background;
			if (_) {
				if (!I.style) I.style = "";
				I.style += ";background:" + _
			}
		}
		if (this.style) if (I.style) I.style = this.style + ";" + I.style;
		else I.style = this.style;
		if (this[BFlw]) if (I[BFlw]) I[BFlw] = this[BFlw] + ";" + I[BFlw];
		else I[BFlw] = this[BFlw];
		var B = mini._attrs;
		if (B) for (var $ = 0,
		G = B.length; $ < G; $++) {
			var D = B[$],
			H = D[0],
			A = D[1];
			if (!A) A = "string";
			if (A == "string") mini[Dm7Q](C, I, [H]);
			else if (A == "bool") mini[CW7m](C, I, [H]);
			else if (A == "int") mini[_i](C, I, [H])
		}
		return I
	}
});
mini._attrs = null;
mini.regHtmlAttr = function(_, $) {
	if (!_) return;
	if (!$) $ = "string";
	if (!mini._attrs) mini._attrs = [];
	mini._attrs.push([_, $])
};
_bO = function() {
	_bO[Xc$][TYcW][POm](this)
};
Mup(_bO, DZV, {
	required: false,
	requiredErrorText: "This field is required.",
	Zaa4: "mini-required",
	errorText: "",
	Gi2: "mini-error",
	VoX: "mini-invalid",
	errorMode: "icon",
	validateOnChanged: true,
	Kou: true,
	validate: function() {
		var $ = {
			value: this.getValue(),
			errorText: "",
			isValid: true
		};
		if (this.required) if (mini.isNull($.value) || $.value === "") {
			$.isValid = false;
			$.errorText = this[EoEr]
		}
		this.fire("validation", $);
		this.errorText = $.errorText;
		this.setIsValid($.isValid);
		return this.isValid()
	},
	isValid: function() {
		return this.Kou
	},
	setIsValid: function($) {
		this.Kou = $;
		this.UeD()
	},
	getIsValid: function() {
		return this.Kou
	},
	setValidateOnChanged: function($) {
		this.validateOnChanged = $
	},
	getValidateOnChanged: function($) {
		return this.validateOnChanged
	},
	setErrorMode: function($) {
		if (!$) $ = "none";
		this[ULl] = $.toLowerCase();
		if (this.Kou == false) this.UeD()
	},
	getErrorMode: function() {
		return this[ULl]
	},
	setErrorText: function($) {
		this.errorText = $;
		if (this.Kou == false) this.UeD()
	},
	getErrorText: function() {
		return this.errorText
	},
	setRequired: function($) {
		this.required = $;
		if (this.required) this[Mr](this.Zaa4);
		else this[TkP](this.Zaa4)
	},
	getRequired: function() {
		return this.required
	},
	setRequiredErrorText: function($) {
		this[EoEr] = $
	},
	getRequiredErrorText: function() {
		return this[EoEr]
	},
	errorIconEl: null,
	getErrorIconEl: function() {
		return this.AiOy
	},
	AJj: function() {},
	UeD: function() {
		var $ = this;
		setTimeout(function() {
			$.NQU()
		},
		1)
	},
	NQU: function() {
		this[TkP](this.Gi2);
		this[TkP](this.VoX);
		this.el.title = "";
		if (this.Kou == false) switch (this[ULl]) {
		case "icon":
			this[Mr](this.Gi2);
			var $ = this.getErrorIconEl();
			if ($) $.title = this.errorText;
			break;
		case "border":
			this[Mr](this.VoX);
			this.el.title = this.errorText;
		default:
			this.AJj();
			break
		} else this.AJj();
		this[QM]()
	},
	GdW: function() {
		if (this.validateOnChanged) this[$XOk]();
		this.fire("valuechanged", {
			value: this.getValue()
		})
	},
	onValueChanged: function(_, $) {
		this.on("valuechanged", _, $)
	},
	onValidation: function(_, $) {
		this.on("validation", _, $)
	},
	getAttrs: function(_) {
		var A = _bO[Xc$][Z_s][POm](this, _);
		mini[Dm7Q](_, A, ["onvaluechanged", "onvalidation", "requiredErrorText", "errorMode"]);
		mini[CW7m](_, A, ["validateOnChanged"]);
		var $ = _.getAttribute("required");
		if (!$) $ = _.required;
		if ($) A.required = $ != "false" ? true: false;
		return A
	}
});
UKsr = function() {
	this.data = [];
	this.$L = [];
	UKsr[Xc$][TYcW][POm](this);
	this[WRl]()
};
Mup(UKsr, _bO, {
	defaultValue: "",
	value: "",
	valueField: "id",
	textField: "text",
	delimiter: ",",
	data: null,
	url: "",
	HO: "mini-list-item",
	EXy1: "mini-list-item-hover",
	_XA2: "mini-list-item-selected",
	set: function(A) {
		if (typeof A == "string") return this;
		var $ = A.value;
		delete A.value;
		var B = A.url;
		delete A.url;
		var _ = A.data;
		delete A.data;
		UKsr[Xc$].set[POm](this, A);
		if (!mini.isNull(_)) this[Uq0](_);
		if (!mini.isNull(B)) this.setUrl(B);
		if (!mini.isNull($)) this[G3S]($);
		return this
	},
	uiCls: "mini-list",
	_create: function() {},
	_initEvents: function() {
		Xs(function() {
			A4v(this.el, "click", this.Vj6T, this);
			A4v(this.el, "dblclick", this.QUTX, this);
			A4v(this.el, "mousedown", this.HG_, this);
			A4v(this.el, "mouseup", this.UP5J, this);
			A4v(this.el, "mousemove", this.MAb, this);
			A4v(this.el, "mouseover", this.Nv5, this);
			A4v(this.el, "mouseout", this.XKd, this);
			A4v(this.el, "keydown", this.GqHp, this);
			A4v(this.el, "keyup", this.UsfN, this);
			A4v(this.el, "contextmenu", this.Kdwk, this)
		},
		this)
	},
	destroy: function($) {
		if (this.el) {
			this.el.onclick = null;
			this.el.ondblclick = null;
			this.el.onmousedown = null;
			this.el.onmouseup = null;
			this.el.onmousemove = null;
			this.el.onmouseover = null;
			this.el.onmouseout = null;
			this.el.onkeydown = null;
			this.el.onkeyup = null;
			this.el.oncontextmenu = null
		}
		UKsr[Xc$][$Kt][POm](this, $)
	},
	name: "",
	setName: function($) {
		this.name = $;
		if (this.G5) mini.setAttr(this.G5, "name", this.name)
	},
	IS3: function(_) {
		var A = BD(_.target, this.HO);
		if (A) {
			var $ = parseInt(mini.getAttr(A, "index"));
			return this.data[$]
		}
	},
	addItemCls: function(_, A) {
		var $ = this.getItemEl(_);
		if ($) Rw($, A)
	},
	removeItemCls: function(_, A) {
		var $ = this.getItemEl(_);
		if ($) EhVe($, A)
	},
	getItemEl: function(_) {
		_ = this[SJA](_);
		var $ = this.data.indexOf(_),
		A = this.Viv6($);
		return document.getElementById(A)
	},
	Z1W: function(_, $) {
		_ = this[SJA](_);
		if (!_) return;
		var A = this.getItemEl(_);
		if ($ && A) this[PhrG](_);
		if (this.EEGTItem == _) return;
		this.SEAf();
		this.EEGTItem = _;
		Rw(A, this.EXy1)
	},
	SEAf: function() {
		if (!this.EEGTItem) return;
		var $ = this.getItemEl(this.EEGTItem);
		if ($) EhVe($, this.EXy1);
		this.EEGTItem = null
	},
	getFocusedItem: function() {
		return this.EEGTItem
	},
	getFocusedIndex: function() {
		return this.data.indexOf(this.EEGTItem)
	},
	LzI: null,
	scrollIntoView: function(A) {
		try {
			var _ = this.getItemEl(A),
			$ = this.LzI || this.el;
			mini[PhrG](_, $, false)
		} catch(B) {}
	},
	getItem: function($) {
		if (typeof $ == "object") return $;
		if (typeof $ == "number") return this.data[$];
		return this.findItems($)[0]
	},
	getCount: function() {
		return this.data.length
	},
	indexOf: function($) {
		return this.data.indexOf($)
	},
	getAt: function($) {
		return this.data[$]
	},
	updateItem: function($, _) {
		$ = this[SJA]($);
		if (!$) return;
		mini.copyTo($, _);
		this[WRl]()
	},
	load: function($) {
		if (typeof $ == "string") this.setUrl($);
		else this[Uq0]($)
	},
	loadData: function($) {
		this[Uq0]($)
	},
	setData: function(data) {
		if (typeof data == "string") data = eval(data);
		if (!mini.isArray(data)) data = [];
		this.data = data;
		this[WRl]();
		if (this.value != "") {
			this[Can]();
			var records = this.findItems(this.value);
			this[Lhu](records)
		}
	},
	getData: function() {
		return this.data.clone()
	},
	setUrl: function($) {
		this.url = $;
		this.LpO({})
	},
	getUrl: function() {
		return this.url
	},
	LpO: function(params) {
		try {
			this.url = eval(this.url)
		} catch(e) {}
		var e = {
			url: this.url,
			async: false,
			type: "get",
			params: params,
			cancel: false
		};
		this.fire("beforeload", e);
		if (e.cancel == true) return;
		var sf = this;
		this.NWj = jQuery.ajax({
			url: e.url,
			async: e.async,
			data: e.params,
			type: e.type,
			cache: false,
			dataType: "text",
			success: function($) {
				var _ = null;
				try {
					_ = mini.decode($)
				} catch(A) {}
				var A = {
					data: _,
					cancel: false
				};
				sf.fire("preload", A);
				if (A.cancel == true) return;
				sf[Uq0](A.data);
				sf.fire("load");
				setTimeout(function() {
					sf[QM]()
				},
				100)
			},
			error: function($, A, _) {
				var B = {
					xmlHttp: $,
					errorCode: A
				};
				sf.fire("loaderror", B)
			}
		})
	},
	setValue: function($) {
		if (mini.isNull($)) $ = "";
		if (this.value !== $) {
			var _ = this.findItems(this.value);
			this[PHu](_);
			this.value = $;
			if (this.G5) this.G5.value = $;
			_ = this.findItems(this.value);
			this[Lhu](_)
		}
	},
	getValue: function() {
		return this.value
	},
	getFormValue: function() {
		return this.value
	},
	setValueField: function($) {
		this[KQP] = $
	},
	getValueField: function() {
		return this[KQP]
	},
	setTextField: function($) {
		this[XsI] = $
	},
	getTextField: function() {
		return this[XsI]
	},
	getItemValue: function($) {
		return String($[this.valueField])
	},
	getItemText: function($) {
		var _ = $[this.textField];
		return mini.isNull(_) ? "": String(_)
	},
	Ydy: function(A) {
		if (mini.isNull(A)) A = [];
		if (!mini.isArray(A)) A = this.findItems(A);
		var B = [],
		C = [];
		for (var _ = 0,
		D = A.length; _ < D; _++) {
			var $ = A[_];
			if ($) {
				B.push(this[V3WP]($));
				C.push(this[PTHV]($))
			}
		}
		return [B.join(this.delimiter), C.join(this.delimiter)]
	},
	findItems: function(B) {
		if (mini.isNull(B) || B === "") return [];
		var E = String(B).split(this.delimiter),
		D = this.data,
		H = {};
		for (var F = 0,
		A = D.length; F < A; F++) {
			var _ = D[F],
			I = _[this.valueField];
			H[I] = _
		}
		var C = [];
		for (var $ = 0,
		G = E.length; $ < G; $++) {
			I = E[$],
			_ = H[I];
			if (_) C.push(_)
		}
		return C
	},
	HJ5N: null,
	$L: [],
	multiSelect: false,
	Uc: function() {
		for (var _ = this.$L.length - 1; _ >= 0; _--) {
			var $ = this.$L[_];
			if (this.data.indexOf($) == -1) this.$L.removeAt(_)
		}
		var A = this.Ydy(this.$L);
		this.value = A[0];
		if (this.G5) this.G5.value = this.value
	},
	setMultiSelect: function($) {
		this[A0A] = $
	},
	getMultiSelect: function() {
		return this[A0A]
	},
	isSelected: function($) {
		if (!$) return false;
		return this.$L.indexOf($) != -1
	},
	getSelecteds: function() {
		return this.$L.clone()
	},
	setSelected: function($) {
		if ($) {
			this.HJ5N = $;
			this[MAi]($)
		}
	},
	getSelected: function() {
		return this.HJ5N
	},
	select: function($) {
		$ = this[SJA]($);
		if (!$) return;
		if (this[$b3]($)) return;
		this[Lhu]([$])
	},
	deselect: function($) {
		$ = this[SJA]($);
		if (!$) return;
		if (!this[$b3]($)) return;
		this[PHu]([$])
	},
	selectAll: function() {
		var $ = this.data.clone();
		this[Lhu]($)
	},
	deselectAll: function() {
		this[PHu](this.$L)
	},
	clearSelect: function() {
		this[Can]()
	},
	selects: function(A) {
		if (!A || A.length == 0) return;
		A = A.clone();
		for (var _ = 0,
		C = A.length; _ < C; _++) {
			var $ = A[_];
			if (!this[$b3]($)) this.$L.push($)
		}
		var B = this;
		setTimeout(function() {
			B.NqM()
		},
		1)
	},
	deselects: function(A) {
		if (!A || A.length == 0) return;
		A = A.clone();
		for (var _ = A.length - 1; _ >= 0; _--) {
			var $ = A[_];
			if (this[$b3]($)) this.$L.remove($)
		}
		var B = this;
		setTimeout(function() {
			B.NqM()
		},
		1)
	},
	NqM: function() {
		var C = this.Ydy(this.$L);
		this.value = C[0];
		if (this.G5) this.G5.value = this.value;
		for (var A = 0,
		D = this.data.length; A < D; A++) {
			var _ = this.data[A],
			F = this[$b3](_);
			if (F) this[Pdp](_, this._XA2);
			else this[FR$m](_, this._XA2);
			var $ = this.data.indexOf(_),
			E = this.ZIm($),
			B = document.getElementById(E);
			if (B) B.checked = !!F
		}
	},
	Ym6h: function(_, B) {
		var $ = this.Ydy(this.$L);
		this.value = $[0];
		if (this.G5) this.G5.value = this.value;
		var A = {
			selecteds: this.getSelecteds(),
			selected: this[QN2](),
			value: this.getValue()
		};
		this.fire("SelectionChanged", A)
	},
	ZIm: function($) {
		return this.uid + "$ck$" + $
	},
	Viv6: function($) {
		return this.uid + "$" + $
	},
	Vj6T: function($) {
		this.NhB($, "Click")
	},
	QUTX: function($) {
		this.NhB($, "Dblclick")
	},
	HG_: function($) {
		this.NhB($, "MouseDown")
	},
	UP5J: function($) {
		this.NhB($, "MouseUp")
	},
	MAb: function($) {
		this.NhB($, "MouseMove")
	},
	Nv5: function($) {
		this.NhB($, "MouseOver")
	},
	XKd: function($) {
		this.NhB($, "MouseOut")
	},
	GqHp: function($) {
		this.NhB($, "KeyDown")
	},
	UsfN: function($) {
		this.NhB($, "KeyUp")
	},
	Kdwk: function($) {
		this.NhB($, "ContextMenu")
	},
	NhB: function(C, A) {
		if (!this.enabled) return;
		var $ = this.IS3(C);
		if (!$) return;
		var B = this["_OnItem" + A];
		if (B) B[POm](this, $, C);
		else {
			var _ = {
				item: $,
				htmlEvent: C
			};
			this.fire("item" + A, _)
		}
	},
	_OnItemClick: function($, A) {
		if (this[Ot]() || this.enabled == false || $.enabled === false) {
			A.preventDefault();
			return
		}
		var _ = this.getValue();
		if (this[A0A]) {
			if (this[$b3]($)) {
				this[G_o]($);
				if (this.HJ5N == $) this.HJ5N = null
			} else {
				this[MAi]($);
				this.HJ5N = $
			}
			this.Ym6h()
		} else if (!this[$b3]($)) {
			this[Can]();
			this[MAi]($);
			this.HJ5N = $;
			this.Ym6h()
		}
		if (_ != this.getValue()) this.GdW();
		var A = {
			item: $,
			htmlEvent: A
		};
		this.fire("itemclick", A)
	},
	VI1: true,
	_OnItemMouseOut: function($, _) {
		if (!this.enabled) return;
		if (this.VI1) this.SEAf();
		var _ = {
			item: $,
			htmlEvent: _
		};
		this.fire("itemmouseout", _)
	},
	_OnItemMouseMove: function($, _) {
		if (!this.enabled || $.enabled === false) return;
		this.Z1W($);
		var _ = {
			item: $,
			htmlEvent: _
		};
		this.fire("itemmousemove", _)
	},
	onItemClick: function(_, $) {
		this.on("itemclick", _, $)
	},
	onItemMouseDown: function(_, $) {
		this.on("itemmousedown", _, $)
	},
	onBeforeLoad: function(_, $) {
		this.on("beforeload", _, $)
	},
	onLoad: function(_, $) {
		this.on("load", _, $)
	},
	onLoadError: function(_, $) {
		this.on("loaderror", _, $)
	},
	onPreLoad: function(_, $) {
		this.on("preload", _, $)
	},
	getAttrs: function(C) {
		var G = UKsr[Xc$][Z_s][POm](this, C);
		mini[Dm7Q](C, G, ["url", "data", "value", "textField", "valueField", "onitemclick", "onitemmousemove", "onselectionchanged", "onitemdblclick", "onbeforeload", "onload", "onloaderror", "ondataload"]);
		mini[CW7m](C, G, ["multiSelect"]);
		var E = G[KQP] || this[KQP],
		B = G[XsI] || this[XsI];
		if (C.nodeName.toLowerCase() == "select") {
			var D = [];
			for (var A = 0,
			F = C.length; A < F; A++) {
				var _ = C.options[A],
				$ = {};
				$[B] = _.text;
				$[E] = _.value;
				D.push($)
			}
			if (D.length > 0) G.data = D
		}
		return G
	}
});
mini._Layouts = {};
mini.layout = function($, _) {
	function A(C) {
		var D = mini.get(C);
		if (D) {
			if (D[QM]) if (!mini._Layouts[D.uid]) {
				mini._Layouts[D.uid] = D;
				if (_ !== false || D.isFixedSize() == false) D[QM](false);
				delete mini._Layouts[D.uid]
			}
		} else {
			var E = C.childNodes;
			if (E) for (var $ = 0,
			F = E.length; $ < F; $++) {
				var B = E[$];
				A(B)
			}
		}
	}
	if (!$) $ = document.body;
	A($)
};
mini.applyTo = function(_) {
	_ = PBm(_);
	if (!_) return this;
	if (mini.get(_)) throw new Error("not applyTo a mini control");
	var $ = this[Z_s](_);
	delete $._applyTo;
	if (mini.isNull($[Kr2H]) && !mini.isNull($.value)) $[Kr2H] = $.value;
	var A = _.parentNode;
	if (A && this.el != _) A.replaceChild(this.el, _);
	this.set($);
	this.GX(_);
	return this
};
mini._doParse = function(G) {
	var F = G.nodeName.toLowerCase();
	if (!F) return;
	var B = G.className;
	if (B) {
		var $ = mini.get(G);
		if (!$) {
			var H = B.split(" ");
			for (var E = 0,
			C = H.length; E < C; E++) {
				var A = H[E],
				I = mini.getClassByUICls(A);
				if (I) {
					var D = new I();
					mini.applyTo[POm](D, G);
					G = D.el;
					break
				}
			}
		}
	}
	if (F == "select" || Adi(G, "mini-menu") || Adi(G, "mini-datagrid") || Adi(G, "mini-treegrid") || Adi(G, "mini-tree") || Adi(G, "mini-button") || Adi(G, "mini-textbox") || Adi(G, "mini-buttonedit")) return;
	var J = mini[$Vy$](G, true);
	for (E = 0, C = J.length; E < C; E++) {
		var _ = J[E];
		if (_.nodeType == 1) if (_.parentNode == G) mini._doParse(_)
	}
};
mini._Removes = [];
mini.parse = function($) {
	if (typeof $ == "string") {
		var A = $;
		$ = PBm(A);
		if (!$) $ = document.body
	}
	if ($ && !mini.isElement($)) $ = $.el;
	if (!$) $ = document.body;
	var _ = GZf;
	if (isIE) GZf = false;
	mini._doParse($);
	GZf = _;
	mini.layout($)
};
mini[Dm7Q] = function(B, A, E) {
	for (var $ = 0,
	D = E.length; $ < D; $++) {
		var C = E[$],
		_ = mini.getAttr(B, C);
		if (_) A[C] = _
	}
};
mini[CW7m] = function(B, A, E) {
	for (var $ = 0,
	D = E.length; $ < D; $++) {
		var C = E[$],
		_ = mini.getAttr(B, C);
		if (_) A[C] = _ == "true" ? true: false
	}
};
mini[_i] = function(B, A, E) {
	for (var $ = 0,
	D = E.length; $ < D; $++) {
		var C = E[$],
		_ = parseInt(mini.getAttr(B, C));
		if (!isNaN(_)) A[C] = _
	}
};
mini._ParseColumns = function(N) {
	var G = [],
	O = mini[$Vy$](N);
	for (var M = 0,
	H = O.length; M < H; M++) {
		var C = O[M],
		T = jQuery(C),
		D = {},
		J = null,
		K = null,
		_ = mini[$Vy$](C);
		if (_) for (var $ = 0,
		P = _.length; $ < P; $++) {
			var B = _[$],
			A = jQuery(B).attr("property");
			if (!A) continue;
			A = A.toLowerCase();
			if (A == "columns") {
				D.columns = mini._ParseColumns(B);
				jQuery(B).remove()
			}
			if (A == "editor" || A == "filter") {
				var F = B.className,
				R = F.split(" ");
				for (var L = 0,
				S = R.length; L < S; L++) {
					var E = R[L],
					Q = mini.getClassByUICls(E);
					if (Q) {
						var I = new Q();
						if (A == "filter") {
							K = I[Z_s](B);
							K.type = I.type
						} else {
							J = I[Z_s](B);
							J.type = I.type
						}
						break
					}
				}
				jQuery(B).remove()
			}
		}
		D.header = C.innerHTML;
		mini[Dm7Q](C, D, ["name", "header", "field", "editor", "filter", "renderer", "width", "type", "renderer", "headerAlign", "align", "headerCls", "cellCls", "headerStyle", "cellStyle", "displayField", "dateFormat", "listFormat", "mapFormat", "trueValue", "falseValue"]);
		mini[CW7m](C, D, ["visible", "readOnly", "allowSort", "allowReisze", "allowMove", "allowDrag", "autoShowPopup"]);
		if (J) D.editor = J;
		if (K) D.filter = K;
		G.push(D)
	}
	return G
};
mini._Columns = {};
mini[Cye] = function($) {
	var _ = mini._Columns[$.toLowerCase()];
	if (!_) return {};
	return _()
};
mini.IndexColumn = function($) {
	return mini.copyTo({
		width: 30,
		cellCls: "",
		align: "center",
		draggable: false,
		init: function($) {
			$.on("addrow", this.__OnIndexChanged, this);
			$.on("removerow", this.__OnIndexChanged, this);
			$.on("moverow", this.__OnIndexChanged, this);
			if ($.isTree) {
				$.on("loadnode", this.__OnIndexChanged, this);
				this._gridUID = $.uid;
				this[Lws] = "_id"
			}
		},
		getNumberId: function($) {
			return this._gridUID + "$number$" + $[this._rowIdField]
		},
		createNumber: function($, _) {
			if (mini.isNull($[S5r])) return _ + 1;
			else return ($[S5r] * $[Tc]) + _ + 1
		},
		renderer: function(A) {
			var $ = A.sender;
			if (this.draggable) {
				if (!A.cellStyle) A.cellStyle = "";
				A.cellStyle += ";cursor:move;"
			}
			var _ = "<div id=\"" + this.getNumberId(A.record) + "\">";
			if (mini.isNull($[S5r])) _ += A.rowIndex + 1;
			else _ += ($[S5r] * $[Tc]) + A.rowIndex + 1;
			_ += "</div>";
			return _
		},
		__OnIndexChanged: function(F) {
			var $ = F.sender,
			C = $.toArray();
			for (var A = 0,
			D = C.length; A < D; A++) {
				var _ = C[A],
				E = this.getNumberId(_),
				B = document.getElementById(E);
				if (B) B.innerHTML = this.createNumber($, A)
			}
		}
	},
	$)
};
mini._Columns["indexcolumn"] = mini.IndexColumn;
mini.CheckColumn = function($) {
	return mini.copyTo({
		width: 30,
		cellCls: "mini-checkcolumn",
		headerCls: "mini-checkcolumn",
		_multiRowSelect: true,
		header: function($) {
			var A = this.uid + "checkall",
			_ = "<input type=\"checkbox\" id=\"" + A + "\" />";
			if (this[A0A] == false) _ = "";
			return _
		},
		getCheckId: function($) {
			return this._gridUID + "$checkcolumn$" + $[this._rowIdField]
		},
		init: function($) {
			$.on("selectionchanged", this.VQ, this);
			$.on("HeaderCellClick", this.Dw, this)
		},
		renderer: function(C) {
			var B = this.getCheckId(C.record),
			_ = C.sender[$b3](C.record),
			A = "checkbox",
			$ = C.sender;
			if ($[A0A] == false) A = "radio";
			return "<input type=\"" + A + "\" id=\"" + B + "\" " + (_ ? "checked": "") + " hidefocus style=\"outline:none;\" onclick=\"return false\"/>"
		},
		Dw: function(B) {
			var $ = B.sender,
			A = $.uid + "checkall",
			_ = document.getElementById(A);
			if (_) if ($[A0A]) {
				if (_.checked) $.selectAll();
				else $[Can]()
			} else {
				$[Can]();
				if (_.checked) $[MAi](0)
			}
		},
		VQ: function(G) {
			var $ = G.sender,
			C = $.toArray();
			for (var A = 0,
			D = C.length; A < D; A++) {
				var _ = C[A],
				F = $[$b3](_),
				E = $.uid + "$checkcolumn$" + _[$._rowIdField],
				B = document.getElementById(E);
				if (B) B.checked = F
			}
		}
	},
	$)
};
mini._Columns["checkcolumn"] = mini.CheckColumn;
mini.ExpandColumn = function($) {
	return mini.copyTo({
		width: 30,
		cellCls: "",
		align: "center",
		draggable: false,
		cellStyle: "padding:0",
		renderer: function($) {
			return "<a class=\"mini-grid-ecIcon\" href=\"javascript:#\" onclick=\"return false\"></a>"
		},
		init: function($) {
			$.on("cellclick", this.Pob, this)
		},
		Pob: function(A) {
			var $ = A.sender;
			if (A.column == this && $[PkSz]) if (BD(A.htmlEvent.target, "mini-grid-ecIcon")) {
				var _ = $[PkSz](A.record);
				if ($.autoHideRowDetail) $.hideAllRowDetail();
				if (_) $[$If](A.record);
				else $[X_t](A.record)
			}
		}
	},
	$)
};
mini._Columns["expandcolumn"] = mini.ExpandColumn;
JSgMColumn = function($) {
	return mini.copyTo({
		header: "#",
		headerAlign: "center",
		cellCls: "mini-checkcolumn",
		trueValue: true,
		falseValue: false,
		readOnly: false,
		getCheckId: function($) {
			return this._gridUID + "$checkbox$" + $[this._rowIdField]
		},
		renderer: function(B) {
			var A = this.getCheckId(B.record),
			_ = B.record[B.field] == this.trueValue ? true: false,
			$ = "checkbox";
			return "<input type=\"" + $ + "\" id=\"" + A + "\" " + (_ ? "checked": "") + " hidefocus style=\"outline:none;\" onclick=\"return false;\"/>"
		},
		init: function($) {
			this.grid = $;
			$.on("cellclick",
			function(C) {
				if (C.column == this) {
					if (this[PrF]) return;
					var B = this.getCheckId(C.record),
					A = C.htmlEvent.target;
					if (A.id == B) {
						C.cancel = false;
						C.value = C.record[C.field];
						$.fire("cellbeginedit", C);
						if (C.cancel !== true) {
							var _ = C.record[C.field] == this.trueValue ? this.falseValue: this.trueValue;
							if ($.Fq1) $.Fq1(C.record, C.column, _)
						}
					}
				}
			},
			this);
			var _ = parseInt(this.trueValue),
			A = parseInt(this.falseValue);
			if (!isNaN(_)) this.trueValue = _;
			if (!isNaN(A)) this.falseValue = A
		}
	},
	$)
};
mini._Columns["checkboxcolumn"] = JSgMColumn;
JXColumn = function($) {
	return mini.copyTo({
		renderer: function(M) {
			var _ = M.value ? String(M.value) : "",
			C = _.split(","),
			D = "id",
			J = "text",
			A = {},
			G = M.column.editor;
			if (G && G.type == "combobox") {
				var B = this._combobox;
				if (!B) {
					if (mini.isControl(G)) B = G;
					else B = mini.create(G);
					this._combobox = B
				}
				D = B.getValueField();
				J = B.getTextField();
				A = this._valueMaps;
				if (!A) {
					A = {};
					var K = B.getData();
					for (var H = 0,
					E = K.length; H < E; H++) {
						var $ = K[H];
						A[$[D]] = $
					}
					this._valueMaps = A
				}
			}
			var L = [];
			for (H = 0, E = C.length; H < E; H++) {
				var F = C[H],
				$ = A[F];
				if ($) {
					var I = $[J] || "";
					L.push(I)
				}
			}
			return L.join(",")
		}
	},
	$)
};
mini._Columns["comboboxcolumn"] = JXColumn;
XvKg = function($) {
	this.owner = $;
	VPoJ(this.owner.el, "mousedown", this.HG_, this)
};
XvKg[DK] = {
	HG_: function(_) {
		if (Adi(_.target, "mini-grid-resizeGrid") && this.owner[Wpk]) {
			var $ = this.E6W();
			$.start(_)
		}
	},
	E6W: function() {
		if (!this._resizeDragger) this._resizeDragger = new mini.Drag({
			capture: true,
			onStart: mini.createDelegate(this.Zn, this),
			onMove: mini.createDelegate(this.Utfh, this),
			onStop: mini.createDelegate(this.OOu4, this)
		});
		return this._resizeDragger
	},
	Zn: function($) {
		this.proxy = mini.append(document.body, "<div class=\"mini-grid-resizeProxy\"></div>");
		this.proxy.style.cursor = "se-resize";
		this.elBox = Vrm(this.owner.el);
		_cw(this.proxy, this.elBox)
	},
	Utfh: function(B) {
		var $ = this.owner,
		D = B.now[0] - B.init[0],
		_ = B.now[1] - B.init[1],
		A = this.elBox.width + D,
		C = this.elBox.height + _;
		if (A < $.minWidth) A = $.minWidth;
		if (C < $.minHeight) C = $.minHeight;
		if (A > $.maxWidth) A = $.maxWidth;
		if (C > $.maxHeight) C = $.maxHeight;
		mini.setSize(this.proxy, A, C)
	},
	OOu4: function($, A) {
		if (!this.proxy) return;
		var _ = Vrm(this.proxy);
		jQuery(this.proxy).remove();
		this.proxy = null;
		this.elBox = null;
		if (A) {
			this.owner[B26J](_.width);
			this.owner[X7B7](_.height)
		}
	}
};
mini.__IFrameCreateCount = 1;
mini.createIFrame = function(C, D) {
	var F = "__iframe_onload" + mini.__IFrameCreateCount++;
	window[F] = _;
	var E = "<iframe style=\"width:100%;height:100%;\" onload=\"" + F + "()\"  frameborder=\"0\"></iframe>",
	$ = document.createElement("div"),
	B = mini.append($, E),
	G = false;
	setTimeout(function() {
		B.src = C;
		G = true
	},
	5);
	var A = true;
	function _() {
		if (G == false) return;
		setTimeout(function() {
			if (D) D(B, A);
			A = false
		},
		1)
	}
	B._ondestroy = function() {
		window[F] = mini.emptyFn;
		B.src = "";
		B._ondestroy = null;
		B = null
	};
	return B
};
I5k = function(C) {
	if (typeof C == "string") C = {
		url: C
	};
	C = mini.copyTo({
		width: 700,
		height: 400,
		allowResize: true,
		allowModal: true,
		title: "",
		titleIcon: "",
		iconCls: "",
		iconStyle: "",
		bodyStyle: "padding:0",
		url: "",
		showCloseButton: true,
		showFooter: false
	},
	C);
	C[E9w] = "destroy";
	var $ = C.onload;
	delete C.onload;
	var B = C.ondestroy;
	delete C.ondestroy;
	var _ = C.url;
	delete C.url;
	var A = new NBMP();
	A.set(C);
	A.load(_, $, B);
	A.show();
	return A
};
mini.open = function(B) {
	if (!B) return;
	B.Owner = window;
	var $ = [];
	function _(A) {
		if (A.mini) $.push(A);
		if (A.parent && A.parent != A) _(A.parent)
	}
	_(window);
	var A = $[$.length - 1];
	return A.I5k(B)
};
mini.openTop = mini.open;
mini.getData = function(C, A, E, D, _) {
	var $ = mini.getText(C, A, E, D, _),
	B = mini.decode($);
	return B
};
mini.getText = function(B, A, D, C, _) {
	var $ = null;
	jQuery.ajax({
		url: B,
		data: A,
		async: false,
		type: _ ? _: "get",
		cache: false,
		dataType: "text",
		success: function(A, _) {
			$ = A
		},
		error: C
	});
	return $
};
if (!window.mini_RootPath) mini_RootPath = "/";
JfYD = function(B) {
	var A = document.getElementsByTagName("script"),
	D = "";
	for (var $ = 0,
	E = A.length; $ < E; $++) {
		var C = A[$].src;
		if (C.indexOf(B) != -1) {
			var F = C.split(B);
			D = F[0];
			break
		}
	}
	var _ = location.href;
	_ = _.split("#")[0];
	_ = _.split("?")[0];
	F = _.split("/");
	F.length = F.length - 1;
	_ = F.join("/");
	if (D.indexOf("http:") == -1 && D.indexOf("file:") == -1) D = _ + "/" + D;
	return D
};
if (!window.mini_JSPath) mini_JSPath = JfYD("miniui.js");
mini.update = function(A, _) {
	if (typeof A == "string") A = {
		url: A
	};
	if (_) A.el = _;
	A = mini.copyTo({
		el: null,
		url: "",
		async: false,
		type: "get",
		cache: false,
		dataType: "text",
		success: function(_) {
			var B = A.el;
			if (B) {
				$(B).html(_);
				mini.parse(B)
			}
		},
		error: function($, A, _) {}
	},
	A);
	jQuery.ajax(A)
};
mini.createSingle = function($) {
	if (typeof $ == "string") $ = mini.getClass($);
	if (typeof $ != "function") return;
	var _ = $.single;
	if (!_) _ = $.single = new $();
	return _
};
mini.createTopSingle = function($) {
	if (typeof $ != "function") return;
	var _ = $[DK].type;
	if (top && top != window && top.mini && top.mini.getClass(_)) return top.mini.createSingle(_);
	else return mini.createSingle($)
};
mini.emptyFn = function() {};
mini.Drag = function($) {
	mini.copyTo(this, $)
};
mini.Drag[DK] = {
	onStart: mini.emptyFn,
	onMove: mini.emptyFn,
	onStop: mini.emptyFn,
	capture: false,
	fps: 20,
	event: null,
	delay: 80,
	start: function(_) {
		_.preventDefault();
		if (_) this.event = _;
		this.now = this.init = [this.event.pageX, this.event.pageY];
		var $ = document;
		VPoJ($, "mousemove", this.move, this);
		VPoJ($, "mouseup", this.stop, this);
		VPoJ($, "contextmenu", this.contextmenu, this);
		if (this.context) VPoJ(this.context, "contextmenu", this.contextmenu, this);
		this.trigger = _.target;
		mini.selectable(this.trigger, false);
		mini.selectable($.body, false);
		if (this.capture) if (isIE) this.trigger.setCapture(true);
		else if (document.captureEvents) document.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP | Event.MOUSEDOWN);
		this.started = false;
		this.startTime = new Date()
	},
	contextmenu: function($) {
		if (this.context) Ri(this.context, "contextmenu", this.contextmenu, this);
		Ri(document, "contextmenu", this.contextmenu, this);
		$.preventDefault();
		$.stopPropagation()
	},
	move: function(_) {
		if (this.delay) if (new Date() - this.startTime < this.delay) return;
		if (!this.started) {
			this.started = true;
			this.onStart(this)
		}
		var $ = this;
		if (!this.timer) {
			$.now = [_.pageX, _.pageY];
			$.event = _;
			$.onMove($);
			$.timer = null
		}
	},
	stop: function(B) {
		this.now = [B.pageX, B.pageY];
		this.event = B;
		if (this.timer) {
			clearTimeout(this.timer);
			this.timer = null
		}
		var A = document;
		mini.selectable(this.trigger, true);
		mini.selectable(A.body, true);
		if (this.capture) if (isIE) this.trigger.releaseCapture();
		else if (document.captureEvents) document.releaseEvents(Event.MOUSEMOVE | Event.MOUSEUP | Event.MOUSEDOWN);
		var _ = mini.MouseButton.Right != B.button;
		if (_ == false) B.preventDefault();
		Ri(A, "mousemove", this.move, this);
		Ri(A, "mouseup", this.stop, this);
		var $ = this;
		setTimeout(function() {
			Ri(document, "contextmenu", $.contextmenu, $);
			if ($.context) Ri($.context, "contextmenu", $.contextmenu, $)
		},
		1);
		if (this.started) this.onStop(this, _)
	}
};
mini.JSON = new(function() {
	var sb = [],
	useHasOwn = !!{}.hasOwnProperty,
	replaceString = function($, A) {
		var _ = m[A];
		if (_) return _;
		_ = A.charCodeAt();
		return "\\u00" + Math.floor(_ / 16).toString(16) + (_ % 16).toString(16)
	},
	doEncode = function($) {
		if ($ === null) {
			sb[sb.length] = "null";
			return
		}
		var A = typeof $;
		if (A == "undefined") {
			sb[sb.length] = "null";
			return
		} else if ($.push) {
			sb[sb.length] = "[";
			var D, _, C = $.length,
			E;
			for (_ = 0; _ < C; _ += 1) {
				E = $[_];
				A = typeof E;
				if (A == "undefined" || A == "function" || A == "unknown");
				else {
					if (D) sb[sb.length] = ",";
					doEncode(E);
					D = true
				}
			}
			sb[sb.length] = "]";
			return
		} else if ($.getFullYear) {
			var B;
			sb[sb.length] = "\"";
			sb[sb.length] = $.getFullYear();
			sb[sb.length] = "-";
			B = $.getMonth() + 1;
			sb[sb.length] = B < 10 ? "0" + B: B;
			sb[sb.length] = "-";
			B = $.getDate();
			sb[sb.length] = B < 10 ? "0" + B: B;
			sb[sb.length] = "T";
			B = $.getHours();
			sb[sb.length] = B < 10 ? "0" + B: B;
			sb[sb.length] = ":";
			B = $.getMinutes();
			sb[sb.length] = B < 10 ? "0" + B: B;
			sb[sb.length] = ":";
			B = $.getSeconds();
			sb[sb.length] = B < 10 ? "0" + B: B;
			sb[sb.length] = "\"";
			return
		} else if (A == "string") {
			if (strReg1.test($)) {
				sb[sb.length] = "\"";
				sb[sb.length] = $.replace(strReg2, replaceString);
				sb[sb.length] = "\"";
				return
			}
			sb[sb.length] = "\"" + $ + "\"";
			return
		} else if (A == "number") {
			sb[sb.length] = $;
			return
		} else if (A == "boolean") {
			sb[sb.length] = String($);
			return
		} else {
			sb[sb.length] = "{";
			D,
			_,
			E;
			for (_ in $) if (!useHasOwn || $.hasOwnProperty(_)) {
				E = $[_];
				A = typeof E;
				if (A == "undefined" || A == "function" || A == "unknown");
				else {
					if (D) sb[sb.length] = ",";
					doEncode(_);
					sb[sb.length] = ":";
					doEncode(E);
					D = true
				}
			}
			sb[sb.length] = "}";
			return
		}
	},
	m = {
		"\b": "\\b",
		"\t": "\\t",
		"\n": "\\n",
		"\f": "\\f",
		"\r": "\\r",
		"\"": "\\\"",
		"\\": "\\\\"
	},
	strReg1 = /["\\\x00-\x1f]/,
	strReg2 = /([\x00-\x1f\\"])/g;
	this.encode = function() {
		var $;
		return function($, _) {
			sb = [];
			doEncode($);
			return sb.join("")
		}
	} ();
	this.decode = function() {
		var re = /[\"\'](\d{4})-(\d{2})-(\d{2})[T ](\d{2}):(\d{2}):(\d{2})[\"\']/g;
		return function(json) {
			if (json === "" || json === null || json === undefined) return json;
			json = json.replace(re, "new Date($1,$2-1,$3,$4,$5,$6)");
			var exp = json.replace(__js_dateRegEx, "$1new Date($2)"),
			s = eval("(" + json + ")");
			return s
		}
	} ()
})();
__js_dateRegEx = new RegExp("(^|[^\\\\])\\\"\\\\/Date\\((-?[0-9]+)(?:[a-zA-Z]|(?:\\+|-)[0-9]{4})?\\)\\\\/\\\"", "g");
mini.encode = mini.JSON.encode;
mini.decode = mini.JSON.decode;
mini.clone = function($) {
	if ($ === null || $ === undefined) return $;
	var B = mini.encode($),
	_ = mini.decode(B);
	function A(B) {
		for (var _ = 0,
		D = B.length; _ < D; _++) {
			var $ = B[_];
			delete $._state;
			delete $._id;
			delete $._pid;
			for (var C in $) {
				var E = $[C];
				if (E instanceof Array) A(E)
			}
		}
	}
	A(_ instanceof Array ? _: [_]);
	return _
};
var DAY_MS = 86400000,
HOUR_MS = 3600000,
MINUTE_MS = 60000;
mini.copyTo(mini, {
	clearTime: function($) {
		if (!$) return null;
		return new Date($.getFullYear(), $.getMonth(), $.getDate())
	},
	maxTime: function($) {
		if (!$) return null;
		return new Date($.getFullYear(), $.getMonth(), $.getDate(), 23, 59, 59)
	},
	cloneDate: function($) {
		if (!$) return null;
		return new Date($.getTime())
	},
	addDate: function(A, $, _) {
		if (!_) _ = "D";
		A = new Date(A.getTime());
		switch (_.toUpperCase()) {
		case "Y":
			A.setFullYear(A.getFullYear() + $);
			break;
		case "MO":
			A.setMonth(A.getMonth() + $);
			break;
		case "D":
			A.setDate(A.getDate() + $);
			break;
		case "H":
			A.setHours(A.getHours() + $);
			break;
		case "M":
			A.setMinutes(A.getMinutes() + $);
			break;
		case "S":
			A.setSeconds(A.getSeconds() + $);
			break;
		case "MS":
			A.setMilliseconds(A.getMilliseconds() + $);
			break
		}
		return A
	},
	getWeek: function(D, $, _) {
		$ += 1;
		var E = Math.floor((14 - ($)) / 12),
		G = D + 4800 - E,
		A = ($) + (12 * E) - 3,
		C = _ + Math.floor(((153 * A) + 2) / 5) + (365 * G) + Math.floor(G / 4) - Math.floor(G / 100) + Math.floor(G / 400) - 32045,
		F = (C + 31741 - (C % 7)) % 146097 % 36524 % 1461,
		H = Math.floor(F / 1460),
		B = ((F - H) % 365) + H;
		NumberOfWeek = Math.floor(B / 7) + 1;
		return NumberOfWeek
	},
	getWeekStartDate: function(C, B) {
		if (!B) B = 0;
		if (B > 6 || B < 0) throw new Error("out of weekday");
		var A = C.getDay(),
		_ = B - A;
		if (A < B) _ -= 7;
		var $ = new Date(C.getFullYear(), C.getMonth(), C.getDate() + _);
		return $
	},
	getShortWeek: function(_) {
		var $ = this.dateInfo.daysShort;
		return $[_]
	},
	getLongWeek: function(_) {
		var $ = this.dateInfo.daysLong;
		return $[_]
	},
	getShortMonth: function($) {
		var _ = this.dateInfo.monthsShort;
		return _[$]
	},
	getLongMonth: function($) {
		var _ = this.dateInfo.monthsLong;
		return _[$]
	},
	dateInfo: {
		monthsLong: ["January", "Febraury", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		daysLong: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
		daysShort: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
		quarterLong: ["Q1", "Q2", "Q3", "Q4"],
		quarterShort: ["Q1", "Q2", "Q3", "Q4"],
		halfYearLong: ["first half", "second half"],
		patterns: {
			"d": "M/d/yyyy",
			"D": "dddd,MMMM dd,yyyy",
			"f": "dddd,MMMM dd,yyyy H:mm tt",
			"F": "dddd,MMMM dd,yyyy H:mm:ss tt",
			"g": "M/d/yyyy H:mm tt",
			"G": "M/d/yyyy H:mm:ss tt",
			"m": "MMMM dd",
			"o": "yyyy-MM-ddTHH:mm:ss.fff",
			"s": "yyyy-MM-ddTHH:mm:ss",
			"t": "H:mm tt",
			"T": "H:mm:ss tt",
			"U": "dddd,MMMM dd,yyyy HH:mm:ss tt",
			"y": "MMM,yyyy"
		},
		tt: {
			"AM": "AM",
			"PM": "PM"
		},
		ten: {
			"Early": "Early",
			"Mid": "Mid",
			"Late": "Late"
		},
		today: "Today",
		clockType: 24
	}
});
Date[DK].getHalfYear = function() {
	if (!this.getMonth) return null;
	var $ = this.getMonth();
	if ($ < 6) return 0;
	return 1
};
Date[DK].getQuarter = function() {
	if (!this.getMonth) return null;
	var $ = this.getMonth();
	if ($ < 3) return 0;
	if ($ < 6) return 1;
	if ($ < 9) return 2;
	return 3
};
mini.formatDate = function(C, O, F) {
	if (!C || !C.getFullYear || isNaN(C)) return "";
	var G = C.toString(),
	B = mini.dateInfo;
	if (!B) B = mini.dateInfo;
	if (typeof(B) !== "undefined") {
		var M = typeof(B.patterns[O]) !== "undefined" ? B.patterns[O] : O,
		J = C.getFullYear(),
		$ = C.getMonth(),
		_ = C.getDate();
		if (O == "yyyy-MM-dd") {
			$ = $ + 1 < 10 ? "0" + ($ + 1) : $ + 1;
			_ = _ < 10 ? "0" + _: _;
			return J + "-" + $ + "-" + _
		}
		if (O == "MM/dd/yyyy") {
			$ = $ + 1 < 10 ? "0" + ($ + 1) : $ + 1;
			_ = _ < 10 ? "0" + _: _;
			return $ + "/" + _ + "/" + J
		}
		G = M.replace(/yyyy/g, J);
		G = G.replace(/yy/g, (J + "").substring(2));
		var L = C.getHalfYear();
		G = G.replace(/hy/g, B.halfYearLong[L]);
		var I = C.getQuarter();
		G = G.replace(/Q/g, B.quarterLong[I]);
		G = G.replace(/q/g, B.quarterShort[I]);
		G = G.replace(/MMMM/g, B.monthsLong[$].escapeDateTimeTokens());
		G = G.replace(/MMM/g, B.monthsShort[$].escapeDateTimeTokens());
		G = G.replace(/MM/g, $ + 1 < 10 ? "0" + ($ + 1) : $ + 1);
		G = G.replace(/(\\)?M/g,
		function(A, _) {
			return _ ? A: $ + 1
		});
		var N = C.getDay();
		G = G.replace(/dddd/g, B.daysLong[N].escapeDateTimeTokens());
		G = G.replace(/ddd/g, B.daysShort[N].escapeDateTimeTokens());
		G = G.replace(/dd/g, _ < 10 ? "0" + _: _);
		G = G.replace(/(\\)?d/g,
		function(A, $) {
			return $ ? A: _
		});
		var H = C.getHours(),
		A = H > 12 ? H - 12 : H;
		if (B.clockType == 12) if (H > 12) H -= 12;
		G = G.replace(/HH/g, H < 10 ? "0" + H: H);
		G = G.replace(/(\\)?H/g,
		function(_, $) {
			return $ ? _: H
		});
		G = G.replace(/hh/g, A < 10 ? "0" + A: A);
		G = G.replace(/(\\)?h/g,
		function(_, $) {
			return $ ? _: A
		});
		var D = C.getMinutes();
		G = G.replace(/mm/g, D < 10 ? "0" + D: D);
		G = G.replace(/(\\)?m/g,
		function(_, $) {
			return $ ? _: D
		});
		var K = C.getSeconds();
		G = G.replace(/ss/g, K < 10 ? "0" + K: K);
		G = G.replace(/(\\)?s/g,
		function(_, $) {
			return $ ? _: K
		});
		G = G.replace(/fff/g, C.getMilliseconds());
		G = G.replace(/tt/g, C.getHours() > 12 || C.getHours() == 0 ? B.tt["PM"] : B.tt["AM"]);
		var C = C.getDate(),
		E = "";
		if (C <= 10) E = B.ten["Early"];
		else if (C <= 20) E = B.ten["Mid"];
		else E = B.ten["Late"];
		G = G.replace(/ten/g, E)
	}
	return G.replace(/\\/g, "")
};
String[DK].escapeDateTimeTokens = function() {
	return this.replace(/([dMyHmsft])/g, "\\$1")
};
mini.fixDate = function($, _) {
	if ( + $) while ($.getDate() != _.getDate()) $.setTime( + $ + ($ < _ ? 1 : -1) * HOUR_MS)
};
mini.parseDate = function(A, _) {
	if (typeof A == "object") return isNaN(A) ? null: A;
	if (typeof A == "number") {
		var $ = new Date(A * 1000);
		if ($.getTime() != A) return null;
		return isNaN($) ? null: $
	}
	if (typeof A == "string") {
		if (A.match(/^\d+(\.\d+)?$/)) {
			$ = new Date(parseFloat(A) * 1000);
			if ($.getTime() != A) return null;
			else return $
		}
		if (_ === undefined) _ = true;
		$ = mini.parseISO8601(A, _) || (A ? new Date(A) : null);
		return isNaN($) ? null: $
	}
	return null
};
mini.parseISO8601 = function(D, $) {
	var _ = D.match(/^([0-9]{4})([-\/]([0-9]{1,2})([-\/]([0-9]{1,2})([T ]([0-9]{1,2}):([0-9]{1,2})(:([0-9]{1,2})(\.([0-9]+))?)?(Z|(([-+])([0-9]{2})(:?([0-9]{2}))?))?)?)?)?$/);
	if (!_) {
		_ = D.match(/^([0-9]{4})[-\/]([0-9]{2})[-\/]([0-9]{2})[T ]([0-9]{1,2})/);
		if (_) {
			var A = new Date(_[1], _[2] - 1, _[3], _[4]);
			return A
		}
		_ = D.match(/^([0-9]{2})-([0-9]{2})-([0-9]{4})$/);
		if (!_) return null;
		else {
			A = new Date(_[3], _[1] - 1, _[2]);
			return A
		}
	}
	A = new Date(_[1], 0, 1);
	if ($ || !_[14]) {
		var C = new Date(_[1], 0, 1, 9, 0);
		if (_[3]) {
			A.setMonth(_[3] - 1);
			C.setMonth(_[3] - 1)
		}
		if (_[5]) {
			A.setDate(_[5]);
			C.setDate(_[5])
		}
		mini.fixDate(A, C);
		if (_[7]) A.setHours(_[7]);
		if (_[8]) A.setMinutes(_[8]);
		if (_[10]) A.setSeconds(_[10]);
		if (_[12]) A.setMilliseconds(Number("0." + _[12]) * 1000);
		mini.fixDate(A, C)
	} else {
		A.setUTCFullYear(_[1], _[3] ? _[3] - 1 : 0, _[5] || 1);
		A.setUTCHours(_[7] || 0, _[8] || 0, _[10] || 0, _[12] ? Number("0." + _[12]) * 1000 : 0);
		var B = Number(_[16]) * 60 + (_[18] ? Number(_[18]) : 0);
		B *= _[15] == "-" ? 1 : -1;
		A = new Date( + A + (B * 60 * 1000))
	}
	return A
};
mini.parseTime = function(E, F) {
	if (!E) return null;
	var B = parseInt(E);
	if (B == E && F) {
		$ = new Date(0);
		if (F[0] == "H") $.setHours(B);
		else if (F[0] == "m") $.setMinutes(B);
		else if (F[0] == "s") $.setSeconds(B);
		return $
	}
	var $ = mini.parseDate(E);
	if (!$) {
		var D = E.split(":"),
		_ = parseInt(parseFloat(D[0])),
		C = parseInt(parseFloat(D[1])),
		A = parseInt(parseFloat(D[2]));
		if (!isNaN(_) && !isNaN(C) && !isNaN(A)) {
			$ = new Date(0);
			$.setHours(_);
			$.setMinutes(C);
			$.setSeconds(A)
		}
		if (!isNaN(_) && (F == "H" || F == "HH")) {
			$ = new Date(0);
			$.setHours(_)
		} else if (!isNaN(_) && !isNaN(C) && (F == "H:mm" || F == "HH:mm")) {
			$ = new Date(0);
			$.setHours(_);
			$.setMinutes(C)
		} else if (!isNaN(_) && !isNaN(C) && F == "mm:ss") {
			$ = new Date(0);
			$.setMinutes(_);
			$.setSeconds(C)
		}
	}
	return $
};
mini.dateInfo = {
	monthsLong: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
	monthsShort: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
	daysLong: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"],
	daysShort: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
	quarterLong: ["\u4e00\u5b63\u5ea6", "\u4e8c\u5b63\u5ea6", "\u4e09\u5b63\u5ea6", "\u56db\u5b63\u5ea6"],
	quarterShort: ["Q1", "Q2", "Q2", "Q4"],
	halfYearLong: ["\u4e0a\u534a\u5e74", "\u4e0b\u534a\u5e74"],
	patterns: {
		"d": "yyyy-M-d",
		"D": "yyyy\u5e74M\u6708d\u65e5",
		"f": "yyyy\u5e74M\u6708d\u65e5 H:mm",
		"F": "yyyy\u5e74M\u6708d\u65e5 H:mm:ss",
		"g": "yyyy-M-d H:mm",
		"G": "yyyy-M-d H:mm:ss",
		"m": "MMMd\u65e5",
		"o": "yyyy-MM-ddTHH:mm:ss.fff",
		"s": "yyyy-MM-ddTHH:mm:ss",
		"t": "H:mm",
		"T": "H:mm:ss",
		"U": "yyyy\u5e74M\u6708d\u65e5 HH:mm:ss",
		"y": "yyyy\u5e74MM\u6708"
	},
	tt: {
		"AM": "\u4e0a\u5348",
		"PM": "\u4e0b\u5348"
	},
	ten: {
		"Early": "\u4e0a\u65ec",
		"Mid": "\u4e2d\u65ec",
		"Late": "\u4e0b\u65ec"
	},
	today: "\u4eca\u5929",
	clockType: 24
};
PBm = function($) {
	if (typeof $ == "string") {
		if ($.charAt(0) == "#") $ = $.substr(1);
		return document.getElementById($)
	} else return $
};
Adi = function($, _) {
	$ = PBm($);
	if (!$) return;
	if (!$.className) return;
	var A = $.className.split(" ");
	return A.indexOf(_) != -1
};
Rw = function($, _) {
	if (!_) return;
	if (Adi($, _) == false) jQuery($)[X0R](_)
};
EhVe = function($, _) {
	if (!_) return;
	jQuery($)[UTn](_)
};
UG = function($) {
	$ = PBm($);
	var _ = jQuery($);
	return {
		top: parseInt(_.css("margin-top"), 10) || 0,
		left: parseInt(_.css("margin-left"), 10) || 0,
		bottom: parseInt(_.css("margin-bottom"), 10) || 0,
		right: parseInt(_.css("margin-right"), 10) || 0
	}
};
Ps$ = function($) {
	$ = PBm($);
	var _ = jQuery($);
	return {
		top: parseInt(_.css("border-top-width"), 10) || 0,
		left: parseInt(_.css("border-left-width"), 10) || 0,
		bottom: parseInt(_.css("border-bottom-width"), 10) || 0,
		right: parseInt(_.css("border-right-width"), 10) || 0
	}
};
TNY = function($) {
	$ = PBm($);
	var _ = jQuery($);
	return {
		top: parseInt(_.css("padding-top"), 10) || 0,
		left: parseInt(_.css("padding-left"), 10) || 0,
		bottom: parseInt(_.css("padding-bottom"), 10) || 0,
		right: parseInt(_.css("padding-right"), 10) || 0
	}
};
_ZS = function(_, $) {
	_ = PBm(_);
	$ = parseInt($);
	if (isNaN($) || !_) return;
	if (jQuery.boxModel) {
		var A = TNY(_),
		B = Ps$(_);
		$ = $ - A.left - A.right - B.left - B.right
	}
	if ($ < 0) $ = 0;
	_.style.width = $ + "px"
};
M$ = function(_, $) {
	_ = PBm(_);
	$ = parseInt($);
	if (isNaN($) || !_) return;
	if (jQuery.boxModel) {
		var A = TNY(_),
		B = Ps$(_);
		$ = $ - A.top - A.bottom - B.top - B.bottom
	}
	if ($ < 0) $ = 0;
	_.style.height = $ + "px"
};
WDf = function($, _) {
	$ = PBm($);
	if ($.style.display == "none" || $.type == "text/javascript") return 0;
	return _ ? jQuery($).width() : jQuery($).outerWidth()
};
J6 = function($, _) {
	$ = PBm($);
	if ($.style.display == "none" || $.type == "text/javascript") return 0;
	return _ ? jQuery($).height() : jQuery($).outerHeight()
};
_cw = function(A, C, B, $, _) {
	if (B === undefined) {
		B = C.y;
		$ = C.width;
		_ = C.height;
		C = C.x
	}
	mini[UCK](A, C, B);
	_ZS(A, $);
	M$(A, _)
};
Vrm = function(A) {
	var $ = mini.getXY(A),
	_ = {
		x: $[0],
		y: $[1],
		width: WDf(A),
		height: J6(A)
	};
	_.left = _.x;
	_.top = _.y;
	_.right = _.x + _.width;
	_.bottom = _.y + _.height;
	return _
};
MsRJ = function(A, B) {
	A = PBm(A);
	if (!A || typeof B != "string") return;
	var F = jQuery(A),
	_ = B.toLowerCase().split(";");
	for (var $ = 0,
	C = _.length; $ < C; $++) {
		var E = _[$],
		D = E.split(":");
		if (D.length == 2) F.css(D[0].trim(), D[1].trim())
	}
};
$qPf = function() {
	var $ = document.defaultView;
	return new Function("el", "style", ["style.indexOf('-')>-1 && (style=style.replace(/-(\\w)/g,function(m,a){return a.toUpperCase()}));", "style=='float' && (style='", $ ? "cssFloat": "styleFloat", "');return el.style[style] || ", $ ? "window.getComputedStyle(el,null)[style]": "el.currentStyle[style]", " || null;"].join(""))
} ();
Dmv = function(A, $) {
	var _ = false;
	A = PBm(A);
	$ = PBm($);
	if (A === $) return true;
	if (A && $) if (A.contains) {
		try {
			return A.contains($)
		} catch(B) {
			return false
		}
	} else if (A.compareDocumentPosition) return !! (A.compareDocumentPosition($) & 16);
	else while ($ = $.parentNode) _ = $ == A || _;
	return _
};
BD = function(B, A, $) {
	B = PBm(B);
	var C = document.body,
	_ = 0,
	D;
	$ = $ || 50;
	if (typeof $ != "number") {
		D = PBm($);
		$ = 10
	}
	while (B && B.nodeType == 1 && _ < $ && B != C && B != D) {
		if (Adi(B, A)) return B;
		_++;
		B = B.parentNode
	}
	return null
};
mini.copyTo(mini, {
	byId: PBm,
	hasClass: Adi,
	addClass: Rw,
	removeClass: EhVe,
	getMargins: UG,
	getBorders: Ps$,
	getPaddings: TNY,
	setWidth: _ZS,
	setHeight: M$,
	getWidth: WDf,
	getHeight: J6,
	setBox: _cw,
	getBox: Vrm,
	setStyle: MsRJ,
	getStyle: $qPf,
	repaint: function($) {
		if (!$) $ = document.body;
		Rw($, "mini-repaint");
		setTimeout(function() {
			EhVe($, "mini-repaint")
		},
		1)
	},
	getSize: function($, _) {
		return {
			width: WDf($, _),
			height: J6($, _)
		}
	},
	setSize: function(A, $, _) {
		_ZS(A, $);
		M$(A, _)
	},
	setX: function(_, B) {
		var $ = jQuery(_).offset(),
		A = $.top;
		if (A === undefined) A = $[1];
		mini[UCK](_, B, A)
	},
	setY: function(_, A) {
		var $ = jQuery(_).offset(),
		B = $.left;
		if (B === undefined) B = $[0];
		mini[UCK](_, B, A)
	},
	setXY: function(_, B, A) {
		var $ = {
			left: B,
			top: A
		};
		jQuery(_).offset($);
		jQuery(_).offset($)
	},
	getXY: function(_) {
		var $ = jQuery(_).offset();
		return [$.left, $.top]
	},
	getViewportBox: function() {
		var $ = jQuery(window).width(),
		_ = jQuery(window).height(),
		B = jQuery(document).scrollLeft(),
		A = jQuery(document.body).scrollTop();
		if (document.documentElement) A = document.documentElement.scrollTop;
		return {
			x: B,
			y: A,
			width: $,
			height: _,
			right: B + $,
			bottom: A + _
		}
	},
	getChildNodes: function(A, C) {
		A = PBm(A);
		if (!A) return;
		var E = A.childNodes,
		B = [];
		for (var $ = 0,
		D = E.length; $ < D; $++) {
			var _ = E[$];
			if (_.nodeType == 1 || C === true) B.push(_)
		}
		return B
	},
	removeChilds: function(B, _) {
		B = PBm(B);
		if (!B) return;
		var C = mini[$Vy$](B, true);
		for (var $ = 0,
		D = C.length; $ < D; $++) {
			var A = C[$];
			if (_ && A == _);
			else B.removeChild(C[$])
		}
	},
	isAncestor: Dmv,
	findParent: BD,
	findChild: function(_, A) {
		_ = PBm(_);
		var B = _.getElementsByTagName("*");
		for (var $ = 0,
		C = B.length; $ < C; $++) {
			var _ = B[$];
			if (Adi(_, A)) return _
		}
	},
	isAncestor: function(A, $) {
		var _ = false;
		A = PBm(A);
		$ = PBm($);
		if (A === $) return true;
		if (A && $) if (A.contains) {
			try {
				return A.contains($)
			} catch(B) {
				return false
			}
		} else if (A.compareDocumentPosition) return !! (A.compareDocumentPosition($) & 16);
		else while ($ = $.parentNode) _ = $ == A || _;
		return _
	},
	getOffsetsTo: function(_, A) {
		var $ = this.getXY(_),
		B = this.getXY(A);
		return [$[0] - B[0], $[1] - B[1]]
	},
	scrollIntoView: function(I, H, F) {
		var B = PBm(H) || document.body,
		$ = this.getOffsetsTo(I, B),
		C = $[0] + B.scrollLeft,
		J = $[1] + B.scrollTop,
		D = J + I.offsetHeight,
		A = C + I.offsetWidth,
		G = B.clientHeight,
		K = parseInt(B.scrollTop, 10),
		_ = parseInt(B.scrollLeft, 10),
		L = K + G,
		E = _ + B.clientWidth;
		if (I.offsetHeight > G || J < K) B.scrollTop = J;
		else if (D > L) B.scrollTop = D - G;
		B.scrollTop = B.scrollTop;
		if (F !== false) {
			if (I.offsetWidth > B.clientWidth || C < _) B.scrollLeft = C;
			else if (A > E) B.scrollLeft = A - B.clientWidth;
			B.scrollLeft = B.scrollLeft
		}
		return this
	},
	setOpacity: function(_, $) {
		jQuery(_).css({
			"opacity": $
		})
	},
	selectable: function(_, $) {
		_ = PBm(_);
		if ( !! $) {
			jQuery(_)[UTn]("mini-unselectable");
			if (isIE) _.unselectable = "off";
			else {
				_.style.MozUserSelect = "";
				_.style.KhtmlUserSelect = "";
				_.style.UserSelect = ""
			}
		} else {
			jQuery(_)[X0R]("mini-unselectable");
			if (isIE) _.unselectable = "on";
			else {
				_.style.MozUserSelect = "none";
				_.style.UserSelect = "none";
				_.style.KhtmlUserSelect = "none"
			}
		}
	},
	selectRange: function(B, A, _) {
		if (B.createTextRange) {
			var $ = B.createTextRange();
			$.moveStart("character", A);
			$.moveEnd("character", _ - B.value.length);
			$[MAi]()
		} else if (B.setSelectionRange) B.setSelectionRange(A, _);
		try {
			B.focus()
		} catch(C) {}
	},
	getSelectRange: function(A) {
		A = PBm(A);
		if (!A) return;
		try {
			A.focus()
		} catch(C) {}
		var $ = 0,
		B = 0;
		if (A.createTextRange) {
			var _ = document.selection.createRange().duplicate();
			_.moveEnd("character", A.value.length);
			if (_.text === "") $ = A.value.length;
			else $ = A.value.lastIndexOf(_.text);
			_ = document.selection.createRange().duplicate();
			_.moveStart("character", -A.value.length);
			B = _.text.length
		} else {
			$ = A.selectionStart;
			B = A.selectionEnd
		}
		return [$, B]
	}
}); (function() {
	var $ = {
		tabindex: "tabIndex",
		readonly: "readOnly",
		"for": "htmlFor",
		"class": "className",
		maxlength: "maxLength",
		cellspacing: "cellSpacing",
		cellpadding: "cellPadding",
		rowspan: "rowSpan",
		colspan: "colSpan",
		usemap: "useMap",
		frameborder: "frameBorder",
		contenteditable: "contentEditable"
	},
	_ = document.createElement("div");
	_.setAttribute("class", "t");
	var A = _.className === "t";
	mini.setAttr = function(B, C, _) {
		B.setAttribute(A ? C: ($[C] || C), _)
	};
	mini.getAttr = function(B, C) {
		if (C == "value" && (isIE6 || isIE7)) {
			var _ = B.attributes[C];
			return _ ? _.value: null
		}
		var D = B.getAttribute(A ? C: ($[C] || C));
		if (typeof D == "function") D = B.attributes[C].value;
		return D
	}
})();
A4v = function(_, $, C, A) {
	var B = "on" + $.toLowerCase();
	_[B] = function(_) {
		_ = _ || window.event;
		_.target = _.target || _.srcElement;
		if (!_.preventDefault) _.preventDefault = function() {
			var $ = this;
			if ($.preventDefault) $.preventDefault();
			else if (window.event) window.event.returnValue = false
		};
		if (!_.stopPropogation) _.stopPropogation = function() {
			var $ = this;
			if ($.stopPropagation) $.stopPropagation();
			else if (window.event) window.event.cancelBubble = true
		};
		var $ = C[POm](A, _);
		if ($ === false) return false
	}
};
VPoJ = function(_, $, D, A) {
	_ = PBm(_);
	A = A || _;
	if (!_ || !$ || !D || !A) return false;
	var B = mini[H0$](_, $, D, A);
	if (B) return false;
	var C = mini.createDelegate(D, A);
	mini.listeners.push([_, $, D, A, C]);
	if (jQuery.browser.mozilla && $ == "mousewheel") $ = "DOMMouseScroll";
	jQuery(_).bind($, C)
};
Ri = function(_, $, C, A) {
	_ = PBm(_);
	A = A || _;
	if (!_ || !$ || !C || !A) return false;
	var B = mini[H0$](_, $, C, A);
	if (!B) return false;
	mini.listeners.remove(B);
	if (jQuery.browser.mozilla && $ == "mousewheel") $ = "DOMMouseScroll";
	jQuery(_).unbind($, B[4])
};
mini.copyTo(mini, {
	listeners: [],
	on: VPoJ,
	un: Ri,
	findListener: function(A, _, F, B) {
		A = PBm(A);
		B = B || A;
		if (!A || !_ || !F || !B) return false;
		var D = mini.listeners;
		for (var $ = 0,
		E = D.length; $ < E; $++) {
			var C = D[$];
			if (C[0] == A && C[1] == _ && C[2] == F && C[3] == B) return C
		}
	},
	clearEvent: function(A, _) {
		A = PBm(A);
		if (!A) return false;
		var C = mini.listeners;
		for (var $ = C.length - 1; $ >= 0; $--) {
			var B = C[$];
			if (B[0] == A) if (!_ || _ == B[1]) Ri(A, B[1], B[2], B[3])
		}
	}
});
mini.__windowResizes = [];
mini.onWindowResize = function(_, $) {
	mini.__windowResizes.push([_, $])
};
VPoJ(window, "resize",
function(C) {
	var _ = mini.__windowResizes;
	for (var $ = 0,
	B = _.length; $ < B; $++) {
		var A = _[$];
		A[0][POm](A[1], C)
	}
});
mini.copyTo(Array.prototype, {
	add: Array[DK].enqueue = function($) {
		this[this.length] = $;
		return this
	},
	getRange: function(_, A) {
		var B = [];
		for (var $ = _; $ <= A; $++) B[B.length] = this[$];
		return B
	},
	addRange: function(A) {
		for (var $ = 0,
		_ = A.length; $ < _; $++) this[this.length] = A[$];
		return this
	},
	clear: function() {
		this.length = 0;
		return this
	},
	clone: function() {
		if (this.length === 1) return [this[0]];
		else return Array.apply(null, this)
	},
	contains: function($) {
		return (this.indexOf($) >= 0)
	},
	indexOf: function(_, B) {
		var $ = this.length;
		for (var A = (B < 0) ? Math.max(0, $ + B) : B || 0; A < $; A++) if (this[A] === _) return A;
		return - 1
	},
	dequeue: function() {
		return this.shift()
	},
	insert: function(_, $) {
		this.splice(_, 0, $);
		return this
	},
	insertRange: function(_, B) {
		for (var A = B.length - 1; A >= 0; A--) {
			var $ = B[A];
			this.splice(_, 0, $)
		}
		return this
	},
	remove: function(_) {
		var $ = this.indexOf(_);
		if ($ >= 0) this.splice($, 1);
		return ($ >= 0)
	},
	removeAt: function($) {
		var _ = this[$];
		this.splice($, 1);
		return _
	},
	removeRange: function(_) {
		_ = _.clone();
		for (var $ = 0,
		A = _.length; $ < A; $++) this.remove(_[$])
	}
});
mini.Keyboard = {
	Left: 37,
	Top: 38,
	Right: 39,
	Bottom: 40,
	PageUp: 33,
	PageDown: 34,
	End: 35,
	Home: 36,
	Enter: 13,
	ESC: 27,
	Space: 32,
	Tab: 9,
	Del: 46,
	F1: 112,
	F2: 113,
	F3: 114,
	F4: 115,
	F5: 116,
	F6: 117,
	F7: 118,
	F8: 119,
	F9: 120,
	F10: 121,
	F11: 122,
	F12: 123
};
var ua = navigator.userAgent.toLowerCase(),
check = function($) {
	return $.test(ua)
},
DOC = document,
isStrict = DOC.compatMode == "CSS1Compat",
isOpera = Object[DK].toString[POm](window.opera) == "[object Opera]",
isChrome = check(/chrome/),
isWebKit = check(/webkit/),
isSafari = !isChrome && check(/safari/),
isSafari2 = isSafari && check(/applewebkit\/4/),
isSafari3 = isSafari && check(/version\/3/),
isSafari4 = isSafari && check(/version\/4/),
isIE = !!window.attachEvent && !isOpera,
isIE7 = isIE && check(/msie 7/),
isIE8 = isIE && check(/msie 8/),
isIE9 = isIE && check(/msie 9/),
isIE10 = isIE && document.documentMode == 10,
isIE6 = isIE && !isIE7 && !isIE8 && !isIE9 && !isIE10,
isFirefox = navigator.userAgent.indexOf("Firefox") > 0,
isGecko = !isWebKit && check(/gecko/),
isGecko2 = isGecko && check(/rv:1\.8/),
isGecko3 = isGecko && check(/rv:1\.9/),
isBorderBox = isIE && !isStrict,
isWindows = check(/windows|win32/),
isMac = check(/macintosh|mac os x/),
isAir = check(/adobeair/),
isLinux = check(/linux/),
isSecure = /^https/i.test(window.location.protocol);
if (isIE6) {
	try {
		DOC.execCommand("BackgroundImageCache", false, true)
	} catch(e) {}
}
mini.isIE = isIE;
mini.isIE6 = isIE6;
mini.isIE7 = isIE7;
mini.isIE8 = isIE8;
mini.isIE9 = isIE9;
mini.isFireFox = jQuery.browser.mozilla;
mini.isOpera = jQuery.browser.opera;
mini.isSafari = jQuery.browser.safari;
mini.noBorderBox = false;
if (jQuery.boxModel == false && isIE && isIE9 == false) mini.noBorderBox = true;
mini.MouseButton = {
	Left: 0,
	Middle: 1,
	Right: 2
};
if (isIE && !isIE9) mini.MouseButton = {
	Left: 1,
	Middle: 4,
	Right: 2
};
mini._MaskID = 1;
mini._MaskObjects = {};
mini.mask = function(C) {
	var _ = PBm(C);
	if (mini.isElement(_)) C = {
		el: _
	};
	else if (typeof C == "string") C = {
		html: C
	};
	C = mini.copyTo({
		html: "",
		cls: "",
		style: "",
		backStyle: "background:#ccc"
	},
	C);
	C.el = PBm(C.el);
	if (!C.el) C.el = document.body;
	_ = C.el;
	mini["unmask"](C.el);
	_._maskid = mini._MaskID++;
	mini._MaskObjects[_._maskid] = C;
	var $ = mini.append(_, "<div class=\"mini-mask\">" + "<div class=\"mini-mask-background\" style=\"" + C.backStyle + "\"></div>" + "<div class=\"mini-mask-msg " + C.cls + "\" style=\"" + C.style + "\">" + C.html + "</div>" + "</div>");
	C.maskEl = $;
	if (!mini.isNull(C.opacity)) mini.setOpacity($.firstChild, C.opacity);
	function A() {
		B.style.display = "block";
		var $ = mini.getSize(B);
		B.style.marginLeft = -$.width / 2 + "px";
		B.style.marginTop = -$.height / 2 + "px"
	}
	var B = $.lastChild;
	B.style.display = "none";
	setTimeout(function() {
		A()
	},
	0)
};
mini["unmask"] = function(_) {
	_ = PBm(_);
	if (!_) _ = document.body;
	var A = mini._MaskObjects[_._maskid];
	if (!A) return;
	delete mini._MaskObjects[_._maskid];
	var $ = A.maskEl;
	A.maskEl = null;
	if ($ && $.parentNode) $.parentNode.removeChild($)
};
mini.copyTo(mini, {
	treeToArray: function(C, I, J, A, $) {
		if (!I) I = "children";
		var F = [];
		for (var H = 0,
		D = C.length; H < D; H++) {
			var B = C[H];
			F[F.length] = B;
			if (A) B[A] = $;
			var _ = B[I];
			if (_ && _.length > 0) {
				var E = B[J],
				G = this[J19](_, I, J, A, E);
				F.addRange(G)
			}
		}
		return F
	},
	arrayToTree: function(C, A, H, B) {
		if (!A) A = "children";
		H = H || "_id";
		B = B || "_pid";
		var G = [],
		F = {};
		for (var _ = 0,
		E = C.length; _ < E; _++) {
			var $ = C[_],
			I = $[H];
			if (I !== null && I !== undefined) F[I] = $;
			delete $[A]
		}
		for (_ = 0, E = C.length; _ < E; _++) {
			var $ = C[_],
			D = F[$[B]];
			if (!D) {
				G.push($);
				continue
			}
			if (!D[A]) D[A] = [];
			D[A].push($)
		}
		return G
	}
});
function UUID() {
	var A = [],
	_ = "0123456789ABCDEF".split("");
	for (var $ = 0; $ < 36; $++) A[$] = Math.floor(Math.random() * 16);
	A[14] = 4;
	A[19] = (A[19] & 3) | 8;
	for ($ = 0; $ < 36; $++) A[$] = _[A[$]];
	A[8] = A[13] = A[18] = A[23] = "-";
	return A.join("")
}
String.format = function(_) {
	var $ = Array[DK].slice[POm](arguments, 1);
	_ = _ || "";
	return _.replace(/\{(\d+)\}/g,
	function(A, _) {
		return $[_]
	})
};
String[DK].trim = function() {
	var $ = /^\s+|\s+$/g;
	return function() {
		return this.replace($, "")
	}
} ();
mini.copyTo(mini, {
	measureText: function(B, _, C) {
		if (!this.measureEl) this.measureEl = mini.append(document.body, "<div></div>");
		this.measureEl.style.cssText = "position:absolute;left:-1000px;top:-1000px;visibility:hidden;";
		if (typeof B == "string") this.measureEl.className = B;
		else {
			this.measureEl.className = "";
			var G = jQuery(B),
			A = jQuery(this.measureEl),
			F = ["font-size", "font-style", "font-weight", "font-family", "line-height", "text-transform", "letter-spacing"];
			for (var $ = 0,
			E = F.length; $ < E; $++) {
				var D = F[$];
				A.css(D, G.css(D))
			}
		}
		if (C) MsRJ(this.measureEl, C);
		this.measureEl.innerHTML = _;
		return mini.getSize(this.measureEl)
	}
});
jQuery(function() {
	var $ = new Date();
	mini.isReady = true;
	mini.parse();
	DjWk();
	if (($qPf(document.body, "overflow") == "hidden" || $qPf(document.documentElement, "overflow") == "hidden") && (isIE6 || isIE7)) {
		jQuery(document.body).css("overflow", "visible");
		jQuery(document.documentElement).css("overflow", "visible")
	}
	mini.__LastWindowWidth = document.documentElement.clientWidth;
	mini.__LastWindowHeight = document.documentElement.clientHeight
});
mini_onload = function($) {
	mini.layout(null, false);
	VPoJ(window, "resize", mini_onresize)
};
VPoJ(window, "load", mini_onload);
mini.__LastWindowWidth = document.documentElement.clientWidth;
mini.__LastWindowHeight = document.documentElement.clientHeight;
mini.doWindowResizeTimer = null;
mini.allowLayout = true;
mini_onresize = function($) {
	if (mini.doWindowResizeTimer) clearTimeout(mini.doWindowResizeTimer);
	if (GZf == false || mini.allowLayout == false) return;
	if (typeof Ext != "undefined") mini.doWindowResizeTimer = setTimeout(function() {
		var _ = document.documentElement.clientWidth,
		$ = document.documentElement.clientHeight;
		if (mini.__LastWindowWidth == _ && mini.__LastWindowHeight == $);
		else {
			mini.__LastWindowWidth = _;
			mini.__LastWindowHeight = $;
			mini.layout(null, false)
		}
		mini.doWindowResizeTimer = null
	},
	300);
	else mini.doWindowResizeTimer = setTimeout(function() {
		var _ = document.documentElement.clientWidth,
		$ = document.documentElement.clientHeight;
		if (mini.__LastWindowWidth == _ && mini.__LastWindowHeight == $);
		else {
			mini.__LastWindowWidth = _;
			mini.__LastWindowHeight = $;
			mini.layout(null, false)
		}
		mini.doWindowResizeTimer = null
	},
	100)
};
mini[S8B] = function(_, A) {
	var $ = A || document.body;
	while (1) {
		if (_ == null || !_.style) return false;
		if (_ && _.style && _.style.display == "none") return false;
		if (_ == $) return true;
		_ = _.parentNode
	}
	return true
};
mini.isWindowDisplay = function() {
	try {
		var _ = window.parent,
		E = _ != window;
		if (E) {
			var C = _.document.getElementsByTagName("iframe"),
			H = _.document.getElementsByTagName("frame"),
			G = [];
			for (var $ = 0,
			D = C.length; $ < D; $++) G.push(C[$]);
			for ($ = 0, D = H.length; $ < D; $++) G.push(H[$]);
			var B = null;
			for ($ = 0, D = G.length; $ < D; $++) {
				var A = G[$];
				if (A.contentWindow == window) {
					B = A;
					break
				}
			}
			if (!B) return false;
			return mini[S8B](B, _.document.body)
		} else return true
	} catch(F) {
		return true
	}
};
GZf = mini.isWindowDisplay();
mini.layoutIFrames = function($) {
	if (!$) $ = document.body;
	var _ = $.getElementsByTagName("iframe");
	setTimeout(function() {
		for (var A = 0,
		C = _.length; A < C; A++) {
			var B = _[A];
			try {
				if (mini[S8B](B) && Dmv($, B)) {
					if (B.contentWindow.mini) if (B.contentWindow.GZf == false) {
						B.contentWindow.GZf = B.contentWindow.mini.isWindowDisplay();
						B.contentWindow.mini.layout()
					} else B.contentWindow.mini.layout(null, false);
					B.contentWindow.mini.layoutIFrames()
				}
			} catch(D) {}
		}
	},
	30)
};
$.ajaxSetup({
	cache: false
});
if (isIE) setInterval(function() {
	CollectGarbage()
},
1000);
mini_unload = function(F) {
	var E = document.body.getElementsByTagName("iframe");
	if (E.length > 0) {
		var D = [];
		for (var $ = 0,
		C = E.length; $ < C; $++) D.push(E[$]);
		for ($ = 0, C = D.length; $ < C; $++) {
			try {
				var B = D[$];
				B.src = "";
				if (B.parentNode) B.parentNode.removeChild(B)
			} catch(F) {}
		}
	}
	var A = mini.getComponents();
	for ($ = 0, C = A.length; $ < C; $++) {
		var _ = A[$];
		_[$Kt](false)
	}
	A.length = 0;
	A = null;
	Ri(window, "unload", mini_unload);
	Ri(window, "load", mini_onload);
	Ri(window, "resize", mini_onresize);
	mini.components = {};
	mini.classes = {};
	mini.uiClasses = {};
	try {
		CollectGarbage()
	} catch(F) {}
};
VPoJ(window, "unload", mini_unload);
function __OnIFrameMouseDown() {
	jQuery(document).trigger("mousedown")
}
function __BindIFrames() {
	var C = document.getElementsByTagName("iframe");
	for (var $ = 0,
	A = C.length; $ < A; $++) {
		var _ = C[$];
		try {
			if (_.contentWindow) _.contentWindow.document.onmousedown = __OnIFrameMouseDown
		} catch(B) {}
	}
}
setInterval(function() {
	__BindIFrames()
},
1500);
mini.zIndex = 1000;
mini.getMaxZIndex = function() {
	return mini.zIndex++
};
PU = function() {
	this._bindFields = [];
	this._bindForms = [];
	PU[Xc$][TYcW][POm](this)
};
Mup(PU, QFL, {
	bindField: function(A, D, C, B, $) {
		A = mini.get(A);
		D = mini.get(D);
		if (!A || !D || !C) return;
		var _ = {
			control: A,
			source: D,
			field: C,
			convert: $,
			mode: B
		};
		this._bindFields.push(_);
		D.on("currentchanged", this.Wh, this);
		A.on("valuechanged", this.YQy, this)
	},
	bindForm: function(B, F, D, A) {
		B = PBm(B);
		F = mini.get(F);
		if (!B || !F) return;
		var B = new mini.Form(B),
		$ = B.getFields();
		for (var _ = 0,
		E = $.length; _ < E; _++) {
			var C = $[_];
			this.bindField(C, F, C.getName(), D, A)
		}
	},
	Wh: function(H) {
		if (this._doSetting) return;
		this._doSetting = true;
		var G = H.sender,
		_ = H.record;
		for (var $ = 0,
		F = this._bindFields.length; $ < F; $++) {
			var B = this._bindFields[$];
			if (B.source != G) continue;
			var C = B.control,
			D = B.field;
			if (C[G3S]) if (_) {
				var A = _[D];
				C[G3S](A)
			} else C[G3S]("");
			if (C[HH] && C.textName) if (_) C[HH](_[C.textName]);
			else C[HH]("")
		}
		var E = this;
		setTimeout(function() {
			E._doSetting = false
		},
		10)
	},
	YQy: function(H) {
		if (this._doSetting) return;
		this._doSetting = true;
		var D = H.sender,
		_ = D.getValue();
		for (var $ = 0,
		G = this._bindFields.length; $ < G; $++) {
			var C = this._bindFields[$];
			if (C.control != D || C.mode === false) continue;
			var F = C.source,
			B = F.getCurrent();
			if (!B) continue;
			var A = {};
			A[C.field] = _;
			if (D.getText && D.textName) A[D.textName] = D.getText();
			F[Yh5](B, A)
		}
		var E = this;
		setTimeout(function() {
			E._doSetting = false
		},
		10)
	}
});
J9_$(PU, "databinding");
AcTa = function() {
	this._sources = {};
	this._data = {};
	this._links = [];
	this.N3Y = {};
	AcTa[Xc$][TYcW][POm](this)
};
Mup(AcTa, QFL, {
	add: function(_, $) {
		if (!_ || !$) return;
		this._sources[_] = $;
		this._data[_] = [];
		$.autoCreateNewID = true;
		$.YU1 = $.getIdField();
		$.O50D = false;
		$.on("addrow", this.POYi, this);
		$.on("updaterow", this.POYi, this);
		$.on("deleterow", this.POYi, this);
		$.on("removerow", this.POYi, this);
		$.on("preload", this.LsS, this);
		$.on("selectionchanged", this.Ooi, this)
	},
	addLink: function(B, _, $) {
		if (!B || !_ || !$) return;
		if (!this._sources[B] || !this._sources[_]) return;
		var A = {
			parentName: B,
			childName: _,
			parentField: $
		};
		this._links.push(A)
	},
	clearData: function() {
		this._data = {};
		this.N3Y = {};
		for (var $ in this._sources) this._data = []
	},
	getData: function() {
		return this._data
	},
	_getNameByListControl: function($) {
		for (var A in this._sources) {
			var _ = this._sources[A];
			if (_ == $) return A
		}
	},
	_getRecord: function(E, _, D) {
		var B = this._data[E];
		if (!B) return false;
		for (var $ = 0,
		C = B.length; $ < C; $++) {
			var A = B[$];
			if (A[D] == _[D]) return A
		}
		return null
	},
	POYi: function(F) {
		var C = F.type,
		_ = F.record,
		D = this._getNameByListControl(F.sender),
		E = this._getRecord(D, _, F.sender.getIdField()),
		A = this._data[D];
		if (E) {
			A = this._data[D];
			A.remove(E)
		}
		if (C == "removerow" && _._state == "added");
		else A.push(_);
		this.N3Y[D] = F.sender.N3Y;
		if (_._state == "added") {
			var $ = this._getParentSource(F.sender);
			if ($) {
				var B = $[QN2]();
				if (B) _._parentId = B[$.getIdField()];
				else A.remove(_)
			}
		}
	},
	LsS: function(M) {
		var J = M.sender,
		L = this._getNameByListControl(J),
		K = M.sender.getIdField(),
		A = this._data[L],
		$ = {};
		for (var F = 0,
		C = A.length; F < C; F++) {
			var G = A[F];
			$[G[K]] = G
		}
		var N = this.N3Y[L];
		if (N) J.N3Y = N;
		var I = M.data || [];
		for (F = 0, C = I.length; F < C; F++) {
			var G = I[F],
			H = $[G[K]];
			if (H) {
				delete H._uid;
				mini.copyTo(G, H)
			}
		}
		var D = this._getParentSource(J);
		if (J.getPageIndex && J.getPageIndex() == 0) {
			var E = [];
			for (F = 0, C = A.length; F < C; F++) {
				G = A[F];
				if (G._state == "added") if (D) {
					var B = D[QN2]();
					if (B && B[D.getIdField()] == G._parentId) E.push(G)
				} else E.push(G)
			}
			E.reverse();
			I.insertRange(0, E)
		}
		var _ = [];
		for (F = I.length - 1; F >= 0; F--) {
			G = I[F],
			H = $[G[K]];
			if (H && H._state == "removed") {
				I.removeAt(F);
				_.push(H)
			}
		}
	},
	_getParentSource: function(C) {
		var _ = this._getNameByListControl(C);
		for (var $ = 0,
		B = this._links.length; $ < B; $++) {
			var A = this._links[$];
			if (A.childName == _) return this._sources[A.parentName]
		}
	},
	_getLinks: function(B) {
		var C = this._getNameByListControl(B),
		D = [];
		for (var $ = 0,
		A = this._links.length; $ < A; $++) {
			var _ = this._links[$];
			if (_.parentName == C) D.push(_)
		}
		return D
	},
	Ooi: function(G) {
		var A = G.sender,
		_ = A[QN2](),
		F = this._getLinks(A);
		for (var $ = 0,
		E = F.length; $ < E; $++) {
			var D = F[$],
			C = this._sources[D.childName];
			if (_) {
				var B = {};
				B[D.parentField] = _[A.getIdField()];
				C.load(B)
			} else C[_PR]([])
		}
	}
});
J9_$(AcTa, "dataset");
DikJ = function() {
	DikJ[Xc$][TYcW][POm](this)
};
Mup(DikJ, DZV, {
	_clearBorder: false,
	formField: true,
	value: "",
	uiCls: "mini-hidden",
	_create: function() {
		this.el = document.createElement("input");
		this.el.type = "hidden";
		this.el.className = "mini-hidden"
	},
	setName: function($) {
		this.name = $;
		this.el.name = $
	},
	setValue: function($) {
		if ($ === null || $ === undefined) $ = "";
		this.el.value = $
	},
	getValue: function() {
		return this.el.value
	},
	getFormValue: function() {
		return this.getValue()
	}
});
J9_$(DikJ, "hidden");
Nist = function() {
	Nist[Xc$][TYcW][POm](this);
	this[AYD](false);
	this.setAllowDrag(this.allowDrag);
	this.setAllowResize(this[Wpk])
};
Mup(Nist, DZV, {
	_clearBorder: false,
	uiCls: "mini-popup",
	_create: function() {
		var $ = this.el = document.createElement("div");
		this.el.className = "mini-popup";
		this._contentEl = this.el
	},
	_initEvents: function() {
		Xs(function() {
			A4v(this.el, "mouseover", this.Nv5, this)
		},
		this)
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		Nist[Xc$][QM][POm](this);
		this.$Zf();
		var A = this.el.childNodes;
		if (A) for (var $ = 0,
		B = A.length; $ < B; $++) {
			var _ = A[$];
			mini.layout(_)
		}
	},
	destroy: function($) {
		if (this.el) this.el.onmouseover = null;
		mini.removeChilds(this._contentEl);
		Ri(document, "mousedown", this.F9T, this);
		Ri(window, "resize", this.CPM, this);
		if (this.Fts) {
			jQuery(this.Fts).remove();
			this.Fts = null
		}
		if (this.shadowEl) {
			jQuery(this.shadowEl).remove();
			this.shadowEl = null
		}
		Nist[Xc$][$Kt][POm](this, $)
	},
	setBody: function(_) {
		if (!_) return;
		if (!mini.isArray(_)) _ = [_];
		for (var $ = 0,
		A = _.length; $ < A; $++) mini.append(this._contentEl, _[$])
	},
	getAttrs: function($) {
		var A = Nist[Xc$][Z_s][POm](this, $);
		mini[Dm7Q]($, A, ["popupEl", "popupCls", "showAction", "hideAction", "hAlign", "vAlign", "modalStyle", "onbeforeopen", "open", "onbeforeclose", "onclose"]);
		mini[CW7m]($, A, ["showModal", "showShadow", "allowDrag", "allowResize"]);
		mini[_i]($, A, ["showDelay", "hideDelay", "hOffset", "vOffset", "minWidth", "minHeight", "maxWidth", "maxHeight"]);
		var _ = mini[$Vy$]($, true);
		A.body = _;
		return A
	}
});
J9_$(Nist, "popup");
Nist_prototype = {
	isPopup: false,
	popupEl: null,
	popupCls: "",
	showAction: "mouseover",
	hideAction: "outerclick",
	showDelay: 300,
	hideDelay: 500,
	hAlign: "left",
	vAlign: "below",
	hOffset: 0,
	vOffset: 0,
	minWidth: 50,
	minHeight: 25,
	maxWidth: 2000,
	maxHeight: 2000,
	showModal: false,
	showShadow: true,
	modalStyle: "opacity:0.2",
	Ve$: "mini-popup-drag",
	QUY: "mini-popup-resize",
	allowDrag: false,
	allowResize: false,
	S4: function() {
		if (!this.popupEl) return;
		Ri(this.popupEl, "click", this.IJ9, this);
		Ri(this.popupEl, "contextmenu", this.MMq, this);
		Ri(this.popupEl, "mouseover", this.Nv5, this)
	},
	Mfk: function() {
		if (!this.popupEl) return;
		VPoJ(this.popupEl, "click", this.IJ9, this);
		VPoJ(this.popupEl, "contextmenu", this.MMq, this);
		VPoJ(this.popupEl, "mouseover", this.Nv5, this)
	},
	doShow: function(A) {
		var $ = {
			popupEl: this.popupEl,
			htmlEvent: A,
			cancel: false
		};
		this.fire("BeforeOpen", $);
		if ($.cancel == true) return;
		this.fire("opening", $);
		if ($.cancel == true) return;
		if (!this.popupEl) this.show();
		else {
			var _ = {};
			if (A) _.xy = [A.pageX, A.pageY];
			this.showAtEl(this.popupEl, _)
		}
	},
	doHide: function(_) {
		var $ = {
			popupEl: this.popupEl,
			htmlEvent: _,
			cancel: false
		};
		this.fire("BeforeClose", $);
		if ($.cancel == true) return;
		this.close()
	},
	show: function(_, $) {
		this.showAtPos(_, $)
	},
	showAtPos: function(B, A) {
		this[LV3H](document.body);
		if (!B) B = "center";
		if (!A) A = "middle";
		this.el.style.position = "absolute";
		this.el.style.left = "-2000px";
		this.el.style.top = "-2000px";
		this.el.style.display = "";
		this.CGd();
		var _ = mini.getViewportBox(),
		$ = Vrm(this.el);
		if (B == "left") B = 0;
		if (B == "center") B = _.width / 2 - $.width / 2;
		if (B == "right") B = _.width - $.width;
		if (A == "top") A = 0;
		if (A == "middle") A = _.y + _.height / 2 - $.height / 2;
		if (A == "bottom") A = _.height - $.height;
		if (B + $.width > _.right) B = _.right - $.width;
		if (A + $.height > _.bottom) A = _.bottom - $.height;
		this.WYy(B, A)
	},
	Np_: function() {
		jQuery(this.Fts).remove();
		if (!this[PXb]) return;
		if (this.visible == false) return;
		var _ = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
		C = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
		B = mini.getViewportBox(),
		A = B.height;
		if (A < C) A = C;
		var $ = B.width;
		if ($ < _) $ = _;
		this.Fts = mini.append(document.body, "<div class=\"mini-modal\"></div>");
		this.Fts.style.height = A + "px";
		this.Fts.style.width = $ + "px";
		this.Fts.style.zIndex = $qPf(this.el, "zIndex") - 1;
		MsRJ(this.Fts, this.modalStyle)
	},
	$Zf: function() {
		if (!this.shadowEl) this.shadowEl = mini.append(document.body, "<div class=\"mini-shadow\"></div>");
		this.shadowEl.style.display = this[$gC] ? "": "none";
		if (this[$gC]) {
			var $ = Vrm(this.el),
			A = this.shadowEl.style;
			A.width = $.width + "px";
			A.height = $.height + "px";
			A.left = $.x + "px";
			A.top = $.y + "px";
			var _ = $qPf(this.el, "zIndex");
			if (!isNaN(_)) this.shadowEl.style.zIndex = _ - 2
		}
	},
	CGd: function() {
		this.el.style.display = "";
		var $ = Vrm(this.el);
		if ($.width > this.maxWidth) {
			_ZS(this.el, this.maxWidth);
			$ = Vrm(this.el)
		}
		if ($.height > this.maxHeight) {
			M$(this.el, this.maxHeight);
			$ = Vrm(this.el)
		}
		if ($.width < this.minWidth) {
			_ZS(this.el, this.minWidth);
			$ = Vrm(this.el)
		}
		if ($.height < this.minHeight) {
			M$(this.el, this.minHeight);
			$ = Vrm(this.el)
		}
	},
	showAtEl: function(H, D) {
		H = PBm(H);
		if (!H) return;
		if (!this.isRender() || this.el.parentNode != document.body) this[LV3H](document.body);
		var A = {
			hAlign: this.hAlign,
			vAlign: this.vAlign,
			hOffset: this.hOffset,
			vOffset: this.vOffset,
			popupCls: this.popupCls
		};
		mini.copyTo(A, D);
		Rw(H, A.popupCls);
		H.popupCls = A.popupCls;
		this._popupEl = H;
		this.el.style.position = "absolute";
		this.el.style.left = "-2000px";
		this.el.style.top = "-2000px";
		this.el.style.display = "";
		this[QM]();
		this.CGd();
		var J = mini.getViewportBox(),
		B = Vrm(this.el),
		L = Vrm(H),
		F = A.xy,
		C = A.hAlign,
		E = A.vAlign,
		M = J.width / 2 - B.width / 2,
		K = 0;
		if (F) {
			M = F[0];
			K = F[1]
		}
		switch (A.hAlign) {
		case "outleft":
			M = L.x - B.width;
			break;
		case "left":
			M = L.x;
			break;
		case "center":
			M = L.x + L.width / 2 - B.width / 2;
			break;
		case "right":
			M = L.right - B.width;
			break;
		case "outright":
			M = L.right;
			break;
		default:
			break
		}
		switch (A.vAlign) {
		case "above":
			K = L.y - B.height;
			break;
		case "top":
			K = L.y;
			break;
		case "middle":
			K = L.y + L.height / 2 - B.height / 2;
			break;
		case "bottom":
			K = L.bottom - B.height;
			break;
		case "below":
			K = L.bottom;
			break;
		default:
			break
		}
		M = parseInt(M);
		K = parseInt(K);
		if (A.outVAlign || A.outHAlign) {
			if (A.outVAlign == "above") if (K + B.height > J.bottom) {
				var _ = L.y - J.y,
				I = J.bottom - L.bottom;
				if (_ > I) K = L.y - B.height
			}
			if (A.outHAlign == "outleft") if (M + B.width > J.right) {
				var G = L.x - J.x,
				$ = J.right - L.right;
				if (G > $) M = L.x - B.width
			}
			if (A.outHAlign == "right") if (M + B.width > J.right) M = L.right - B.width;
			this.WYy(M, K)
		} else this.showAtPos(M + A.hOffset, K + A.vOffset)
	},
	WYy: function(A, _) {
		this.el.style.display = "";
		this.el.style.zIndex = mini.getMaxZIndex();
		mini.setX(this.el, A);
		mini.setY(this.el, _);
		this[AYD](true);
		if (this.hideAction == "mouseout") VPoJ(document, "mousemove", this.HM4, this);
		var $ = this;
		this.$Zf();
		this.Np_();
		mini.layoutIFrames(this.el);
		this.isPopup = true;
		VPoJ(document, "mousedown", this.F9T, this);
		VPoJ(window, "resize", this.CPM, this);
		this.fire("Open")
	},
	open: function() {
		this.show()
	},
	close: function() {
		this.hide()
	},
	hide: function() {
		if (!this.el) return;
		if (this.popupEl) EhVe(this.popupEl, this.popupEl.popupCls);
		if (this._popupEl) EhVe(this._popupEl, this._popupEl.popupCls);
		this._popupEl = null;
		jQuery(this.Fts).remove();
		if (this.shadowEl) this.shadowEl.style.display = "none";
		Ri(document, "mousemove", this.HM4, this);
		Ri(document, "mousedown", this.F9T, this);
		Ri(window, "resize", this.CPM, this);
		this[AYD](false);
		this.isPopup = false;
		this.fire("Close")
	},
	setPopupEl: function($) {
		$ = PBm($);
		if (!$) return;
		this.S4();
		this.popupEl = $;
		this.Mfk()
	},
	setPopupCls: function($) {
		this.popupCls = $
	},
	setShowAction: function($) {
		this.showAction = $
	},
	setHideAction: function($) {
		this.hideAction = $
	},
	setShowDelay: function($) {
		this.showDelay = $
	},
	setHideDelay: function($) {
		this.hideDelay = $
	},
	setHAlign: function($) {
		this.hAlign = $
	},
	setVAlign: function($) {
		this.vAlign = $
	},
	setHOffset: function($) {
		$ = parseInt($);
		if (isNaN($)) $ = 0;
		this.hOffset = $
	},
	setVOffset: function($) {
		$ = parseInt($);
		if (isNaN($)) $ = 0;
		this.vOffset = $
	},
	setShowModal: function($) {
		this[PXb] = $
	},
	setShowShadow: function($) {
		this[$gC] = $
	},
	setMinWidth: function($) {
		if (isNaN($)) return;
		this.minWidth = $
	},
	setMinHeight: function($) {
		if (isNaN($)) return;
		this.minHeight = $
	},
	setMaxWidth: function($) {
		if (isNaN($)) return;
		this.maxWidth = $
	},
	setMaxHeight: function($) {
		if (isNaN($)) return;
		this.maxHeight = $
	},
	setAllowDrag: function($) {
		this.allowDrag = $;
		EhVe(this.el, this.Ve$);
		if ($) Rw(this.el, this.Ve$)
	},
	setAllowResize: function($) {
		this[Wpk] = $;
		EhVe(this.el, this.QUY);
		if ($) Rw(this.el, this.QUY)
	},
	IJ9: function(_) {
		if (this.I2u) return;
		if (this.showAction != "leftclick") return;
		var $ = jQuery(this.popupEl).attr("allowPopup");
		if (String($) == "false") return;
		this.doShow(_)
	},
	MMq: function(_) {
		if (this.I2u) return;
		if (this.showAction != "rightclick") return;
		var $ = jQuery(this.popupEl).attr("allowPopup");
		if (String($) == "false") return;
		_.preventDefault();
		this.doShow(_)
	},
	Nv5: function(A) {
		if (this.I2u) return;
		if (this.showAction != "mouseover") return;
		var _ = jQuery(this.popupEl).attr("allowPopup");
		if (String(_) == "false") return;
		clearTimeout(this._hideTimer);
		this._hideTimer = null;
		if (this.isPopup) return;
		var $ = this;
		this._showTimer = setTimeout(function() {
			$.doShow(A)
		},
		this.showDelay)
	},
	HM4: function($) {
		if (this.hideAction != "mouseout") return;
		this.Jm($)
	},
	F9T: function($) {
		if (this.hideAction != "outerclick") return;
		if (!this.isPopup) return;
		if (this[W05]($) || (this.popupEl && Dmv(this.popupEl, $.target)));
		else this.doHide($)
	},
	Jm: function(_) {
		if (Dmv(this.el, _.target) || (this.popupEl && Dmv(this.popupEl, _.target)));
		else {
			clearTimeout(this._showTimer);
			this._showTimer = null;
			if (this._hideTimer) return;
			var $ = this;
			this._hideTimer = setTimeout(function() {
				$.doHide(_)
			},
			this.hideDelay)
		}
	},
	CPM: function($) {
		if (this[S8B]()) this.Np_()
	}
};
mini.copyTo(Nist.prototype, Nist_prototype);
LDc = function() {
	LDc[Xc$][TYcW][POm](this)
};
Mup(LDc, DZV, {
	text: "",
	iconCls: "",
	iconStyle: "",
	plain: false,
	checkOnClick: false,
	checked: false,
	groupName: "",
	MoN: "mini-button-plain",
	_hoverCls: "mini-button-hover",
	JvuQ: "mini-button-pressed",
	Sl6f: "mini-button-checked",
	DB$k: "mini-button-disabled",
	allowCls: "",
	_clearBorder: false,
	set: function($) {
		if (typeof $ == "string") return this;
		this.O7bE = $.text || $[QrZ] || $.iconCls || $.iconPosition;
		LDc[Xc$].set[POm](this, $);
		if (this.O7bE === false) {
			this.O7bE = true;
			this[WRl]()
		}
		return this
	},
	uiCls: "mini-button",
	_create: function() {
		this.el = document.createElement("a");
		this.el.className = "mini-button";
		this.el.hideFocus = true;
		this.el.href = "javascript:void(0)";
		this[WRl]()
	},
	_initEvents: function() {
		Xs(function() {
			A4v(this.el, "mousedown", this.HG_, this);
			A4v(this.el, "click", this.Vj6T, this)
		},
		this)
	},
	destroy: function($) {
		if (this.el) {
			this.el.onclick = null;
			this.el.onmousedown = null
		}
		if (this.menu) this.menu.owner = null;
		this.menu = null;
		LDc[Xc$][$Kt][POm](this, $)
	},
	doUpdate: function() {
		if (this.O7bE === false) return;
		var _ = "",
		$ = this.text;
		if (this.iconCls && $) _ = " mini-button-icon " + this.iconCls;
		else if (this.iconCls && $ === "") {
			_ = " mini-button-iconOnly " + this.iconCls;
			$ = "&nbsp;"
		}
		var A = "<span class=\"mini-button-text " + _ + "\">" + $ + "</span>";
		if (this.allowCls) A = A + "<span class=\"mini-button-allow " + this.allowCls + "\"></span>";
		this.el.innerHTML = A
	},
	href: "",
	setHref: function($) {
		this.href = $;
		this.el.href = $;
		var _ = this.el;
		setTimeout(function() {
			_.onclick = null
		},
		100)
	},
	getHref: function() {
		return this.href
	},
	target: "",
	setTarget: function($) {
		this.target = $;
		this.el.target = $
	},
	getTarget: function() {
		return this.target
	},
	setText: function($) {
		if (this.text != $) {
			this.text = $;
			this[WRl]()
		}
	},
	getText: function() {
		return this.text
	},
	setIconCls: function($) {
		this.iconCls = $;
		this[WRl]()
	},
	getIconCls: function() {
		return this.iconCls
	},
	setIconStyle: function($) {
		this[QrZ] = $;
		this[WRl]()
	},
	getIconStyle: function() {
		return this[QrZ]
	},
	setIconPosition: function($) {
		this.iconPosition = "left";
		this[WRl]()
	},
	getIconPosition: function() {
		return this.iconPosition
	},
	setPlain: function($) {
		this.plain = $;
		if ($) this[Mr](this.MoN);
		else this[TkP](this.MoN)
	},
	getPlain: function() {
		return this.plain
	},
	setGroupName: function($) {
		this[S4OT] = $
	},
	getGroupName: function() {
		return this[S4OT]
	},
	setCheckOnClick: function($) {
		this[Sak] = $
	},
	getCheckOnClick: function() {
		return this[Sak]
	},
	setChecked: function($) {
		var _ = this.checked != $;
		this.checked = $;
		if ($) this[Mr](this.Sl6f);
		else this[TkP](this.Sl6f);
		if (_) this.fire("CheckedChanged")
	},
	getChecked: function() {
		return this.checked
	},
	doClick: function() {
		this.Vj6T(null)
	},
	Vj6T: function(D) {
		if (this[Ot]()) return;
		this.focus();
		if (this[Sak]) if (this[S4OT]) {
			var _ = this[S4OT],
			C = mini.findControls(function($) {
				if ($.type == "button" && $[S4OT] == _) return true
			});
			if (C.length > 0) {
				for (var $ = 0,
				A = C.length; $ < A; $++) {
					var B = C[$];
					if (B != this) B.setChecked(false)
				}
				this.setChecked(true)
			} else this.setChecked(!this.checked)
		} else this.setChecked(!this.checked);
		this.fire("click", {
			htmlEvent: D
		});
		return false
	},
	HG_: function($) {
		if (this[Ot]()) return;
		this[Mr](this.JvuQ);
		VPoJ(document, "mouseup", this.SdR, this)
	},
	SdR: function($) {
		this[TkP](this.JvuQ);
		Ri(document, "mouseup", this.SdR, this)
	},
	onClick: function(_, $) {
		this.on("click", _, $)
	},
	getAttrs: function($) {
		var _ = LDc[Xc$][Z_s][POm](this, $);
		_.text = $.innerHTML;
		mini[Dm7Q]($, _, ["text", "href", "iconCls", "iconStyle", "iconPosition", "groupName", "menu", "onclick", "oncheckedchanged", "target"]);
		mini[CW7m]($, _, ["plain", "checkOnClick", "checked"]);
		return _
	}
});
J9_$(LDc, "button");
XLButton = function() {
	XLButton[Xc$][TYcW][POm](this)
};
Mup(XLButton, LDc, {
	uiCls: "mini-menubutton",
	allowCls: "mini-button-menu",
	setMenu: function($) {
		if (mini.isArray($)) $ = {
			type: "menu",
			items: $
		};
		if (typeof $ == "string") {
			var _ = PBm($);
			if (!_) return;
			mini.parse($);
			$ = mini.get($)
		}
		if (this.menu !== $) {
			this.menu = mini.getAndCreate($);
			this.menu.setPopupEl(this.el);
			this.menu.setPopupCls("mini-button-popup");
			this.menu.setShowAction("leftclick");
			this.menu.setHideAction("outerclick");
			this.menu.setHAlign("left");
			this.menu.setVAlign("below");
			this.menu.hide();
			this.menu.owner = this
		}
	},
	setEnabled: function($) {
		this.enabled = $;
		if ($) this[TkP](this.DB$k);
		else this[Mr](this.DB$k);
		jQuery(this.el).attr("allowPopup", !!$)
	}
});
J9_$(XLButton, "menubutton");
mini.SplitButton = function() {
	mini.SplitButton[Xc$][TYcW][POm](this)
};
Mup(mini.SplitButton, XLButton, {
	uiCls: "mini-splitbutton",
	allowCls: "mini-button-split"
});
J9_$(mini.SplitButton, "splitbutton");
JSgM = function() {
	JSgM[Xc$][TYcW][POm](this)
};
Mup(JSgM, DZV, {
	formField: true,
	text: "",
	checked: false,
	defaultValue: false,
	trueValue: true,
	falseValue: false,
	uiCls: "mini-checkbox",
	_create: function() {
		var $ = this.uid + "$check";
		this.el = document.createElement("span");
		this.el.className = "mini-checkbox";
		this.el.innerHTML = "<input id=\"" + $ + "\" name=\"" + this.id + "\" type=\"checkbox\" class=\"mini-checkbox-check\"><label for=\"" + $ + "\" onclick=\"return false;\">" + this.text + "</label>";
		this.M6lL = this.el.firstChild;
		this.NXE = this.el.lastChild
	},
	destroy: function($) {
		if (this.M6lL) {
			this.M6lL.onmouseup = null;
			this.M6lL.onclick = null;
			this.M6lL = null
		}
		JSgM[Xc$][$Kt][POm](this, $)
	},
	_initEvents: function() {
		Xs(function() {
			VPoJ(this.el, "click", this.LWw, this);
			this.M6lL.onmouseup = function() {
				return false
			};
			var $ = this;
			this.M6lL.onclick = function() {
				if ($[Ot]()) return false
			}
		},
		this)
	},
	setName: function($) {
		this.name = $;
		mini.setAttr(this.M6lL, "name", this.name)
	},
	setText: function($) {
		if (this.text !== $) {
			this.text = $;
			this.NXE.innerHTML = $
		}
	},
	getText: function() {
		return this.text
	},
	setChecked: function($) {
		if ($ === true) $ = true;
		else if ($ == this.trueValue) $ = true;
		else if ($ == "true") $ = true;
		else if ($ === 1) $ = true;
		else if ($ == "Y") $ = true;
		else $ = false;
		if (this.checked !== $) {
			this.checked = !!$;
			this.M6lL.checked = this.checked;
			this.value = this.getValue()
		}
	},
	getChecked: function() {
		return this.checked
	},
	setValue: function($) {
		if (this.checked != $) {
			this.setChecked($);
			this.value = this.getValue()
		}
	},
	getValue: function() {
		return String(this.checked == true ? this.trueValue: this.falseValue)
	},
	getFormValue: function() {
		return this.getValue()
	},
	setTrueValue: function($) {
		this.M6lL.value = $;
		this.trueValue = $
	},
	getTrueValue: function() {
		return this.trueValue
	},
	setFalseValue: function($) {
		this.falseValue = $
	},
	getFalseValue: function() {
		return this.falseValue
	},
	LWw: function($) {
		if (this[Ot]()) return;
		this.setChecked(!this.checked);
		this.fire("checkedchanged", {
			checked: this.checked
		});
		this.fire("valuechanged", {
			value: this.getValue()
		});
		this.fire("click", $, this)
	},
	getAttrs: function(A) {
		var D = JSgM[Xc$][Z_s][POm](this, A),
		C = jQuery(A);
		D.text = A.innerHTML;
		mini[Dm7Q](A, D, ["text", "oncheckedchanged", "onclick", "onvaluechanged"]);
		mini[CW7m](A, D, ["enabled"]);
		var B = mini.getAttr(A, "checked");
		if (B) D.checked = (B == "true" || B == "checked") ? true: false;
		var _ = C.attr("trueValue");
		if (_) {
			D.trueValue = _;
			_ = parseInt(_);
			if (!isNaN(_)) D.trueValue = _
		}
		var $ = C.attr("falseValue");
		if ($) {
			D.falseValue = $;
			$ = parseInt($);
			if (!isNaN($)) D.falseValue = $
		}
		return D
	}
});
J9_$(JSgM, "checkbox");
JzO = function() {
	JzO[Xc$][TYcW][POm](this);
	var $ = this[Ot]();
	if ($ || this.allowInput == false) this.H4[PrF] = true;
	if (this.enabled == false) this[Mr](this.DB$k);
	if ($) this[Mr](this.MHV);
	if (this.required) this[Mr](this.Zaa4)
};
Mup(JzO, _bO, {
	name: "",
	formField: true,
	defaultValue: "",
	value: "",
	text: "",
	emptyText: "",
	maxLength: 1000,
	minLength: 0,
	width: 125,
	height: 21,
	inputAsValue: false,
	allowInput: true,
	P7_: "mini-buttonedit-noInput",
	MHV: "mini-buttonedit-readOnly",
	DB$k: "mini-buttonedit-disabled",
	XOY: "mini-buttonedit-empty",
	$O$: "mini-buttonedit-focus",
	FTM: "mini-buttonedit-button",
	B76: "mini-buttonedit-button-hover",
	Xhs: "mini-buttonedit-button-pressed",
	set: function($) {
		if (typeof $ == "string") return this;
		this.O7bE = !($.enabled == false || $.allowInput == false || $[PrF]);
		JzO[Xc$].set[POm](this, $);
		if (this.O7bE === false) {
			this.O7bE = true;
			this[WRl]()
		}
		return this
	},
	uiCls: "mini-buttonedit",
	LtHtml: function() {
		var $ = "onmouseover=\"Rw(this,'" + this.B76 + "');\" " + "onmouseout=\"EhVe(this,'" + this.B76 + "');\"";
		return "<span class=\"mini-buttonedit-button\" " + $ + "><span class=\"mini-buttonedit-icon\"></span></span>"
	},
	_create: function() {
		this.el = document.createElement("span");
		this.el.className = "mini-buttonedit";
		var $ = this.LtHtml();
		this.el.innerHTML = "<span class=\"mini-buttonedit-border\"><input type=\"input\" class=\"mini-buttonedit-input\" autocomplete=\"off\"/>" + $ + "</span><input name=\"" + this.name + "\" type=\"hidden\"/>";
		this.$Ar = this.el.firstChild;
		this.H4 = this.$Ar.firstChild;
		this.G5 = this.el.lastChild;
		this._buttonEl = this.$Ar.lastChild
	},
	destroy: function($) {
		if (this.el) {
			this.el.onmousedown = null;
			this.el.onmousewheel = null;
			this.el.onmouseover = null;
			this.el.onmouseout = null
		}
		if (this.H4) {
			this.H4.onchange = null;
			this.H4.onfocus = null;
			mini[Jhg](this.H4);
			this.H4 = null
		}
		JzO[Xc$][$Kt][POm](this, $)
	},
	_initEvents: function() {
		Xs(function() {
			A4v(this.el, "mousedown", this.HG_, this);
			A4v(this.H4, "focus", this.ER3, this);
			A4v(this.H4, "change", this.J9, this)
		},
		this)
	},
	Ap0: false,
	MGcC: function() {
		if (this.Ap0) return;
		this.Ap0 = true;
		VPoJ(this.el, "click", this.Vj6T, this);
		VPoJ(this.H4, "blur", this._$l, this);
		VPoJ(this.H4, "keydown", this.KiC, this);
		VPoJ(this.H4, "keyup", this.Fq2G, this);
		VPoJ(this.H4, "keypress", this.Tq, this)
	},
	_buttonWidth: 20,
	doLayout: function() {
		if (!this.canLayout()) return;
		JzO[Xc$][QM][POm](this);
		var $ = WDf(this.el);
		if (this.el.style.width == "100%") $ -= 1;
		if (this.AiOy) $ -= 18;
		$ -= 2;
		this.$Ar.style.width = $ + "px";
		$ -= this._buttonWidth;
		if (this.el.style.width == "100%") $ -= 1;
		if ($ < 0) $ = 0;
		this.H4.style.width = $ + "px"
	},
	setHeight: function($) {
		if (parseInt($) == $) $ += "px";
		this.height = $
	},
	KKv: function() {},
	focus: function() {
		try {
			this.H4.focus();
			var $ = this;
			setTimeout(function() {
				if ($.EEGT) $.H4.focus()
			},
			10)
		} catch(_) {}
	},
	blur: function() {
		try {
			this.H4.blur()
		} catch($) {}
	},
	selectText: function() {
		this.H4[MAi]()
	},
	getTextEl: function() {
		return this.H4
	},
	setName: function($) {
		this.name = $;
		this.G5.name = $
	},
	setEmptyText: function($) {
		if ($ === null || $ === undefined) $ = "";
		this[Sa8] = $;
		this.KKv()
	},
	getEmptyText: function() {
		return this[Sa8]
	},
	setText: function($) {
		if ($ === null || $ === undefined) $ = "";
		var _ = this.text !== $;
		this.text = $;
		this.H4.value = $
	},
	getText: function() {
		var $ = this.H4.value;
		return $ != this[Sa8] ? $: ""
	},
	setValue: function($) {
		if ($ === null || $ === undefined) $ = "";
		var _ = this.value !== $;
		this.value = $;
		this.KKv()
	},
	getValue: function() {
		return this.value
	},
	getFormValue: function() {
		value = this.value;
		if (value === null || value === undefined) value = "";
		return String(value)
	},
	setMaxLength: function($) {
		$ = parseInt($);
		if (isNaN($)) return;
		this.maxLength = $;
		this.H4.maxLength = $
	},
	getMaxLength: function() {
		return this.maxLength
	},
	setMinLength: function($) {
		$ = parseInt($);
		if (isNaN($)) return;
		this.minLength = $
	},
	getMinLength: function() {
		return this.minLength
	},
	_doReadOnly: function() {
		var $ = this[Ot]();
		if ($ || this.allowInput == false) this.H4[PrF] = true;
		else this.H4[PrF] = false;
		if ($) this[Mr](this.MHV);
		else this[TkP](this.MHV);
		if (this.allowInput) this[TkP](this.P7_);
		else this[Mr](this.P7_)
	},
	setAllowInput: function($) {
		this.allowInput = $;
		this._doReadOnly()
	},
	getAllowInput: function() {
		return this.allowInput
	},
	setInputAsValue: function($) {
		this.inputAsValue = $
	},
	getInputAsValue: function() {
		return this.inputAsValue
	},
	AiOy: null,
	getErrorIconEl: function() {
		if (!this.AiOy) this.AiOy = mini.append(this.el, "<span class=\"mini-errorIcon\"></span>");
		return this.AiOy
	},
	AJj: function() {
		if (this.AiOy) {
			var $ = this.AiOy;
			jQuery($).remove()
		}
		this.AiOy = null
	},
	Vj6T: function($) {
		if (this[Ot]() || this.enabled == false) return;
		if (Dmv(this._buttonEl, $.target)) this.WsEp($)
	},
	HG_: function(B) {
		if (this[Ot]() || this.enabled == false) return;
		if (!Dmv(this.H4, B.target)) {
			var $ = this;
			setTimeout(function() {
				$.focus();
				mini.selectRange($.H4, 1000, 1000)
			},
			1);
			if (Dmv(this._buttonEl, B.target)) {
				var _ = BD(B.target, "mini-buttonedit-up"),
				A = BD(B.target, "mini-buttonedit-down");
				if (_) {
					Rw(_, this.Xhs);
					this.IuQe(B, "up")
				} else if (A) {
					Rw(A, this.Xhs);
					this.IuQe(B, "down")
				} else {
					Rw(this._buttonEl, this.Xhs);
					this.IuQe(B)
				}
				VPoJ(document, "mouseup", this.SdR, this)
			}
		}
	},
	SdR: function(_) {
		var $ = this;
		setTimeout(function() {
			var A = $._buttonEl.getElementsByTagName("*");
			for (var _ = 0,
			B = A.length; _ < B; _++) EhVe(A[_], $.Xhs);
			EhVe($._buttonEl, $.Xhs);
			EhVe($.el, $.JvuQ)
		},
		80);
		Ri(document, "mouseup", this.SdR, this)
	},
	ER3: function($) {
		this[WRl]();
		this.MGcC();
		if (this[Ot]()) return;
		this.EEGT = true;
		this[Mr](this.$O$)
	},
	_$l: function(_) {
		this.EEGT = false;
		var $ = this;
		setTimeout(function() {
			if ($.EEGT == false) $[TkP]($.$O$)
		},
		2)
	},
	KiC: function(_) {
		this.fire("keydown", {
			htmlEvent: _
		});
		if (_.keyCode == 8 && (this[Ot]() || this.allowInput == false)) return false;
		if (_.keyCode == 13) {
			var $ = this;
			$.J9(null);
			$.fire("enter")
		}
	},
	J9: function() {
		var _ = this.H4.value,
		$ = this.getValue();
		this[G3S](_);
		if ($ !== this.getFormValue()) this.GdW()
	},
	Fq2G: function($) {
		this.fire("keyup", {
			htmlEvent: $
		})
	},
	Tq: function($) {
		this.fire("keypress", {
			htmlEvent: $
		})
	},
	WsEp: function($) {
		var _ = {
			htmlEvent: $,
			cancel: false
		};
		this.fire("beforebuttonclick", _);
		if (_.cancel == true) return;
		this.fire("buttonclick", _)
	},
	IuQe: function(_, $) {
		this.focus();
		this[Mr](this.$O$);
		this.fire("buttonmousedown", {
			htmlEvent: _,
			spinType: $
		})
	},
	onButtonClick: function(_, $) {
		this.on("buttonclick", _, $)
	},
	onButtonMouseDown: function(_, $) {
		this.on("buttonmousedown", _, $)
	},
	onTextChanged: function(_, $) {
		this.on("textchanged", _, $)
	},
	textName: "",
	setTextName: function($) {
		this.textName = $;
		if (this.H4) mini.setAttr(this.H4, "name", this.textName)
	},
	getTextName: function() {
		return this.textName
	},
	getAttrs: function($) {
		var A = JzO[Xc$][Z_s][POm](this, $),
		_ = jQuery($);
		mini[Dm7Q]($, A, ["value", "text", "textName", "onenter", "onkeydown", "onkeyup", "onkeypress", "onbuttonclick", "onbuttonmousedown", "ontextchanged"]);
		mini[CW7m]($, A, ["allowInput", "inputAsValue"]);
		mini[_i]($, A, ["maxLength", "minLength"]);
		return A
	}
});
J9_$(JzO, "buttonedit");
ZoD = function() {
	ZoD[Xc$][TYcW][POm](this)
};
Mup(ZoD, _bO, {
	name: "",
	formField: true,
	minHeight: 15,
	maxLength: 5000,
	emptyText: "",
	text: "",
	value: "",
	defaultValue: "",
	width: 125,
	height: 21,
	XOY: "mini-textbox-empty",
	$O$: "mini-textbox-focus",
	DB$k: "mini-textbox-disabled",
	uiCls: "mini-textbox",
	O7w: "text",
	_create: function() {
		var $ = "<input type=\"" + this.O7w + "\" class=\"mini-textbox-input\" autocomplete=\"off\"/>";
		if (this.O7w == "textarea") $ = "<textarea class=\"mini-textbox-input\" autocomplete=\"off\"/></textarea>";
		$ += "<input type=\"hidden\"/>";
		this.el = document.createElement("span");
		this.el.className = "mini-textbox";
		this.el.innerHTML = $;
		this.H4 = this.el.firstChild;
		this.G5 = this.el.lastChild;
		this.$Ar = this.H4
	},
	_initEvents: function() {
		Xs(function() {
			A4v(this.H4, "drop", this.__OnDropText, this);
			A4v(this.H4, "change", this.J9, this);
			A4v(this.H4, "focus", this.ER3, this);
			A4v(this.el, "mousedown", this.HG_, this)
		},
		this);
		this.on("validation", this.RV, this)
	},
	Ap0: false,
	MGcC: function() {
		if (this.Ap0) return;
		this.Ap0 = true;
		VPoJ(this.H4, "blur", this._$l, this);
		VPoJ(this.H4, "keydown", this.KiC, this);
		VPoJ(this.H4, "keyup", this.Fq2G, this);
		VPoJ(this.H4, "keypress", this.Tq, this)
	},
	destroy: function($) {
		if (this.el) this.el.onmousedown = null;
		if (this.H4) {
			this.H4.ondrop = null;
			this.H4.onchange = null;
			this.H4.onfocus = null;
			mini[Jhg](this.H4);
			this.H4 = null
		}
		if (this.G5) {
			mini[Jhg](this.G5);
			this.G5 = null
		}
		ZoD[Xc$][$Kt][POm](this, $)
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		var $ = WDf(this.el);
		if (this.AiOy) $ -= 18;
		$ -= 4;
		if (this.el.style.width == "100%") $ -= 1;
		if ($ < 0) $ = 0;
		this.H4.style.width = $ + "px"
	},
	setHeight: function($) {
		if (parseInt($) == $) $ += "px";
		this.height = $;
		if (this.O7w == "textarea") {
			this.el.style.height = $;
			this[QM]()
		}
	},
	setName: function($) {
		if (this.name != $) {
			this.name = $;
			this.G5.name = $
		}
	},
	setValue: function($) {
		if ($ === null || $ === undefined) $ = "";
		$ = String($);
		if (this.value !== $) {
			this.value = $;
			this.G5.value = this.H4.value = $;
			this.KKv()
		}
	},
	getValue: function() {
		return this.value
	},
	getFormValue: function() {
		value = this.value;
		if (value === null || value === undefined) value = "";
		return String(value)
	},
	setAllowInput: function($) {
		if (this.allowInput != $) {
			this.allowInput = $;
			this[WRl]()
		}
	},
	getAllowInput: function() {
		return this.allowInput
	},
	KKv: function() {
		if (this.EEGT) return;
		if (this.value == "" && this[Sa8]) {
			this.H4.value = this[Sa8];
			Rw(this.el, this.XOY)
		} else EhVe(this.el, this.XOY)
	},
	setEmptyText: function($) {
		if (this[Sa8] != $) {
			this[Sa8] = $;
			this.KKv()
		}
	},
	getEmptyText: function() {
		return this[Sa8]
	},
	setMaxLength: function($) {
		this.maxLength = $;
		mini.setAttr(this.H4, "maxLength", $);
		if (this.O7w == "textarea") VPoJ(this.H4, "keypress", this.__OnMaxLengthKeyUp, this)
	},
	__OnMaxLengthKeyUp: function($) {
		if (this.H4.value.length >= this.maxLength) $.preventDefault()
	},
	getMaxLength: function() {
		return this.maxLength
	},
	setReadOnly: function($) {
		if (this[PrF] != $) {
			this[PrF] = $;
			this[WRl]()
		}
	},
	setEnabled: function($) {
		if (this.enabled != $) {
			this.enabled = $;
			this[WRl]()
		}
	},
	doUpdate: function() {
		if (this.enabled) this[TkP](this.DB$k);
		else this[Mr](this.DB$k);
		if (this[Ot]() || this.allowInput == false) this.H4[PrF] = true;
		else this.H4[PrF] = false;
		if (this.required) this[Mr](this.Zaa4);
		else this[TkP](this.Zaa4)
	},
	focus: function() {
		try {
			this.H4.focus()
		} catch($) {}
	},
	blur: function() {
		try {
			this.H4.blur()
		} catch($) {}
	},
	selectText: function() {
		this.H4[MAi]()
	},
	getTextEl: function() {
		return this.H4
	},
	AiOy: null,
	getErrorIconEl: function() {
		if (!this.AiOy) this.AiOy = mini.append(this.el, "<span class=\"mini-errorIcon\"></span>");
		return this.AiOy
	},
	AJj: function() {
		if (this.AiOy) {
			var $ = this.AiOy;
			jQuery($).remove()
		}
		this.AiOy = null
	},
	HG_: function(_) {
		var $ = this;
		if (!Dmv(this.H4, _.target)) setTimeout(function() {
			$.focus();
			mini.selectRange($.H4, 1000, 1000)
		},
		1);
		else setTimeout(function() {
			$.H4.focus()
		},
		1)
	},
	J9: function(A, _) {
		var $ = this.value;
		this[G3S](this.H4.value);
		if ($ !== this.getValue() || _ === true) this.GdW()
	},
	__OnDropText: function(_) {
		var $ = this;
		setTimeout(function() {
			$.J9(_)
		},
		0)
	},
	KiC: function(_) {
		this.fire("keydown", {
			htmlEvent: _
		});
		if (_.keyCode == 8 && (this[Ot]() || this.allowInput == false)) return false;
		if (_.keyCode == 13) {
			this.J9(null, true);
			var $ = this;
			setTimeout(function() {
				$.fire("enter")
			},
			10)
		}
	},
	Fq2G: function($) {
		this.fire("keyup", {
			htmlEvent: $
		})
	},
	Tq: function($) {
		this.fire("keypress", {
			htmlEvent: $
		})
	},
	ER3: function($) {
		this[WRl]();
		if (this[Ot]()) return;
		this.EEGT = true;
		this[Mr](this.$O$);
		this.MGcC();
		EhVe(this.el, this.XOY);
		if (this[Sa8] && this.H4.value == this[Sa8]) {
			this.H4.value = "";
			this.H4[MAi]()
		}
	},
	_$l: function(_) {
		this.EEGT = false;
		var $ = this;
		setTimeout(function() {
			if ($.EEGT == false) $[TkP]($.$O$)
		},
		2);
		if (this[Sa8] && this.H4.value == "") {
			this.H4.value = this[Sa8];
			Rw(this.el, this.XOY)
		}
	},
	getAttrs: function($) {
		var A = ZoD[Xc$][Z_s][POm](this, $),
		_ = jQuery($);
		mini[Dm7Q]($, A, ["value", "text", "emptyText", "onenter", "onkeydown", "onkeyup", "onkeypress", "maxLengthErrorText", "minLengthErrorText", "vtype", "emailErrorText", "urlErrorText", "floatErrorText", "intErrorText", "dateErrorText", "minErrorText", "maxErrorText", "rangeLengthErrorText", "rangeErrorText", "rangeCharErrorText"]);
		mini[CW7m]($, A, ["allowInput"]);
		mini[_i]($, A, ["maxLength", "minLength", "minHeight"]);
		return A
	},
	vtype: "",
	emailErrorText: "Please enter a valid email address.",
	urlErrorText: "Please enter a valid URL.",
	floatErrorText: "Please enter a valid number.",
	intErrorText: "Please enter only digits",
	dateErrorText: "Please enter a valid date. Date format is {0}",
	maxLengthErrorText: "Please enter no more than {0} characters.",
	minLengthErrorText: "Please enter at least {0} characters.",
	maxErrorText: "Please enter a value less than or equal to {0}.",
	minErrorText: "Please enter a value greater than or equal to {0}.",
	rangeLengthErrorText: "Please enter a value between {0} and {1} characters long.",
	rangeCharErrorText: "Please enter a value between {0} and {1} characters long.",
	rangeErrorText: "Please enter a value between {0} and {1}.",
	RV: function(H) {
		if (H.isValid == false) return;
		var _ = this.vtype.split(";");
		for (var $ = 0,
		F = _.length; $ < F; $++) {
			var B = _[$].trim(),
			E = B.split(":"),
			C = E[0],
			A = E[1];
			if (A) A = A.split(",");
			else A = [];
			var G = this["__" + C];
			if (G) {
				var D = G(H.value, A);
				if (D !== true) {
					H.isValid = false;
					H.errorText = this[E[0] + "ErrorText"] || "";
					H.errorText = String.format(H.errorText, A[0], A[1], A[2], A[3], A[4]);
					break
				}
			}
		}
	},
	__email: function(_, $) {
		if (_.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) return true;
		else return false
	},
	__url: function(A, $) {
		function _(_) {
			_ = _.toLowerCase();
			var $ = "^((https|http|ftp|rtsp|mms)?://)" + "?(([0-9a-z_!~*'().&=+$%-]+:)?[0-9a-z_!~*'().&=+$%-]+@)?" + "(([0-9]{1,3}.){3}[0-9]{1,3}" + "|" + "([0-9a-z_!~*'()-]+.)*" + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]." + "[a-z]{2,6})" + "(:[0-9]{1,4})?" + "((/?)|" + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$",
			A = new RegExp($);
			if (A.test(_)) return (true);
			else return (false)
		}
		return _(A)
	},
	__int: function(A, _) {
		function $(_) {
			var $ = String(_);
			return $.length > 0 && !(/[^0-9]/).test($)
		}
		return $(A)
	},
	__float: function(A, _) {
		function $(_) {
			var $ = String(_);
			return $.length > 0 && !(/[^0-9.]/).test($)
		}
		return $(A)
	},
	__date: function(B, _) {
		if (!B) return false;
		var $ = null,
		A = _[0];
		if (A) {
			$ = mini.parseDate(B, A);
			if ($ && $.getFullYear) if (mini.formatDate($, A) == B) return true
		} else {
			$ = mini.parseDate(B, "yyyy-MM-dd");
			if (!$) $ = mini.parseDate(B, "yyyy/MM/dd");
			if (!$) $ = mini.parseDate(B, "MM/dd/yyyy");
			if ($ && $.getFullYear) return true
		}
		return false
	},
	__maxLength: function(A, $) {
		var _ = parseInt($);
		if (!A || isNaN(_)) return true;
		if (A.length <= _) return true;
		else return false
	},
	__minLength: function(A, $) {
		var _ = parseInt($);
		if (isNaN(_)) return true;
		if (A.length >= _) return true;
		else return false
	},
	__rangeLength: function(B, _) {
		if (!B) return false;
		var $ = parseFloat(_[0]),
		A = parseFloat(_[1]);
		if (isNaN($) || isNaN(A)) return true;
		if ($ <= B.length && B.length <= A) return true;
		return false
	},
	__rangeChar: function(G, B) {
		if (!G) return false;
		var A = parseFloat(B[0]),
		E = parseFloat(B[1]);
		if (isNaN(A) || isNaN(E)) return true;
		function C(_) {
			var $ = new RegExp("^[\u4e00-\u9fa5]+$");
			if ($.test(_)) return true;
			return false
		}
		var $ = 0,
		F = String(G).split("");
		for (var _ = 0,
		D = F.length; _ < D; _++) if (C(F[_])) $ += 2;
		else $ += 1;
		if (A <= $ && $ <= E) return true;
		return false
	},
	__range: function(B, _) {
		B = parseFloat(B);
		if (isNaN(B)) return false;
		var $ = parseFloat(_[0]),
		A = parseFloat(_[1]);
		if (isNaN($) || isNaN(A)) return true;
		if ($ <= B && B <= A) return true;
		return false
	},
	setVtype: function($) {
		this.vtype = $
	},
	getVtype: function() {
		return this.vtype
	},
	setEmailErrorText: function($) {
		this.emailErrorText = $
	},
	getEmailErrorText: function() {
		return this.emailErrorText
	},
	setUrlErrorText: function($) {
		this.urlErrorText = $
	},
	getUrlErrorText: function() {
		return this.urlErrorText
	},
	setFloatErrorText: function($) {
		this.floatErrorText = $
	},
	getFloatErrorText: function() {
		return this.floatErrorText
	},
	setIntErrorText: function($) {
		this.intErrorText = $
	},
	getIntErrorText: function() {
		return this.intErrorText
	},
	setDateErrorText: function($) {
		this.dateErrorText = $
	},
	getDateErrorText: function() {
		return this.dateErrorText
	},
	setMaxLengthErrorText: function($) {
		this.maxLengthErrorText = $
	},
	getMaxLengthErrorText: function() {
		return this.maxLengthErrorText
	},
	setMinLengthErrorText: function($) {
		this.minLengthErrorText = $
	},
	getMinLengthErrorText: function() {
		return this.minLengthErrorText
	},
	setMaxErrorText: function($) {
		this.maxErrorText = $
	},
	getMaxErrorText: function() {
		return this.maxErrorText
	},
	setMinErrorText: function($) {
		this.minErrorText = $
	},
	getMinErrorText: function() {
		return this.minErrorText
	},
	setRangeLengthErrorText: function($) {
		this.rangeLengthErrorText = $
	},
	getRangeLengthErrorText: function() {
		return this.rangeLengthErrorText
	},
	setRangeCharErrorText: function($) {
		this.rangeCharErrorText = $
	},
	getRangeCharErrorText: function() {
		return this.rangeCharErrorText
	},
	setRangeErrorText: function($) {
		this.rangeErrorText = $
	},
	getRangeErrorText: function() {
		return this.rangeErrorText
	}
});
J9_$(ZoD, "textbox");
DFJ = function() {
	DFJ[Xc$][TYcW][POm](this)
};
Mup(DFJ, ZoD, {
	uiCls: "mini-password",
	O7w: "password",
	setEmptyText: function($) {
		this[Sa8] = ""
	}
});
J9_$(DFJ, "password");
W7U = function() {
	W7U[Xc$][TYcW][POm](this)
};
Mup(W7U, ZoD, {
	maxLength: 100000,
	width: 180,
	height: 50,
	minHeight: 50,
	O7w: "textarea",
	uiCls: "mini-textarea",
	doLayout: function() {
		if (!this.canLayout()) return;
		W7U[Xc$][QM][POm](this);
		var $ = J6(this.el);
		$ -= 2;
		if ($ < 0) $ = 0;
		this.H4.style.height = $ + "px"
	}
});
J9_$(W7U, "textarea");
Xpy = function() {
	Xpy[Xc$][TYcW][POm](this);
	this.MEA();
	this.el.className += " mini-popupedit"
};
Mup(Xpy, JzO, {
	uiCls: "mini-popupedit",
	popup: null,
	popupCls: "mini-buttonedit-popup",
	_hoverCls: "mini-buttonedit-hover",
	JvuQ: "mini-buttonedit-pressed",
	destroy: function($) {
		if (this.isShowPopup()) this[JAaF]();
		if (this.popup) {
			this.popup[$Kt]();
			this.popup = null
		}
		Xpy[Xc$][$Kt][POm](this, $)
	},
	_initEvents: function() {
		Xpy[Xc$][ZOZN][POm](this);
		Xs(function() {
			A4v(this.el, "mouseover", this.Nv5, this);
			A4v(this.el, "mouseout", this.XKd, this)
		},
		this)
	},
	LCK: function() {
		this.buttons = [];
		var $ = this.createButton({
			cls: "mini-buttonedit-popup",
			iconCls: "mini-buttonedit-icons-popup",
			name: "popup"
		});
		this.buttons.push($)
	},
	Nv5: function($) {
		if (this[Ot]() || this.allowInput) return;
		if (BD($.target, "mini-buttonedit-border")) this[Mr](this._hoverCls)
	},
	XKd: function($) {
		if (this[Ot]() || this.allowInput) return;
		this[TkP](this._hoverCls)
	},
	HG_: function($) {
		if (this[Ot]()) return;
		Xpy[Xc$].HG_[POm](this, $);
		if (this.allowInput == false && BD($.target, "mini-buttonedit-border")) {
			Rw(this.el, this.JvuQ);
			VPoJ(document, "mouseup", this.SdR, this)
		}
	},
	KiC: function($) {
		this.fire("keydown", {
			htmlEvent: $
		});
		if ($.keyCode == 8 && (this[Ot]() || this.allowInput == false)) return false;
		if ($.keyCode == 9) {
			this[JAaF]();
			return
		}
		if ($.keyCode == 27) {
			this[JAaF]();
			return
		}
		if ($.keyCode == 13) this.fire("enter");
		if (this.isShowPopup()) if ($.keyCode == 13 || $.keyCode == 27) $.stopPropagation()
	},
	within: function($) {
		if (Dmv(this.el, $.target)) return true;
		if (this.popup[W05]($)) return true;
		return false
	},
	popupWidth: "100%",
	popupMinWidth: 50,
	popupMaxWidth: 2000,
	popupHeight: "",
	popupMinHeight: 30,
	popupMaxHeight: 2000,
	setPopup: function($) {
		if (typeof $ == "string") {
			mini.parse($);
			$ = mini.get($)
		}
		var _ = mini.getAndCreate($);
		if (!_) return;
		_[AYD](true);
		_[LV3H](this.popup._contentEl);
		_.owner = this;
		_.on("beforebuttonclick", this.YWh, this)
	},
	getPopup: function() {
		if (!this.popup) this.MEA();
		return this.popup
	},
	MEA: function() {
		this.popup = new Nist();
		this.popup.setShowAction("none");
		this.popup.setHideAction("outerclick");
		this.popup.setPopupEl(this.el);
		this.popup.on("BeforeClose", this.SAu, this);
		VPoJ(this.popup.el, "keydown", this.__OnPopupKeyDown, this)
	},
	SAu: function($) {
		if (this[W05]($.htmlEvent)) $.cancel = true
	},
	__OnPopupKeyDown: function($) {},
	showPopup: function() {
		var _ = this.getPopup(),
		B = this.getBox(),
		$ = this[_8];
		if (this[_8] == "100%") $ = B.width;
		_[B26J]($);
		var A = parseInt(this[L_h5]);
		if (!isNaN(A)) _[X7B7](A);
		else _[X7B7]("auto");
		_.setMinWidth(this[Y7X]);
		_.setMinHeight(this[ARjH]);
		_.setMaxWidth(this[P3c]);
		_.setMaxHeight(this[N9cK]);
		_.showAtEl(this.el, {
			hAlign: "left",
			vAlign: "below",
			outVAlign: "above",
			outHAlign: "right",
			popupCls: this.popupCls
		});
		_.on("Close", this.NoS, this);
		this.fire("showpopup")
	},
	NoS: function($) {
		this.fire("hidepopup")
	},
	hidePopup: function() {
		var $ = this.getPopup();
		$.close()
	},
	isShowPopup: function() {
		if (this.popup && this.popup.visible) return true;
		else return false
	},
	setPopupWidth: function($) {
		this[_8] = $
	},
	setPopupMaxWidth: function($) {
		this[P3c] = $
	},
	setPopupMinWidth: function($) {
		this[Y7X] = $
	},
	getPopupWidth: function($) {
		return this[_8]
	},
	getPopupMaxWidth: function($) {
		return this[P3c]
	},
	getPopupMinWidth: function($) {
		return this[Y7X]
	},
	setPopupHeight: function($) {
		this[L_h5] = $
	},
	setPopupMaxHeight: function($) {
		this[N9cK] = $
	},
	setPopupMinHeight: function($) {
		this[ARjH] = $
	},
	getPopupHeight: function($) {
		return this[L_h5]
	},
	getPopupMaxHeight: function($) {
		return this[N9cK]
	},
	getPopupMinHeight: function($) {
		return this[ARjH]
	},
	Vj6T: function(_) {
		if (this[Ot]()) return;
		if (Dmv(this._buttonEl, _.target)) this.WsEp(_);
		if (this.allowInput == false || Dmv(this._buttonEl, _.target)) if (this.isShowPopup()) this[JAaF]();
		else {
			var $ = this;
			setTimeout(function() {
				$[Lvd]()
			},
			1)
		}
	},
	YWh: function($) {
		if ($.name == "close") this[JAaF]();
		$.cancel = true
	},
	getAttrs: function($) {
		var _ = Xpy[Xc$][Z_s][POm](this, $);
		mini[Dm7Q]($, _, ["popupWidth", "popupHeight", "popup", "onshowpopup", "onhidepopup"]);
		mini[_i]($, _, ["popupMinWidth", "popupMaxWidth", "popupMinHeight", "popupMaxHeight"]);
		return _
	}
});
J9_$(Xpy, "popupedit");
JX = function() {
	this.data = [];
	this.columns = [];
	JX[Xc$][TYcW][POm](this)
};
Mup(JX, Xpy, {
	text: "",
	value: "",
	valueField: "id",
	textField: "text",
	delimiter: ",",
	multiSelect: false,
	data: [],
	url: "",
	columns: [],
	allowInput: false,
	valueFromSelect: false,
	popupMaxHeight: 200,
	set: function(A) {
		if (typeof A == "string") return this;
		var $ = A.value;
		delete A.value;
		var B = A.url;
		delete A.url;
		var _ = A.data;
		delete A.data;
		JX[Xc$].set[POm](this, A);
		if (!mini.isNull(_)) {
			this[Uq0](_);
			A.data = _
		}
		if (!mini.isNull(B)) {
			this.setUrl(B);
			A.url = B
		}
		if (!mini.isNull($)) {
			this[G3S]($);
			A.value = $
		}
		return this
	},
	uiCls: "mini-combobox",
	MEA: function() {
		JX[Xc$].MEA[POm](this);
		this.VC_1 = new Zr();
		this.VC_1.setBorderStyle("border:0;");
		this.VC_1.setStyle("width:100%;height:auto;");
		this.VC_1[LV3H](this.popup._contentEl);
		this.VC_1.on("itemclick", this.Odo, this)
	},
	showPopup: function() {
		this.VC_1[X7B7]("auto");
		JX[Xc$][Lvd][POm](this);
		var $ = this.popup.el.style.height;
		if ($ == "" || $ == "auto") this.VC_1[X7B7]("auto");
		else this.VC_1[X7B7]("100%");
		this.VC_1[G3S](this.value)
	},
	getItem: function($) {
		return typeof $ == "object" ? $: this.data[$]
	},
	indexOf: function($) {
		return this.data.indexOf($)
	},
	getAt: function($) {
		return this.data[$]
	},
	load: function($) {
		if (typeof $ == "string") this.setUrl($);
		else this[Uq0]($)
	},
	setData: function(data) {
		if (typeof data == "string") data = eval("(" + data + ")");
		if (!mini.isArray(data)) data = [];
		this.VC_1[Uq0](data);
		this.data = this.VC_1.data;
		var vts = this.VC_1.Ydy(this.value);
		this.H4.value = vts[1]
	},
	getData: function() {
		return this.data
	},
	setUrl: function(_) {
		this.getPopup();
		this.VC_1.setUrl(_);
		this.url = this.VC_1.url;
		this.data = this.VC_1.data;
		var $ = this.VC_1.Ydy(this.value);
		this.H4.value = $[1]
	},
	getUrl: function() {
		return this.url
	},
	setValueField: function($) {
		this[KQP] = $;
		if (this.VC_1) this.VC_1[_FNO]($)
	},
	getValueField: function() {
		return this[KQP]
	},
	setTextField: function($) {
		if (this.VC_1) this.VC_1.setTextField($);
		this[XsI] = $
	},
	getTextField: function() {
		return this[XsI]
	},
	setDisplayField: function($) {
		this.setTextField($)
	},
	setValue: function($) {
		if (this.value !== $) {
			var _ = this.VC_1.Ydy($);
			this.value = $;
			this.G5.value = this.value;
			this.H4.value = _[1]
		} else {
			_ = this.VC_1.Ydy($);
			this.H4.value = _[1]
		}
	},
	setMultiSelect: function($) {
		if (this[A0A] != $) {
			this[A0A] = $;
			if (this.VC_1) {
				this.VC_1.setMultiSelect($);
				this.VC_1.setShowCheckBox($)
			}
		}
	},
	getMultiSelect: function() {
		return this[A0A]
	},
	setColumns: function($) {
		if (!mini.isArray($)) $ = [];
		this.columns = $;
		this.VC_1[L6r]($)
	},
	getColumns: function() {
		return this.columns
	},
	showNullItem: false,
	setShowNullItem: function($) {
		if (this.showNullItem != $) {
			this.showNullItem = $;
			this.VC_1.setShowNullItem($)
		}
	},
	getShowNullItem: function() {
		return this.showNullItem
	},
	setValueFromSelect: function($) {
		this.valueFromSelect = $
	},
	getValueFromSelect: function() {
		return this.valueFromSelect
	},
	GdW: function() {
		if (this.validateOnChanged) this[$XOk]();
		var $ = this.getValue(),
		B = this.getSelecteds(),
		_ = B[0],
		A = this;
		A.fire("valuechanged", {
			value: $,
			selecteds: B,
			selected: _
		})
	},
	getSelecteds: function() {
		return this.VC_1.findItems(this.value)
	},
	getSelected: function() {
		return this.getSelecteds()[0]
	},
	Odo: function(C) {
		var B = this.VC_1.getValue(),
		A = this.VC_1.Ydy(B),
		$ = this.getValue();
		this[G3S](B);
		this[HH](A[1]);
		if ($ != this.getValue()) {
			var _ = this;
			setTimeout(function() {
				_.GdW()
			},
			1)
		}
		if (!this[A0A]) this[JAaF]();
		this.focus()
	},
	KiC: function(B) {
		this.fire("keydown", {
			htmlEvent: B
		});
		if (B.keyCode == 8 && (this[Ot]() || this.allowInput == false)) return false;
		if (B.keyCode == 9) {
			this[JAaF]();
			return
		}
		switch (B.keyCode) {
		case 27:
			if (this.isShowPopup()) B.stopPropagation();
			this[JAaF]();
			break;
		case 13:
			if (this.isShowPopup()) {
				B.preventDefault();
				B.stopPropagation();
				var _ = this.VC_1.getFocusedIndex();
				if (_ != -1) {
					var $ = this.VC_1.getAt(_),
					A = this.VC_1.Ydy([$]);
					this[G3S](A[0]);
					this[HH](A[1]);
					this.GdW();
					this[JAaF]()
				}
			} else this.fire("enter");
			break;
		case 37:
			break;
		case 38:
			_ = this.VC_1.getFocusedIndex();
			if (_ == -1) {
				_ = 0;
				if (!this[A0A]) {
					$ = this.VC_1.findItems(this.value)[0];
					if ($) _ = this.VC_1.indexOf($)
				}
			}
			if (this.isShowPopup()) if (!this[A0A]) {
				_ -= 1;
				if (_ < 0) _ = 0;
				this.VC_1.Z1W(_, true)
			}
			break;
		case 39:
			break;
		case 40:
			_ = this.VC_1.getFocusedIndex();
			if (_ == -1) {
				_ = 0;
				if (!this[A0A]) {
					$ = this.VC_1.findItems(this.value)[0];
					if ($) _ = this.VC_1.indexOf($)
				}
			}
			if (this.isShowPopup()) {
				if (!this[A0A]) {
					_ += 1;
					if (_ > this.VC_1.getCount() - 1) _ = this.VC_1.getCount() - 1;
					this.VC_1.Z1W(_, true)
				}
			} else {
				this[Lvd]();
				if (!this[A0A]) this.VC_1.Z1W(_, true)
			}
			break;
		default:
			this.Nys(this.H4.value);
			break
		}
	},
	Fq2G: function($) {
		this.fire("keyup", {
			htmlEvent: $
		})
	},
	Tq: function($) {
		this.fire("keypress", {
			htmlEvent: $
		})
	},
	Nys: function(_) {
		var $ = this;
		setTimeout(function() {
			var A = $.H4.value;
			if (A != _) $.Ia6(A)
		},
		10)
	},
	Ia6: function(B) {
		if (this[A0A] == true) return;
		var A = [];
		for (var C = 0,
		E = this.data.length; C < E; C++) {
			var _ = this.data[C],
			D = _[this.textField];
			if (typeof D == "string") if (D.indexOf(B) != -1) A.push(_)
		}
		this.VC_1[Uq0](A);
		this._filtered = true;
		if (B !== "" || this.isShowPopup()) {
			this[Lvd]();
			var $ = 0;
			if (this.VC_1.getShowNullItem()) $ = 1;
			this.VC_1.Z1W($, true)
		}
	},
	NoS: function($) {
		if (this._filtered) {
			this._filtered = false;
			if (this.VC_1.el) this.VC_1[Uq0](this.data)
		}
		this.fire("hidepopup")
	},
	J9: function(J) {
		if (this[A0A] == false) {
			var E = this.H4.value;
			if (this.valueFromSelect == false) {
				this[G3S](E);
				if (this.value && !this.H4.value) this[HH](E);
				this.GdW()
			} else {
				var H = this.getData(),
				F = null;
				for (var D = 0,
				B = H.length; D < B; D++) {
					var $ = H[D],
					I = $[this.textField];
					if (I == E) {
						F = $;
						break
					}
				}
				this.VC_1[G3S](F ? F[this.valueField] : "");
				var C = this.VC_1.getValue(),
				A = this.VC_1.Ydy(C),
				_ = this.getValue();
				this[G3S](C);
				this[HH](A[1]);
				if (_ != this.getValue()) {
					var G = this;
					G.GdW()
				}
			}
		}
	},
	getAttrs: function(G) {
		var E = JX[Xc$][Z_s][POm](this, G);
		mini[Dm7Q](G, E, ["url", "data", "textField", "valueField", "displayField"]);
		mini[CW7m](G, E, ["multiSelect", "showNullItem", "valueFromSelect"]);
		if (E.displayField) E[XsI] = E.displayField;
		var C = E[KQP] || this[KQP],
		H = E[XsI] || this[XsI];
		if (G.nodeName.toLowerCase() == "select") {
			var I = [];
			for (var F = 0,
			D = G.length; F < D; F++) {
				var $ = G.options[F],
				_ = {};
				_[H] = $.text;
				_[C] = $.value;
				I.push(_)
			}
			if (I.length > 0) E.data = I
		} else {
			var J = mini[$Vy$](G);
			for (F = 0, D = J.length; F < D; F++) {
				var A = J[F],
				B = jQuery(A).attr("property");
				if (!B) continue;
				B = B.toLowerCase();
				if (B == "columns") E.columns = mini._ParseColumns(A);
				else if (B == "data") E.data = A.innerHTML
			}
		}
		return E
	}
});
J9_$(JX, "combobox");
C81 = function() {
	C81[Xc$][TYcW][POm](this)
};
Mup(C81, Xpy, {
	format: "yyyy-MM-dd",
	popupWidth: "",
	viewDate: new Date(),
	showTime: false,
	timeFormat: "H:mm",
	showTodayButton: true,
	showClearButton: true,
	uiCls: "mini-datepicker",
	_getCalendar: function() {
		if (!C81._Calendar) {
			var $ = C81._Calendar = new G8i();
			$.setStyle("border:0;")
		}
		return C81._Calendar
	},
	MEA: function() {
		C81[Xc$].MEA[POm](this);
		this.YWF = this._getCalendar()
	},
	showPopup: function() {
		this.YWF.beginUpdate();
		this.YWF[LV3H](this.popup._contentEl);
		this.YWF.set({
			showTime: this.showTime,
			timeFormat: this.timeFormat,
			showClearButton: this.showClearButton,
			showTodayButton: this.showTodayButton
		});
		this.YWF[G3S](this.value);
		if (this.value) this.YWF.setViewDate(this.value);
		else this.YWF.setViewDate(this.viewDate);
		if (this.YWF._target) {
			var $ = this.YWF._target;
			this.YWF.un("timechanged", $.PzY, $);
			this.YWF.un("dateclick", $.DRyu, $);
			this.YWF.un("drawdate", $.Abo, $)
		}
		this.YWF.on("timechanged", this.PzY, this);
		this.YWF.on("dateclick", this.DRyu, this);
		this.YWF.on("drawdate", this.Abo, this);
		this.YWF.endUpdate();
		C81[Xc$][Lvd][POm](this);
		this.YWF._target = this;
		this.YWF.focus()
	},
	hidePopup: function() {
		C81[Xc$][JAaF][POm](this);
		this.YWF.un("timechanged", this.PzY, this);
		this.YWF.un("dateclick", this.DRyu, this);
		this.YWF.un("drawdate", this.Abo, this)
	},
	within: function($) {
		if (Dmv(this.el, $.target)) return true;
		if (this.YWF[W05]($)) return true;
		return false
	},
	__OnPopupKeyDown: function($) {
		if ($.keyCode == 13) this.DRyu();
		if ($.keyCode == 27) {
			this[JAaF]();
			this.focus()
		}
	},
	Abo: function($) {
		this.fire("drawdate", $)
	},
	DRyu: function(A) {
		var _ = this.YWF.getValue(),
		$ = this.getFormValue();
		this[G3S](_);
		if ($ !== this.getFormValue()) this.GdW();
		this.focus();
		this[JAaF]()
	},
	PzY: function(_) {
		var $ = this.YWF.getValue();
		this[G3S]($);
		this.GdW()
	},
	setFormat: function($) {
		if (typeof $ != "string") return;
		if (this.format != $) {
			this.format = $;
			this.H4.value = this.G5.value = this.getFormValue()
		}
	},
	setValue: function($) {
		$ = mini.parseDate($);
		if (mini.isNull($)) $ = "";
		if (mini.isDate($)) $ = new Date($.getTime());
		if (this.value != $) {
			this.value = $;
			this.H4.value = this.G5.value = this.getFormValue()
		}
	},
	getValue: function() {
		if (!mini.isDate(this.value)) return null;
		return this.value
	},
	getFormValue: function() {
		if (!mini.isDate(this.value)) return "";
		return mini.formatDate(this.value, this.format)
	},
	setViewDate: function($) {
		$ = mini.parseDate($);
		if (!mini.isDate($)) return;
		this.viewDate = $
	},
	getViewDate: function() {
		return this.YWF.getViewDate()
	},
	setShowTime: function($) {
		if (this.showTime != $) this.showTime = $
	},
	getShowTime: function() {
		return this.showTime
	},
	setTimeFormat: function($) {
		if (this.timeFormat != $) this.timeFormat = $
	},
	getTimeFormat: function() {
		return this.timeFormat
	},
	setShowTodayButton: function($) {
		this.showTodayButton = $
	},
	getShowTodayButton: function() {
		return this.showTodayButton
	},
	setShowClearButton: function($) {
		this.showClearButton = $
	},
	getShowClearButton: function() {
		return this.showClearButton
	},
	J9: function(B) {
		var A = this.H4.value,
		$ = mini.parseDate(A);
		if (!$ || isNaN($) || $.getFullYear() == 1970) $ = null;
		var _ = this.getFormValue();
		this[G3S]($);
		if ($ == null) this.H4.value = "";
		if (_ !== this.getFormValue()) this.GdW()
	},
	KiC: function(_) {
		this.fire("keydown", {
			htmlEvent: _
		});
		if (_.keyCode == 8 && (this[Ot]() || this.allowInput == false)) return false;
		if (_.keyCode == 9) {
			this[JAaF]();
			return
		}
		switch (_.keyCode) {
		case 27:
			if (this.isShowPopup()) _.stopPropagation();
			this[JAaF]();
			break;
		case 13:
			if (this.isShowPopup()) {
				_.preventDefault();
				_.stopPropagation();
				this[JAaF]()
			} else {
				this.J9(null);
				var $ = this;
				setTimeout(function() {
					$.fire("enter")
				},
				10)
			}
			break;
		case 37:
			break;
		case 38:
			_.preventDefault();
			break;
		case 39:
			break;
		case 40:
			_.preventDefault();
			this[Lvd]();
			break;
		default:
			break
		}
	},
	getAttrs: function($) {
		var _ = C81[Xc$][Z_s][POm](this, $);
		mini[Dm7Q]($, _, ["format", "viewDate", "timeFormat", "ondrawdate"]);
		mini[CW7m]($, _, ["showTime", "showTodayButton", "showClearButton"]);
		return _
	}
});
J9_$(C81, "datepicker");
G8i = function() {
	this.viewDate = new Date(),
	this.GmeI = [];
	G8i[Xc$][TYcW][POm](this)
};
Mup(G8i, DZV, {
	width: 220,
	height: 160,
	_clearBorder: false,
	viewDate: null,
	DXee: "",
	GmeI: [],
	multiSelect: false,
	firstDayOfWeek: 0,
	todayText: "Today",
	clearText: "Clear",
	okText: "OK",
	cancelText: "Cancel",
	daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
	format: "MMM,yyyy",
	timeFormat: "H:mm",
	showTime: false,
	currentTime: false,
	rows: 1,
	columns: 1,
	headerCls: "",
	bodyCls: "",
	footerCls: "",
	JmjX: "mini-calendar-today",
	EC4: "mini-calendar-weekend",
	JnFH: "mini-calendar-othermonth",
	WF: "mini-calendar-selected",
	showHeader: true,
	showFooter: true,
	showWeekNumber: false,
	showDaysHeader: true,
	showMonthButtons: true,
	showYearButtons: true,
	showTodayButton: true,
	showClearButton: true,
	isWeekend: function(_) {
		var $ = _.getDay();
		return $ == 0 || $ == 6
	},
	getFirstDateOfMonth: function($) {
		var $ = new Date($.getFullYear(), $.getMonth(), 1);
		return mini.getWeekStartDate($, this.firstDayOfWeek)
	},
	getShortWeek: function($) {
		return this.daysShort[$]
	},
	uiCls: "mini-calendar",
	_create: function() {
		var C = "<tr style=\"width:100%;\"><td style=\"width:100%;\"></td></tr>";
		C += "<tr ><td><div class=\"mini-calendar-footer\">" + "<span style=\"display:inline-block;\"><input name=\"time\" class=\"mini-timespinner\" style=\"width:60px\" format=\"" + this.timeFormat + "\"/>" + "<span class=\"mini-calendar-footerSpace\"></span></span>" + "<span class=\"mini-calendar-tadayButton\">" + this.todayText + "</span>" + "<span class=\"mini-calendar-footerSpace\"></span>" + "<span class=\"mini-calendar-clearButton\">" + this.clearText + "</span>" + "<a href=\"#\" class=\"mini-calendar-focus\" style=\"position:absolute;left:-10px;top:-10px;width:0px;height:0px;outline:none\" hideFocus></a>" + "</div></td></tr>";
		var A = "<table class=\"mini-calendar\" cellpadding=\"0\" cellspacing=\"0\">" + C + "</table>",
		_ = document.createElement("div");
		_.innerHTML = A;
		this.el = _.firstChild;
		var $ = this.el.getElementsByTagName("tr"),
		B = this.el.getElementsByTagName("td");
		this.Dh = B[0];
		this.NO3 = mini.byClass("mini-calendar-footer", this.el);
		this.timeWrapEl = this.NO3.childNodes[0];
		this.todayButtonEl = this.NO3.childNodes[1];
		this.footerSpaceEl = this.NO3.childNodes[2];
		this.closeButtonEl = this.NO3.childNodes[3];
		this._focusEl = this.NO3.lastChild;
		mini.parse(this.NO3);
		this.timeSpinner = mini.getbyName("time", this.el);
		this[WRl]()
	},
	focus: function() {
		try {
			this._focusEl.focus()
		} catch($) {}
	},
	destroy: function($) {
		this.Dh = this.NO3 = this.timeWrapEl = this.todayButtonEl = this.footerSpaceEl = this.closeButtonEl = null;
		G8i[Xc$][$Kt][POm](this, $)
	},
	_initEvents: function() {
		if (this.timeSpinner) this.timeSpinner.on("valuechanged", this.PzY, this);
		Xs(function() {
			VPoJ(this.el, "click", this.Vj6T, this);
			VPoJ(this.el, "mousedown", this.HG_, this);
			VPoJ(this.el, "keydown", this.GqHp, this)
		},
		this)
	},
	getDateEl: function($) {
		if (!$) return null;
		var _ = this.uid + "$" + mini.clearTime($).getTime();
		return document.getElementById(_)
	},
	within: function($) {
		if (Dmv(this.el, $.target)) return true;
		if (this.menuEl && Dmv(this.menuEl, $.target)) return true;
		return false
	},
	setShowClearButton: function($) {
		this.showClearButton = $;
		var _ = this.getButton("clear");
		if (_) this[WRl]()
	},
	getShowClearButton: function() {
		return this.showClearButton
	},
	setShowHeader: function($) {
		this.showHeader = $;
		this[WRl]()
	},
	getShowHeader: function() {
		return this.showHeader
	},
	setShowFooter: function($) {
		this[NCGk] = $;
		this[WRl]()
	},
	getShowFooter: function() {
		return this[NCGk]
	},
	setShowWeekNumber: function($) {
		this.showWeekNumber = $;
		this[WRl]()
	},
	getShowWeekNumber: function() {
		return this.showWeekNumber
	},
	setShowDaysHeader: function($) {
		this.showDaysHeader = $;
		this[WRl]()
	},
	getShowDaysHeader: function() {
		return this.showDaysHeader
	},
	setShowMonthButtons: function($) {
		this.showMonthButtons = $;
		this[WRl]()
	},
	getShowMonthButtons: function() {
		return this.showMonthButtons
	},
	setShowYearButtons: function($) {
		this.showYearButtons = $;
		this[WRl]()
	},
	getShowYearButtons: function() {
		return this.showYearButtons
	},
	setShowTodayButton: function($) {
		this.showTodayButton = $;
		this[WRl]()
	},
	getShowTodayButton: function() {
		return this.showTodayButton
	},
	setShowClearButton: function($) {
		this.showClearButton = $;
		this[WRl]()
	},
	getShowClearButton: function() {
		return this.showClearButton
	},
	setViewDate: function($) {
		if (!$) $ = new Date();
		if (mini.isDate($)) $ = new Date($.getTime());
		this.viewDate = $;
		this[WRl]()
	},
	getViewDate: function() {
		return this.viewDate
	},
	setSelectedDate: function($) {
		$ = mini.parseDate($);
		if (!mini.isDate($)) $ = "";
		else $ = new Date($.getTime());
		var _ = this.getDateEl(this.DXee);
		if (_) EhVe(_, this.WF);
		this.DXee = $;
		if (this.DXee) this.DXee = mini.cloneDate(this.DXee);
		_ = this.getDateEl(this.DXee);
		if (_) Rw(_, this.WF);
		this.fire("datechanged")
	},
	setSelectedDates: function($) {
		if (!mini.isArray($)) $ = [];
		this.GmeI = $;
		this[WRl]()
	},
	getSelectedDate: function() {
		return this.DXee ? this.DXee: ""
	},
	setTime: function($) {
		this.timeSpinner[G3S]($)
	},
	getTime: function() {
		return this.timeSpinner.getFormValue()
	},
	setValue: function($) {
		this.setSelectedDate($);
		this.setTime($)
	},
	getValue: function() {
		var $ = this.DXee;
		if ($) {
			$ = mini.clearTime($);
			if (this.showTime) {
				var _ = this.timeSpinner.getValue();
				$.setHours(_.getHours());
				$.setMinutes(_.getMinutes());
				$.setSeconds(_.getSeconds())
			}
		}
		return $ ? $: ""
	},
	getFormValue: function() {
		var $ = this.getValue();
		if ($) return mini.formatDate($, "yyyy-MM-dd HH:mm:ss");
		return ""
	},
	isSelectedDate: function($) {
		if (!$ || !this.DXee) return false;
		return mini.clearTime($).getTime() == mini.clearTime(this.DXee).getTime()
	},
	setMultiSelect: function($) {
		this[A0A] = $;
		this[WRl]()
	},
	getMultiSelect: function() {
		return this[A0A]
	},
	setRows: function($) {
		if (isNaN($)) return;
		if ($ < 1) $ = 1;
		this.rows = $;
		this[WRl]()
	},
	getRows: function() {
		return this.rows
	},
	setColumns: function($) {
		if (isNaN($)) return;
		if ($ < 1) $ = 1;
		this.columns = $;
		this[WRl]()
	},
	getColumns: function() {
		return this.columns
	},
	setShowTime: function($) {
		if (this.showTime != $) {
			this.showTime = $;
			this[QM]()
		}
	},
	getShowTime: function() {
		return this.showTime
	},
	setTimeFormat: function($) {
		if (this.timeFormat != $) {
			this.timeSpinner.setFormat($);
			this.timeFormat = this.timeSpinner.format
		}
	},
	getTimeFormat: function() {
		return this.timeFormat
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		this.timeWrapEl.style.display = this.showTime ? "": "none";
		this.todayButtonEl.style.display = this.showTodayButton ? "": "none";
		this.closeButtonEl.style.display = this.showClearButton ? "": "none";
		this.footerSpaceEl.style.display = (this.showClearButton && this.showTodayButton) ? "": "none";
		this.NO3.style.display = this[NCGk] ? "": "none";
		var _ = this.Dh.firstChild,
		$ = this[_Y1]();
		if (!$) {
			_.parentNode.style.height = "100px";
			h = jQuery(this.el).height();
			h -= jQuery(this.NO3).outerHeight();
			_.parentNode.style.height = h + "px"
		} else _.parentNode.style.height = "";
		mini.layout(this.NO3)
	},
	doUpdate: function() {
		if (!this.O7bE) return;
		var F = new Date(this.viewDate.getTime()),
		A = this.rows == 1 && this.columns == 1,
		B = 100 / this.rows,
		E = "<table class=\"mini-calendar-views\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
		for (var $ = 0,
		D = this.rows; $ < D; $++) {
			E += "<tr >";
			for (var C = 0,
			_ = this.columns; C < _; C++) {
				E += "<td style=\"height:" + B + "%\">";
				E += this.QtGu(F, $, C);
				E += "</td>";
				F = new Date(F.getFullYear(), F.getMonth() + 1, 1)
			}
			E += "</tr>"
		}
		E += "</table>";
		this.Dh.innerHTML = E;
		mini[RX](this.el);
		this[QM]()
	},
	QtGu: function(R, J, C) {
		var _ = R.getMonth(),
		F = this.getFirstDateOfMonth(R),
		K = new Date(F.getTime()),
		A = mini.clearTime(new Date()).getTime(),
		D = this.value ? mini.clearTime(this.value).getTime() : -1,
		N = this.rows > 1 || this.columns > 1,
		P = "";
		P += "<table class=\"mini-calendar-view\" border=\"0\" cellpadding=\"0\" cellspacing=\"0\">";
		if (this.showHeader) {
			P += "<tr ><td colSpan=\"10\" class=\"mini-calendar-header\"><div class=\"mini-calendar-headerInner\">";
			if (J == 0 && C == 0) {
				P += "<div class=\"mini-calendar-prev\">";
				if (this.showYearButtons) P += "<span class=\"mini-calendar-yearPrev\"></span>";
				if (this.showMonthButtons) P += "<span class=\"mini-calendar-monthPrev\"></span>";
				P += "</div>"
			}
			if (J == 0 && C == this.columns - 1) {
				P += "<div class=\"mini-calendar-next\">";
				if (this.showMonthButtons) P += "<span class=\"mini-calendar-monthNext\"></span>";
				if (this.showYearButtons) P += "<span class=\"mini-calendar-yearNext\"></span>";
				P += "</div>"
			}
			P += "<span class=\"mini-calendar-title\">" + mini.formatDate(R, this.format); + "</span>";
			P += "</div></td></tr>"
		}
		P += "<tr class=\"mini-calendar-daysheader\"><td class=\"mini-calendar-space\"></td>";
		if (this.showWeekNumber) P += "<td sclass=\"mini-calendar-weeknumber\"></td>";
		for (var L = this.firstDayOfWeek,
		B = L + 7; L < B; L++) {
			var O = this.getShortWeek(L);
			P += "<td valign=\"middle\">";
			P += O;
			P += "</td>";
			F = new Date(F.getFullYear(), F.getMonth(), F.getDate() + 1)
		}
		P += "<td class=\"mini-calendar-space\"></td></tr>";
		F = K;
		for (var H = 0; H <= 5; H++) {
			P += "<tr class=\"mini-calendar-days\"><td class=\"mini-calendar-space\"></td>";
			if (this.showWeekNumber) {
				var G = mini.getWeek(F.getFullYear(), F.getMonth() + 1, F.getDate());
				if (String(G).length == 1) G = "0" + G;
				P += "<td class=\"mini-calendar-weeknumber\" valign=\"middle\">" + G + "</td>"
			}
			for (L = this.firstDayOfWeek, B = L + 7; L < B; L++) {
				var M = this.isWeekend(F),
				I = mini.clearTime(F).getTime(),
				$ = I == A,
				E = this.isSelectedDate(F);
				if (_ != F.getMonth() && N) I = -1;
				var Q = this.TwB(F);
				P += "<td valign=\"middle\" id=\"";
				P += this.uid + "$" + I;
				P += "\" class=\"mini-calendar-date ";
				if (M) P += " mini-calendar-weekend ";
				if (Q[QS] == false) P += " mini-calendar-disabled ";
				if (_ != F.getMonth() && N);
				else {
					if (E) P += " " + this.WF + " ";
					if ($) P += " mini-calendar-today "
				}
				if (_ != F.getMonth()) P += " mini-calendar-othermonth ";
				P += "\">";
				if (_ != F.getMonth() && N);
				else P += Q.dateHtml;
				P += "</td>";
				F = new Date(F.getFullYear(), F.getMonth(), F.getDate() + 1)
			}
			P += "<td class=\"mini-calendar-space\"></td></tr>"
		}
		P += "<tr class=\"mini-calendar-bottom\" colSpan=\"10\"><td ></td></tr>";
		P += "</table>";
		return P
	},
	TwB: function($) {
		var _ = {
			date: $,
			dateCls: "",
			dateStyle: "",
			dateHtml: $.getDate(),
			allowSelect: true
		};
		this.fire("drawdate", _);
		return _
	},
	R32: function(_, $) {
		var A = {
			date: _,
			action: $
		};
		this.fire("dateclick", A);
		this.GdW()
	},
	menuEl: null,
	menuYear: null,
	menuSelectMonth: null,
	menuSelectYear: null,
	showMenu: function(_) {
		if (!_) return;
		this.hideMenu();
		this.menuYear = parseInt(this.viewDate.getFullYear() / 10) * 10;
		this.PTvelectMonth = this.viewDate.getMonth();
		this.PTvelectYear = this.viewDate.getFullYear();
		var A = "<div class=\"mini-calendar-menu\"></div>";
		this.menuEl = mini.append(document.body, A);
		this.updateMenu(this.viewDate);
		var $ = this.getBox();
		if (this.el.style.borderWidth == "0px") this.menuEl.style.border = "0";
		_cw(this.menuEl, $);
		VPoJ(this.menuEl, "click", this.UjmM, this);
		VPoJ(document, "mousedown", this.ZQim, this)
	},
	hideMenu: function() {
		if (this.menuEl) {
			Ri(this.menuEl, "click", this.UjmM, this);
			Ri(document, "mousedown", this.ZQim, this);
			jQuery(this.menuEl).remove();
			this.menuEl = null
		}
	},
	updateMenu: function() {
		var C = "<div class=\"mini-calendar-menu-months\">";
		for (var $ = 0,
		B = 12; $ < B; $++) {
			var _ = mini.getShortMonth($),
			A = "";
			if (this.PTvelectMonth == $) A = "mini-calendar-menu-selected";
			C += "<a id=\"" + $ + "\" class=\"mini-calendar-menu-month " + A + "\" href=\"javascript:void(0);\" hideFocus onclick=\"return false\">" + _ + "</a>"
		}
		C += "<div style=\"clear:both;\"></div></div>";
		C += "<div class=\"mini-calendar-menu-years\">";
		for ($ = this.menuYear, B = this.menuYear + 10; $ < B; $++) {
			_ = $,
			A = "";
			if (this.PTvelectYear == $) A = "mini-calendar-menu-selected";
			C += "<a id=\"" + $ + "\" class=\"mini-calendar-menu-year " + A + "\" href=\"javascript:void(0);\" hideFocus onclick=\"return false\">" + _ + "</a>"
		}
		C += "<div class=\"mini-calendar-menu-prevYear\"></div><div class=\"mini-calendar-menu-nextYear\"></div><div style=\"clear:both;\"></div></div>";
		C += "<div class=\"mini-calendar-footer\">" + "<span class=\"mini-calendar-okButton\">" + this.okText + "</span>" + "<span class=\"mini-calendar-footerSpace\"></span>" + "<span class=\"mini-calendar-cancelButton\">" + this.cancelText + "</span>" + "</div><div style=\"clear:both;\"></div>";
		this.menuEl.innerHTML = C
	},
	UjmM: function(C) {
		var _ = C.target,
		B = BD(_, "mini-calendar-menu-month"),
		$ = BD(_, "mini-calendar-menu-year");
		if (B) {
			this.PTvelectMonth = parseInt(B.id);
			this.updateMenu()
		} else if ($) {
			this.PTvelectYear = parseInt($.id);
			this.updateMenu()
		} else if (BD(_, "mini-calendar-menu-prevYear")) {
			this.menuYear = this.menuYear - 1;
			this.menuYear = parseInt(this.menuYear / 10) * 10;
			this.updateMenu()
		} else if (BD(_, "mini-calendar-menu-nextYear")) {
			this.menuYear = this.menuYear + 11;
			this.menuYear = parseInt(this.menuYear / 10) * 10;
			this.updateMenu()
		} else if (BD(_, "mini-calendar-okButton")) {
			var A = new Date(this.PTvelectYear, this.PTvelectMonth, 1);
			this.setViewDate(A);
			this.hideMenu()
		} else if (BD(_, "mini-calendar-cancelButton")) this.hideMenu()
	},
	ZQim: function($) {
		if (!BD($.target, "mini-calendar-menu")) this.hideMenu()
	},
	Vj6T: function(H) {
		var G = this.viewDate;
		if (this.enabled == false) return;
		var C = H.target,
		F = BD(H.target, "mini-calendar-title");
		if (BD(C, "mini-calendar-monthNext")) {
			G.setMonth(G.getMonth() + 1);
			this.setViewDate(G)
		} else if (BD(C, "mini-calendar-yearNext")) {
			G.setFullYear(G.getFullYear() + 1);
			this.setViewDate(G)
		} else if (BD(C, "mini-calendar-monthPrev")) {
			G.setMonth(G.getMonth() - 1);
			this.setViewDate(G)
		} else if (BD(C, "mini-calendar-yearPrev")) {
			G.setFullYear(G.getFullYear() - 1);
			this.setViewDate(G)
		} else if (BD(C, "mini-calendar-tadayButton")) {
			var _ = mini.clearTime(new Date());
			this.setViewDate(_);
			this.setSelectedDate(_);
			if (this.currentTime) {
				var $ = new Date();
				this.setTime($)
			}
			this.R32(_, "today")
		} else if (BD(C, "mini-calendar-clearButton")) {
			this.setSelectedDate(null);
			this.setTime(null);
			this.R32(null, "clear")
		} else if (F) this.showMenu(F);
		var E = BD(H.target, "mini-calendar-date");
		if (E && !Adi(E, "mini-calendar-disabled")) {
			var A = E.id.split("$"),
			B = parseInt(A[A.length - 1]);
			if (B == -1) return;
			var D = new Date(B);
			this.R32(D)
		}
	},
	HG_: function(C) {
		if (this.enabled == false) return;
		var B = BD(C.target, "mini-calendar-date");
		if (B && !Adi(B, "mini-calendar-disabled")) {
			var $ = B.id.split("$"),
			_ = parseInt($[$.length - 1]);
			if (_ == -1) return;
			var A = new Date(_);
			this.setSelectedDate(A)
		}
	},
	PzY: function($) {
		this.fire("timechanged");
		this.GdW()
	},
	GqHp: function(B) {
		if (this.enabled == false) return;
		var _ = this.getSelectedDate();
		if (!_) _ = new Date(this.viewDate.getTime());
		switch (B.keyCode) {
		case 27:
			break;
		case 13:
			break;
		case 37:
			_ = mini.addDate(_, -1, "D");
			break;
		case 38:
			_ = mini.addDate(_, -7, "D");
			break;
		case 39:
			_ = mini.addDate(_, 1, "D");
			break;
		case 40:
			_ = mini.addDate(_, 7, "D");
			break;
		default:
			break
		}
		var $ = this;
		if (_.getMonth() != $.viewDate.getMonth()) {
			$.setViewDate(mini.cloneDate(_));
			$.focus()
		}
		var A = this.getDateEl(_);
		if (A && Adi(A, "mini-calendar-disabled")) return;
		$.setSelectedDate(_);
		if (B.keyCode == 37 || B.keyCode == 38 || B.keyCode == 39 || B.keyCode == 40) B.preventDefault()
	},
	GdW: function() {
		this.fire("valuechanged")
	},
	getAttrs: function($) {
		var _ = G8i[Xc$][Z_s][POm](this, $);
		mini[Dm7Q]($, _, ["viewDate", "rows", "columns", "ondateclick", "ondrawdate", "ondatechanged", "timeFormat", "ontimechanged", "onvaluechanged"]);
		mini[CW7m]($, _, ["multiSelect", "showHeader", "showFooter", "showWeekNumber", "showDaysHeader", "showMonthButtons", "showYearButtons", "showTodayButton", "showClearButton", "showTime"]);
		return _
	}
});
J9_$(G8i, "calendar");
Zr = function() {
	Zr[Xc$][TYcW][POm](this)
};
Mup(Zr, UKsr, {
	formField: true,
	width: 200,
	columns: null,
	columnWidth: 80,
	showNullItem: false,
	nullText: "",
	showEmpty: false,
	emptyText: "",
	showCheckBox: false,
	showAllCheckBox: true,
	multiSelect: false,
	HO: "mini-listbox-item",
	EXy1: "mini-listbox-item-hover",
	_XA2: "mini-listbox-item-selected",
	uiCls: "mini-listbox",
	_create: function() {
		var $ = this.el = document.createElement("div");
		this.el.className = "mini-listbox";
		this.el.innerHTML = "<div class=\"mini-listbox-border\"><div class=\"mini-listbox-header\"></div><div class=\"mini-listbox-view\"></div><input type=\"hidden\"/></div><div class=\"mini-errorIcon\"></div>";
		this.$Ar = this.el.firstChild;
		this.U2N = this.$Ar.firstChild;
		this.PSU_ = this.$Ar.childNodes[1];
		this.G5 = this.$Ar.childNodes[2];
		this.AiOy = this.el.lastChild;
		this.LzI = this.PSU_
	},
	destroy: function($) {
		if (this.PSU_) {
			mini[Jhg](this.PSU_);
			this.PSU_ = null
		}
		this.$Ar = null;
		this.U2N = null;
		this.PSU_ = null;
		this.G5 = null;
		Zr[Xc$][$Kt][POm](this, $)
	},
	_initEvents: function() {
		Zr[Xc$][ZOZN][POm](this);
		Xs(function() {
			A4v(this.PSU_, "scroll", this._z8, this)
		},
		this)
	},
	destroy: function($) {
		if (this.PSU_) this.PSU_.onscroll = null;
		Zr[Xc$][$Kt][POm](this, $)
	},
	setColumns: function(_) {
		if (!mini.isArray(_)) _ = [];
		this.columns = _;
		for (var $ = 0,
		D = this.columns.length; $ < D; $++) {
			var B = this.columns[$];
			if (B.type) {
				if (!mini.isNull(B.header) && typeof B.header !== "function") if (B.header.trim() == "") delete B.header;
				var C = mini[Cye](B.type);
				if (C) {
					var E = mini.copyTo({},
					B);
					mini.copyTo(B, C);
					mini.copyTo(B, E)
				}
			}
			var A = parseInt(B.width);
			if (mini.isNumber(A) && String(A) == B.width) B.width = A + "px";
			if (mini.isNull(B.width)) B.width = this[_zL] + "px"
		}
		this[WRl]()
	},
	getColumns: function() {
		return this.columns
	},
	doUpdate: function() {
		if (this.O7bE === false) return;
		var S = this.columns && this.columns.length > 0;
		if (S) Rw(this.el, "mini-listbox-showColumns");
		else EhVe(this.el, "mini-listbox-showColumns");
		this.U2N.style.display = S ? "": "none";
		var I = [];
		if (S) {
			I[I.length] = "<table class=\"mini-listbox-headerInner\" cellspacing=\"0\" cellpadding=\"0\"><tr>";
			var D = this.uid + "$ck$all";
			I[I.length] = "<td class=\"mini-listbox-checkbox\"><input type=\"checkbox\" id=\"" + D + "\"></td>";
			for (var R = 0,
			_ = this.columns.length; R < _; R++) {
				var B = this.columns[R],
				E = B.header;
				if (mini.isNull(E)) E = "&nbsp;";
				var A = B.width;
				if (mini.isNumber(A)) A = A + "px";
				I[I.length] = "<td class=\"";
				if (B.headerCls) I[I.length] = B.headerCls;
				I[I.length] = "\" style=\"";
				if (B.headerStyle) I[I.length] = B.headerStyle + ";";
				if (A) I[I.length] = "width:" + A + ";";
				if (B.headerAlign) I[I.length] = "text-align:" + B.headerAlign + ";";
				I[I.length] = "\">";
				I[I.length] = E;
				I[I.length] = "</td>"
			}
			I[I.length] = "</tr></table>"
		}
		this.U2N.innerHTML = I.join("");
		var I = [],
		P = this.data;
		I[I.length] = "<table class=\"mini-listbox-items\" cellspacing=\"0\" cellpadding=\"0\">";
		if (this[Zl] && P.length == 0) I[I.length] = "<tr><td colspan=\"20\">" + this[Sa8] + "</td></tr>";
		else {
			this.O7vp();
			for (var K = 0,
			G = P.length; K < G; K++) {
				var $ = P[K],
				M = -1,
				O = " ",
				J = -1,
				N = " ";
				I[I.length] = "<tr id=\"";
				I[I.length] = this.Viv6(K);
				I[I.length] = "\" index=\"";
				I[I.length] = K;
				I[I.length] = "\" class=\"mini-listbox-item ";
				if ($.enabled === false) I[I.length] = " mini-disabled ";
				M = I.length;
				I[I.length] = O;
				I[I.length] = "\" style=\"";
				J = I.length;
				I[I.length] = N;
				I[I.length] = "\">";
				var H = this.ZIm(K),
				L = this.name,
				F = this[V3WP]($),
				C = "";
				if ($.enabled === false) C = "disabled";
				I[I.length] = "<td class=\"mini-listbox-checkbox\"><input " + C + " id=\"" + H + "\" type=\"checkbox\" ></td>";
				if (S) {
					for (R = 0, _ = this.columns.length; R < _; R++) {
						var B = this.columns[R],
						T = this.K5R($, K, B),
						A = B.width;
						if (typeof A == "number") A = A + "px";
						I[I.length] = "<td class=\"";
						if (T.cellCls) I[I.length] = T.cellCls;
						I[I.length] = "\" style=\"";
						if (T.cellStyle) I[I.length] = T.cellStyle + ";";
						if (A) I[I.length] = "width:" + A + ";";
						if (B.align) I[I.length] = "text-align:" + B.align + ";";
						I[I.length] = "\">";
						I[I.length] = T.cellHtml;
						I[I.length] = "</td>";
						if (T.rowCls) O = T.rowCls;
						if (T.rowStyle) N = T.rowStyle
					}
				} else {
					T = this.K5R($, K, null);
					I[I.length] = "<td class=\"";
					if (T.cellCls) I[I.length] = T.cellCls;
					I[I.length] = "\" style=\"";
					if (T.cellStyle) I[I.length] = T.cellStyle;
					I[I.length] = "\">";
					I[I.length] = T.cellHtml;
					I[I.length] = "</td>";
					if (T.rowCls) O = T.rowCls;
					if (T.rowStyle) N = T.rowStyle
				}
				I[M] = O;
				I[J] = N;
				I[I.length] = "</tr>"
			}
		}
		I[I.length] = "</table>";
		var Q = I.join("");
		this.PSU_.innerHTML = Q;
		this.NqM();
		this[QM]()
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		if (this.columns && this.columns.length > 0) Rw(this.el, "mini-listbox-showcolumns");
		else EhVe(this.el, "mini-listbox-showcolumns");
		if (this[Ql0]) EhVe(this.el, "mini-listbox-hideCheckBox");
		else Rw(this.el, "mini-listbox-hideCheckBox");
		var D = this.uid + "$ck$all",
		B = document.getElementById(D);
		if (B) B.style.display = this[JYn3] ? "": "none";
		var E = this[_Y1]();
		h = this[Ls](true);
		_ = this[Hy](true);
		var C = _,
		F = this.PSU_;
		F.style.width = _ + "px";
		if (!E) {
			var $ = J6(this.U2N);
			h = h - $;
			F.style.height = h + "px"
		} else F.style.height = "auto";
		if (isIE) {
			var A = this.U2N.firstChild,
			G = this.PSU_.firstChild;
			if (this.PSU_.offsetHeight >= this.PSU_.scrollHeight) {
				G.style.width = "100%";
				if (A) A.style.width = "100%"
			} else {
				var _ = parseInt(G.parentNode.offsetWidth - 17) + "px";
				G.style.width = _;
				if (A) A.style.width = _
			}
		}
		if (this.PSU_.offsetHeight < this.PSU_.scrollHeight) this.U2N.style.width = (C - 17) + "px";
		else this.U2N.style.width = "100%"
	},
	setShowCheckBox: function($) {
		this[Ql0] = $;
		this[QM]()
	},
	getShowCheckBox: function() {
		return this[Ql0]
	},
	setShowAllCheckBox: function($) {
		this[JYn3] = $;
		this[QM]()
	},
	getShowAllCheckBox: function() {
		return this[JYn3]
	},
	setShowNullItem: function($) {
		if (this.showNullItem != $) {
			this.showNullItem = $;
			this.O7vp();
			this[WRl]()
		}
	},
	getShowNullItem: function() {
		return this.showNullItem
	},
	O7vp: function() {
		for (var _ = 0,
		A = this.data.length; _ < A; _++) {
			var $ = this.data[_];
			if ($.__NullItem) {
				this.data.removeAt(_);
				break
			}
		}
		if (this.showNullItem) {
			$ = {
				__NullItem: true
			};
			$[this.textField] = this.nullText;
			$[this.valueField] = "";
			this.data.insert(0, $)
		}
	},
	removeAll: function() {
		var $ = this.getData();
		this.removeItems($)
	},
	addItems: function(_, $) {
		if (!mini.isArray(_)) return;
		if (mini.isNull($)) $ = this.data.length;
		this.data.insertRange($, _);
		this[WRl]()
	},
	addItem: function(_, $) {
		if (!_) return;
		if (this.data.indexOf(_) != -1) return;
		if (mini.isNull($)) $ = this.data.length;
		this.data.insert($, _);
		this[WRl]()
	},
	removeItems: function($) {
		if (!mini.isArray($)) return;
		this.data.removeRange($);
		this.Uc();
		this[WRl]()
	},
	removeItem: function(_) {
		var $ = this.data.indexOf(_);
		if ($ != -1) {
			this.data.removeAt($);
			this.Uc();
			this[WRl]()
		}
	},
	moveItem: function(_, $) {
		if (!_ || !mini.isNumber($)) return;
		if ($ < 0) $ = 0;
		if ($ > this.data.length) $ = this.data.length;
		this.data.remove(_);
		this.data.insert($, _);
		this[WRl]()
	},
	K5R: function(_, $, C) {
		var A = C ? _[C.field] : this[PTHV](_),
		D = {
			sender: this,
			index: $,
			rowIndex: $,
			record: _,
			item: _,
			column: C,
			field: C ? C.field: null,
			value: A,
			cellHtml: A,
			rowCls: null,
			cellCls: C ? (C.cellCls || "") : "",
			rowStyle: null,
			cellStyle: C ? (C.cellStyle || "") : ""
		};
		if (C) {
			if (C.dateFormat) if (mini.isDate(D.value)) D.cellHtml = mini.formatDate(A, C.dateFormat);
			else D.cellHtml = A;
			var B = C.renderer;
			if (B) {
				fn = typeof B == "function" ? B: window[B];
				if (fn) D.cellHtml = fn[POm](C, D)
			}
		}
		this.fire("drawcell", D);
		if (D.cellHtml === null || D.cellHtml === undefined || D.cellHtml === "") D.cellHtml = "&nbsp;";
		return D
	},
	_z8: function($) {
		this.U2N.scrollLeft = this.PSU_.scrollLeft
	},
	Vj6T: function(C) {
		var A = this.uid + "$ck$all";
		if (C.target.id == A) {
			var _ = document.getElementById(A);
			if (_) {
				var B = _.checked,
				$ = this.getValue();
				if (B) this.selectAll();
				else this[Can]();
				this.Ym6h();
				if ($ != this.getValue()) {
					this.GdW();
					this.fire("itemclick", {
						htmlEvent: C
					})
				}
			}
			return
		}
		this.NhB(C, "Click")
	},
	getAttrs: function(_) {
		var E = Zr[Xc$][Z_s][POm](this, _);
		mini[CW7m](_, E, ["showCheckBox", "showAllCheckBox", "showNullItem"]);
		if (_.nodeName.toLowerCase() != "select") {
			var C = mini[$Vy$](_);
			for (var $ = 0,
			D = C.length; $ < D; $++) {
				var B = C[$],
				A = jQuery(B).attr("property");
				if (!A) continue;
				A = A.toLowerCase();
				if (A == "columns") E.columns = mini._ParseColumns(B);
				else if (A == "data") E.data = B.innerHTML
			}
		}
		return E
	}
});
J9_$(Zr, "listbox");
Wme = function() {
	Wme[Xc$][TYcW][POm](this)
};
Mup(Wme, UKsr, {
	formField: true,
	multiSelect: true,
	repeatItems: 0,
	repeatLayout: "none",
	repeatDirection: "horizontal",
	HO: "mini-checkboxlist-item",
	EXy1: "mini-checkboxlist-item-hover",
	_XA2: "mini-checkboxlist-item-selected",
	DXR: "mini-checkboxlist-table",
	K4p: "mini-checkboxlist-td",
	I7L: "checkbox",
	uiCls: "mini-checkboxlist",
	_create: function() {
		var $ = this.el = document.createElement("div");
		this.el.className = this.uiCls;
		this.el.innerHTML = "<div class=\"mini-list-inner\"></div><div class=\"mini-errorIcon\"></div><input type=\"hidden\" />";
		this.Dh = this.el.firstChild;
		this.G5 = this.el.lastChild;
		this.AiOy = this.el.childNodes[1]
	},
	VK: function() {
		var B = [];
		if (this.repeatItems > 0) {
			if (this.repeatDirection == "horizontal") {
				var D = [];
				for (var C = 0,
				E = this.data.length; C < E; C++) {
					var A = this.data[C];
					if (D.length == this.repeatItems) {
						B.push(D);
						D = []
					}
					D.push(A)
				}
				B.push(D)
			} else {
				var _ = this.repeatItems > this.data.length ? this.data.length: this.repeatItems;
				for (C = 0, E = _; C < E; C++) B.push([]);
				for (C = 0, E = this.data.length; C < E; C++) {
					var A = this.data[C],
					$ = C % this.repeatItems;
					B[$].push(A)
				}
			}
		} else B = [this.data.clone()];
		return B
	},
	doUpdate: function() {
		var D = this.data,
		G = "";
		for (var A = 0,
		F = D.length; A < F; A++) {
			var _ = D[A];
			_._i = A
		}
		if (this.repeatLayout == "flow") {
			var $ = this.VK();
			for (A = 0, F = $.length; A < F; A++) {
				var C = $[A];
				for (var E = 0,
				B = C.length; E < B; E++) {
					_ = C[E];
					G += this.GBzY(_, _._i)
				}
				if (A != F - 1) G += "<br/>"
			}
		} else if (this.repeatLayout == "table") {
			$ = this.VK();
			G += "<table class=\"" + this.DXR + "\" cellpadding=\"0\" cellspacing=\"1\">";
			for (A = 0, F = $.length; A < F; A++) {
				C = $[A];
				G += "<tr>";
				for (E = 0, B = C.length; E < B; E++) {
					_ = C[E];
					G += "<td class=\"" + this.K4p + "\">";
					G += this.GBzY(_, _._i);
					G += "</td>"
				}
				G += "</tr>"
			}
			G += "</table>"
		} else for (A = 0, F = D.length; A < F; A++) {
			_ = D[A];
			G += this.GBzY(_, A)
		}
		this.Dh.innerHTML = G;
		for (A = 0, F = D.length; A < F; A++) {
			_ = D[A];
			delete _._i
		}
	},
	GBzY: function(_, $) {
		var F = this.TkJ(_, $),
		E = this.Viv6($),
		A = this.ZIm($),
		C = this[V3WP](_),
		B = "",
		D = "<div id=\"" + E + "\" index=\"" + $ + "\" class=\"" + this.HO + " ";
		if (_.enabled === false) {
			D += " mini-disabled ";
			B = "disabled"
		}
		D += F.itemCls + "\" style=\"" + F.itemStyle + "\"><input " + B + " value=\"" + C + "\" id=\"" + A + "\" type=\"" + this.I7L + "\" onclick=\"return false;\"/><label for=\"" + A + "\" onclick=\"return false;\">";
		D += F.itemHtml + "</label></div>";
		return D
	},
	TkJ: function(_, $) {
		var A = this[PTHV](_),
		B = {
			index: $,
			item: _,
			itemHtml: A,
			itemCls: "",
			itemStyle: ""
		};
		this.fire("drawitem", B);
		if (B.itemHtml === null || B.itemHtml === undefined) B.itemHtml = "";
		return B
	},
	setRepeatItems: function($) {
		$ = parseInt($);
		if (isNaN($)) $ = 0;
		if (this.repeatItems != $) {
			this.repeatItems = $;
			this[WRl]()
		}
	},
	getRepeatItems: function() {
		return this.repeatItems
	},
	setRepeatLayout: function($) {
		if ($ != "flow" && $ != "table") $ = "none";
		if (this.repeatLayout != $) {
			this.repeatLayout = $;
			this[WRl]()
		}
	},
	getRepeatLayout: function() {
		return this.repeatLayout
	},
	setRepeatDirection: function($) {
		if ($ != "vertical") $ = "horizontal";
		if (this.repeatDirection != $) {
			this.repeatDirection = $;
			this[WRl]()
		}
	},
	getRepeatDirection: function() {
		return this.repeatDirection
	},
	getAttrs: function(_) {
		var D = Wme[Xc$][Z_s][POm](this, _),
		C = jQuery(_),
		$ = parseInt(C.attr("repeatItems"));
		if (!isNaN($)) D.repeatItems = $;
		var B = C.attr("repeatLayout");
		if (B) D.repeatLayout = B;
		var A = C.attr("repeatDirection");
		if (A) D.repeatDirection = A;
		return D
	}
});
J9_$(Wme, "checkboxlist");
ME7 = function() {
	ME7[Xc$][TYcW][POm](this)
};
Mup(ME7, Wme, {
	multiSelect: false,
	HO: "mini-radiobuttonlist-item",
	EXy1: "mini-radiobuttonlist-item-hover",
	_XA2: "mini-radiobuttonlist-item-selected",
	DXR: "mini-radiobuttonlist-table",
	K4p: "mini-radiobuttonlist-td",
	I7L: "radio",
	uiCls: "mini-radiobuttonlist"
});
J9_$(ME7, "radiobuttonlist");
JUo = function() {
	this.data = [];
	JUo[Xc$][TYcW][POm](this)
};
Mup(JUo, Xpy, {
	text: "",
	value: "",
	valueField: "id",
	textField: "text",
	nodesField: "children",
	delimiter: ",",
	multiSelect: false,
	data: [],
	url: "",
	allowInput: false,
	showTreeIcon: false,
	showTreeLines: true,
	resultAsTree: false,
	parentField: "pid",
	checkRecursive: false,
	showFolderCheckBox: false,
	popupWidth: 200,
	popupMaxHeight: 250,
	popupMinWidth: 100,
	set: function(B) {
		if (typeof B == "string") return this;
		var $ = B.value;
		delete B.value;
		var _ = B.text;
		delete B.text;
		var C = B.url;
		delete B.url;
		var A = B.data;
		delete B.data;
		JUo[Xc$].set[POm](this, B);
		if (!mini.isNull(A)) this[Uq0](A);
		if (!mini.isNull(C)) this.setUrl(C);
		if (!mini.isNull($)) this[G3S]($);
		if (!mini.isNull(_)) this[HH](_);
		return this
	},
	uiCls: "mini-treeselect",
	MEA: function() {
		JUo[Xc$].MEA[POm](this);
		this.tree = new DaS();
		this.tree.setShowTreeIcon(true);
		this.tree.setStyle("border:0;width:100%;height:100%;");
		this.tree.setResultAsTree(this[Ajh]);
		this.tree[LV3H](this.popup._contentEl);
		this.tree.on("nodeclick", this.Qik, this);
		this.tree.on("nodecheck", this.W_G, this);
		this.tree.on("expand", this.EOtg, this);
		this.tree.on("collapse", this.JRp, this);
		this.tree.on("beforenodecheck", this.ZV5, this);
		this.tree.on("beforenodeselect", this.Ccg, this);
		this.tree.allowAnim = false
	},
	ZV5: function($) {
		$.tree = $.sender;
		this.fire("beforenodecheck", $)
	},
	Ccg: function($) {
		$.tree = $.sender;
		this.fire("beforenodeselect", $)
	},
	EOtg: function($) {
		this[Lvd]()
	},
	JRp: function($) {
		this[Lvd]()
	},
	showPopup: function() {
		this.tree[X7B7]("auto");
		var $ = this.popup.el.style.height;
		if ($ == "" || $ == "auto") this.tree[X7B7]("auto");
		else this.tree[X7B7]("100%");
		JUo[Xc$][Lvd][POm](this);
		this.tree[G3S](this.value)
	},
	NoS: function($) {
		this.tree.clearFilter();
		this.fire("hidepopup")
	},
	getItem: function($) {
		return typeof $ == "object" ? $: this.data[$]
	},
	indexOf: function($) {
		return this.data.indexOf($)
	},
	getAt: function($) {
		return this.data[$]
	},
	load: function($) {
		this.tree.load($)
	},
	setData: function($) {
		this.tree[Uq0]($);
		this.data = this.tree.data
	},
	getData: function() {
		return this.data
	},
	setUrl: function($) {
		this.getPopup();
		this.tree.setUrl($);
		this.url = this.tree.url
	},
	getUrl: function() {
		return this.url
	},
	setTextField: function($) {
		if (this.tree) this.tree.setTextField($);
		this[XsI] = $
	},
	getTextField: function() {
		return this[XsI]
	},
	setNodesField: function($) {
		if (this.tree) this.tree.setNodesField($);
		this.nodesField = $
	},
	getNodesField: function() {
		return this.nodesField
	},
	setValue: function($) {
		if (this.value != $) {
			var _ = this.tree.Ydy($);
			this.value = $;
			this.G5.value = $;
			if (_[1]) this.H4.value = _[1];
			this.KKv()
		}
	},
	setMultiSelect: function($) {
		if (this[A0A] != $) {
			this[A0A] = $;
			this.tree.setShowCheckBox($);
			this.tree.setAllowSelect(!$)
		}
	},
	getMultiSelect: function() {
		return this[A0A]
	},
	Qik: function(B) {
		if (this[A0A]) return;
		var _ = this.tree.getSelectedNode(),
		A = this.tree[V3WP](_),
		$ = this.getValue();
		this[G3S](A);
		if ($ != this.getValue()) this.GdW();
		this[JAaF]()
	},
	W_G: function(A) {
		if (!this[A0A]) return;
		var _ = this.tree.getValue(),
		$ = this.getValue();
		this[G3S](_);
		if ($ != this.getValue()) this.GdW()
	},
	KiC: function(_) {
		this.fire("keydown", {
			htmlEvent: _
		});
		if (_.keyCode == 8 && (this[Ot]() || this.allowInput == false)) return false;
		if (_.keyCode == 9) {
			this[JAaF]();
			return
		}
		switch (_.keyCode) {
		case 27:
			if (this.isShowPopup()) _.stopPropagation();
			this[JAaF]();
			break;
		case 13:
			break;
		case 37:
			break;
		case 38:
			_.preventDefault();
			break;
		case 39:
			break;
		case 40:
			_.preventDefault();
			this[Lvd]();
			break;
		default:
			var $ = this;
			setTimeout(function() {
				$.Ia6()
			},
			10);
			break
		}
	},
	Ia6: function() {
		var _ = this[XsI],
		$ = this.H4.value.toLowerCase();
		this.tree.filter(function(B) {
			var A = String(B[_] ? B[_] : "").toLowerCase();
			if (A.indexOf($) != -1) return true;
			else return false
		});
		this.tree.expandAll();
		this[Lvd]()
	},
	setCheckRecursive: function($) {
		this[OsXm] = $;
		if (this.tree) this.tree.setCheckRecursive($)
	},
	getCheckRecursive: function() {
		return this[OsXm]
	},
	setResultAsTree: function($) {
		this[Ajh] = $;
		if (this.tree) this.tree.setResultAsTree($)
	},
	getResultAsTree: function() {
		return this[Ajh]
	},
	setParentField: function($) {
		this[L_o] = $;
		if (this.tree) this.tree.setParentField($)
	},
	getParentField: function() {
		return this[L_o]
	},
	setValueField: function($) {
		if (this.tree) this.tree.setIdField($);
		this[KQP] = $
	},
	getValueField: function() {
		return this[KQP]
	},
	setShowTreeIcon: function($) {
		this[ZMpm] = $;
		if (this.tree) this.tree.setShowTreeIcon($)
	},
	getShowTreeIcon: function() {
		return this[ZMpm]
	},
	setShowTreeLines: function($) {
		this[QTS0] = $;
		if (this.tree) this.tree.setShowTreeLines($)
	},
	getShowTreeLines: function() {
		return this[QTS0]
	},
	setShowFolderCheckBox: function($) {
		this[Ky6] = $;
		if (this.tree) this.tree.setShowFolderCheckBox($)
	},
	getShowFolderCheckBox: function() {
		return this[Ky6]
	},
	getAttrs: function($) {
		var _ = JX[Xc$][Z_s][POm](this, $);
		mini[Dm7Q]($, _, ["url", "data", "textField", "valueField", "nodesField", "parentField", "onbeforenodecheck", "onbeforenodeselect"]);
		mini[CW7m]($, _, ["multiSelect", "resultAsTree", "checkRecursive", "showTreeIcon", "showTreeLines", "showFolderCheckBox"]);
		return _
	}
});
J9_$(JUo, "TreeSelect");
_e4o = function() {
	_e4o[Xc$][TYcW][POm](this);
	this[G3S](this[RyCH])
};
Mup(_e4o, JzO, {
	value: 0,
	minValue: 0,
	maxValue: 100,
	increment: 1,
	decimalPlaces: 0,
	set: function(_) {
		if (typeof _ == "string") return this;
		var $ = _.value;
		delete _.value;
		_e4o[Xc$].set[POm](this, _);
		if (!mini.isNull($)) this[G3S]($);
		return this
	},
	uiCls: "mini-spinner",
	LtHtml: function() {
		var $ = "onmouseover=\"Rw(this,'" + this.B76 + "');\" " + "onmouseout=\"EhVe(this,'" + this.B76 + "');\"";
		return "<span class=\"mini-buttonedit-button\" " + $ + "><span class=\"mini-buttonedit-up\"><span></span></span><span class=\"mini-buttonedit-down\"><span></span></span></span>"
	},
	_initEvents: function() {
		_e4o[Xc$][ZOZN][POm](this);
		Xs(function() {
			this.on("buttonmousedown", this._Mo, this);
			VPoJ(this.el, "mousewheel", this.HVW, this)
		},
		this)
	},
	MAYs: function() {
		if (this[RyCH] > this[Dk]) this[Dk] = this[RyCH] + 100;
		if (this.value < this[RyCH]) this[G3S](this[RyCH]);
		if (this.value > this[Dk]) this[G3S](this[Dk])
	},
	setValue: function($) {
		$ = parseFloat($);
		if (isNaN($)) $ = this[RyCH];
		$ = parseFloat($.toFixed(this[TdJm]));
		if (this.value != $) {
			this.value = $;
			this.MAYs();
			this.H4.value = this.G5.value = this.getFormValue()
		} else this.H4.value = this.getFormValue()
	},
	setMaxValue: function($) {
		$ = parseFloat($);
		if (isNaN($)) return;
		$ = parseFloat($.toFixed(this[TdJm]));
		if (this[Dk] != $) {
			this[Dk] = $;
			this.MAYs()
		}
	},
	getMaxValue: function($) {
		return this[Dk]
	},
	setMinValue: function($) {
		$ = parseFloat($);
		if (isNaN($)) return;
		$ = parseFloat($.toFixed(this[TdJm]));
		if (this[RyCH] != $) {
			this[RyCH] = $;
			this.MAYs()
		}
	},
	getMinValue: function($) {
		return this[RyCH]
	},
	setIncrement: function($) {
		$ = parseFloat($);
		if (isNaN($)) return;
		if (this[YHnB] != $) this[YHnB] = $
	},
	getIncrement: function($) {
		return this[YHnB]
	},
	setDecimalPlaces: function($) {
		$ = parseInt($);
		if (isNaN($) || $ < 0) return;
		this[TdJm] = $
	},
	getDecimalPlaces: function($) {
		return this[TdJm]
	},
	Urv: null,
	Sjs: function(D, B, C) {
		this.MCe2();
		this[G3S](this.value + D);
		var A = this,
		_ = C,
		$ = new Date();
		this.Urv = setInterval(function() {
			A[G3S](A.value + D);
			A.GdW();
			C--;
			if (C == 0 && B > 50) A.Sjs(D, B - 100, _ + 3);
			var E = new Date();
			if (E - $ > 500) A.MCe2();
			$ = E
		},
		B);
		VPoJ(document, "mouseup", this.ZXY, this)
	},
	MCe2: function() {
		clearInterval(this.Urv);
		this.Urv = null
	},
	_Mo: function($) {
		this._DownValue = this.getFormValue();
		if ($.spinType == "up") this.Sjs(this.increment, 230, 2);
		else this.Sjs( - this.increment, 230, 2)
	},
	KiC: function(_) {
		_e4o[Xc$].KiC[POm](this, _);
		var $ = mini.Keyboard;
		switch (_.keyCode) {
		case $.Top:
			this[G3S](this.value + this[YHnB]);
			this.GdW();
			break;
		case $.Bottom:
			this[G3S](this.value - this[YHnB]);
			this.GdW();
			break
		}
	},
	HVW: function(A) {
		if (this[Ot]()) return;
		var $ = A.wheelDelta;
		if (mini.isNull($)) $ = -A.detail * 24;
		var _ = this[YHnB];
		if ($ < 0) _ = -_;
		this[G3S](this.value + _);
		this.GdW();
		return false
	},
	ZXY: function($) {
		this.MCe2();
		Ri(document, "mouseup", this.ZXY, this);
		if (this._DownValue != this.getFormValue()) this.GdW()
	},
	J9: function(A) {
		var _ = this.getValue(),
		$ = parseFloat(this.H4.value);
		this[G3S]($);
		if (_ != this.getValue()) this.GdW()
	},
	getAttrs: function($) {
		var _ = _e4o[Xc$][Z_s][POm](this, $);
		mini[Dm7Q]($, _, ["minValue", "maxValue", "increment", "decimalPlaces"]);
		return _
	}
});
J9_$(_e4o, "spinner");
BW = function() {
	BW[Xc$][TYcW][POm](this);
	this[G3S]("00:00:00")
};
Mup(BW, JzO, {
	value: null,
	format: "H:mm:ss",
	uiCls: "mini-timespinner",
	LtHtml: function() {
		var $ = "onmouseover=\"Rw(this,'" + this.B76 + "');\" " + "onmouseout=\"EhVe(this,'" + this.B76 + "');\"";
		return "<span class=\"mini-buttonedit-button\" " + $ + "><span class=\"mini-buttonedit-up\"><span></span></span><span class=\"mini-buttonedit-down\"><span></span></span></span>"
	},
	_initEvents: function() {
		BW[Xc$][ZOZN][POm](this);
		Xs(function() {
			this.on("buttonmousedown", this._Mo, this);
			VPoJ(this.el, "mousewheel", this.HVW, this);
			VPoJ(this.H4, "keydown", this.GqHp, this)
		},
		this)
	},
	setFormat: function($) {
		if (typeof $ != "string") return;
		var _ = ["H:mm:ss", "HH:mm:ss", "H:mm", "HH:mm", "H", "HH", "mm:ss"];
		if (_.indexOf($) == -1) return;
		if (this.format != $) {
			this.format = $;
			this.H4.value = this.getFormattedValue()
		}
	},
	getFormat: function() {
		return this.format
	},
	setValue: function($) {
		$ = mini.parseTime($, this.format);
		if (!$) $ = mini.parseTime("00:00:00", this.format);
		if (mini.isDate($)) $ = new Date($.getTime());
		if (mini.formatDate(this.value, "H:mm:ss") != mini.formatDate($, "H:mm:ss")) {
			this.value = $;
			this.H4.value = this.getFormattedValue();
			this.G5.value = this.getFormValue()
		}
	},
	getValue: function() {
		return this.value == null ? null: new Date(this.value.getTime())
	},
	getFormValue: function() {
		if (!this.value) return "";
		return mini.formatDate(this.value, "H:mm:ss")
	},
	getFormattedValue: function() {
		if (!this.value) return "";
		return mini.formatDate(this.value, this.format)
	},
	CoQl: function(D, C) {
		var $ = this.getValue();
		if ($) switch (C) {
		case "hours":
			var A = $.getHours() + D;
			if (A > 23) A = 23;
			if (A < 0) A = 0;
			$.setHours(A);
			break;
		case "minutes":
			var B = $.getMinutes() + D;
			if (B > 59) B = 59;
			if (B < 0) B = 0;
			$.setMinutes(B);
			break;
		case "seconds":
			var _ = $.getSeconds() + D;
			if (_ > 59) _ = 59;
			if (_ < 0) _ = 0;
			$.setSeconds(_);
			break
		} else $ = "00:00:00";
		this[G3S]($)
	},
	Urv: null,
	Sjs: function(D, B, C) {
		this.MCe2();
		this.CoQl(D, this.XSG);
		var A = this,
		_ = C,
		$ = new Date();
		this.Urv = setInterval(function() {
			A.CoQl(D, A.XSG);
			C--;
			if (C == 0 && B > 50) A.Sjs(D, B - 100, _ + 3);
			var E = new Date();
			if (E - $ > 500) A.MCe2();
			$ = E
		},
		B);
		VPoJ(document, "mouseup", this.ZXY, this)
	},
	MCe2: function() {
		clearInterval(this.Urv);
		this.Urv = null
	},
	_Mo: function($) {
		this._DownValue = this.getFormValue();
		this.XSG = "hours";
		if ($.spinType == "up") this.Sjs(1, 230, 2);
		else this.Sjs( - 1, 230, 2)
	},
	ZXY: function($) {
		this.MCe2();
		Ri(document, "mouseup", this.ZXY, this);
		if (this._DownValue != this.getFormValue()) this.GdW()
	},
	J9: function(_) {
		var $ = this.getFormValue();
		this[G3S](this.H4.value);
		if ($ != this.getFormValue()) this.GdW()
	},
	getAttrs: function($) {
		var _ = BW[Xc$][Z_s][POm](this, $);
		mini[Dm7Q]($, _, ["format"]);
		return _
	}
});
J9_$(BW, "timespinner");
L7 = function() {
	L7[Xc$][TYcW][POm](this);
	this.on("validation", this.RV, this)
};
Mup(L7, JzO, {
	width: 180,
	buttonText: "\u6d4f\u89c8...",
	_buttonWidth: 56,
	limitType: "",
	limitTypeErrorText: "\u4e0a\u4f20\u6587\u4ef6\u683c\u5f0f\u4e3a\uff1a",
	allowInput: false,
	readOnly: true,
	JYd: 0,
	uiCls: "mini-htmlfile",
	_create: function() {
		L7[Xc$][JLTb][POm](this);
		this.WtmM = mini.append(this.el, "<input type=\"file\" hideFocus class=\"mini-htmlfile-file\" name=\"" + this.name + "\" ContentEditable=false/>");
		VPoJ(this.el, "mousemove", this.MAb, this);
		VPoJ(this.WtmM, "change", this.U1eV, this)
	},
	LtHtml: function() {
		var $ = "onmouseover=\"Rw(this,'" + this.B76 + "');\" " + "onmouseout=\"EhVe(this,'" + this.B76 + "');\"";
		return "<span class=\"mini-buttonedit-button\" " + $ + ">" + this.buttonText + "</span>"
	},
	U1eV: function($) {
		this.value = this.H4.value = this.WtmM.value;
		this.GdW()
	},
	MAb: function(B) {
		var A = B.pageX,
		_ = B.pageY,
		$ = Vrm(this.el);
		A = (A - $.x - 5);
		_ = (_ - $.y - 5);
		if (this.enabled == false) {
			A = -20;
			_ = -20
		}
		this.WtmM.style.left = A + "px";
		this.WtmM.style.top = _ + "px"
	},
	RV: function(B) {
		var A = B.value.split("."),
		$ = "*." + A[A.length - 1],
		_ = this.limitType.split(";");
		if (_.length > 0 && _.indexOf($) == -1) {
			B.errorText = this.limitTypeErrorText + this.limitType;
			B.isValid = false
		}
	},
	setName: function($) {
		this.name = $;
		mini.setAttr(this.WtmM, "name", this.name)
	},
	getValue: function() {
		return this.H4.value
	},
	setButtonText: function($) {
		this.buttonText = $
	},
	getButtonText: function() {
		return this.buttonText
	},
	setLimitType: function($) {
		this.limitType = $
	},
	getLimitType: function() {
		return this.limitType
	},
	getAttrs: function($) {
		var _ = L7[Xc$][Z_s][POm](this, $);
		mini[Dm7Q]($, _, ["limitType", "buttonText", "limitTypeErrorText"]);
		return _
	}
});
J9_$(L7, "htmlfile");
Hs = function($) {
	Hs[Xc$][TYcW][POm](this, $);
	this.on("validation", this.RV, this)
};
Mup(Hs, JzO, {
	width: 180,
	buttonText: "\u6d4f\u89c8...",
	_buttonWidth: 56,
	limitTypeErrorText: "\u4e0a\u4f20\u6587\u4ef6\u683c\u5f0f\u4e3a\uff1a",
	readOnly: true,
	JYd: 0,
	limitSize: "",
	limitType: "",
	typesDescription: "\u4e0a\u4f20\u6587\u4ef6\u683c\u5f0f",
	uploadLimit: 0,
	queueLimit: "",
	flashUrl: "",
	uploadUrl: "",
	uploadOnSelect: false,
	uiCls: "mini-fileupload",
	_create: function() {
		Hs[Xc$][JLTb][POm](this);
		Rw(this.el, "mini-htmlfile");
		this.WtmM = mini.append(this.el, "<span></span>");
		this.uploadEl = this.WtmM;
		VPoJ(this.el, "mousemove", this.MAb, this)
	},
	LtHtml: function() {
		var $ = "onmouseover=\"Rw(this,'" + this.B76 + "');\" " + "onmouseout=\"EhVe(this,'" + this.B76 + "');\"";
		return "<span class=\"mini-buttonedit-button\" " + $ + ">" + this.buttonText + "</span>"
	},
	destroy: function($) {
		if (this.Dh) {
			mini[Jhg](this.Dh);
			this.Dh = null
		}
		Hs[Xc$][$Kt][POm](this, $)
	},
	MAb: function(A) {
		var $ = this;
		if (this.enabled == false) return;
		if (!this.swfUpload) {
			var B = new SWFUpload({
				file_post_name: this.name,
				upload_url: $.uploadUrl,
				flash_url: $.flashUrl,
				file_size_limit: $.limitSize,
				file_types: $.limitType,
				file_types_description: $.typesDescription,
				file_upload_limit: parseInt($.uploadLimit),
				file_queue_limit: $.queueLimit,
				file_queued_handler: mini.createDelegate(this.__on_file_queued, this),
				upload_error_handler: mini.createDelegate(this.__on_upload_error, this),
				upload_success_handler: mini.createDelegate(this.__on_upload_success, this),
				upload_complete_handler: mini.createDelegate(this.__on_upload_complete, this),
				button_placeholder: $.uploadEl,
				button_width: 1000,
				button_height: 20,
				button_window_mode: "transparent",
				debug: false
			});
			B.flashReady();
			this.swfUpload = B;
			var _ = this.swfUpload.movieElement;
			_.style.zIndex = 1000;
			_.style.position = "absolute";
			_.style.left = "0px";
			_.style.top = "0px";
			_.style.width = "100%";
			_.style.height = "20px"
		}
	},
	setLimitSize: function($) {
		this.limitSize = $
	},
	setLimitType: function($) {
		this.limitType = $
	},
	setTypesDescription: function($) {
		this.typesDescription = $
	},
	setUploadLimit: function($) {
		this.uploadLimit = $
	},
	setQueueLimit: function($) {
		this.queueLimit = $
	},
	setFlashUrl: function($) {
		this.flashUrl = $
	},
	setUploadUrl: function($) {
		this.uploadUrl = $
	},
	setName: function($) {
		this.name = $
	},
	startUpload: function($) {
		if (this.swfUpload) this.swfUpload.startUpload()
	},
	__on_file_queued: function($) {
		if (this.uploadOnSelect) this.swfUpload.startUpload();
		this[HH]($.name)
	},
	__on_upload_success: function(_, $) {
		var A = {
			file: _,
			serverData: $
		};
		this.fire("uploadsuccess", A)
	},
	__on_upload_error: function($) {
		var _ = {
			file: $
		};
		this.fire("uploaderror", _)
	},
	__on_upload_complete: function($) {
		this.fire("uploadcomplete", $)
	},
	__fileError: function() {},
	getAttrs: function($) {
		var _ = Hs[Xc$][Z_s][POm](this, $);
		mini[Dm7Q]($, _, ["limitType", "limitSize", "flashUrl", "uploadUrl", "uploadLimit", "onuploadsuccess", "onuploaderror", "onuploadcomplete"]);
		mini[CW7m]($, _, ["uploadOnSelect"]);
		return _
	}
});
J9_$(Hs, "fileupload");
HMt = function() {
	this.data = [];
	HMt[Xc$][TYcW][POm](this);
	VPoJ(this.H4, "mouseup", this.UP5J, this)
};
Mup(HMt, Xpy, {
	allowInput: true,
	valueField: "id",
	textField: "text",
	delimiter: ",",
	multiSelect: false,
	data: [],
	grid: null,
	uiCls: "mini-lookup",
	destroy: function($) {
		if (this.grid) {
			this.grid.un("selectionchanged", this.Da8J, this);
			this.grid.un("load", this.Tfd, this);
			this.grid = null
		}
		HMt[Xc$][$Kt][POm](this, $)
	},
	setMultiSelect: function($) {
		this[A0A] = $;
		if (this.grid) this.grid.setMultiSelect($)
	},
	setGrid: function($) {
		if (typeof $ == "string") {
			mini.parse($);
			$ = mini.get($)
		}
		this.grid = mini.getAndCreate($);
		if (this.grid) {
			this.grid.setMultiSelect(this[A0A]);
			this.grid.setCheckSelectOnLoad(false);
			this.grid.on("selectionchanged", this.Da8J, this);
			this.grid.on("load", this.Tfd, this)
		}
	},
	getGrid: function() {
		return this.grid
	},
	setValueField: function($) {
		this[KQP] = $
	},
	getValueField: function() {
		return this[KQP]
	},
	setTextField: function($) {
		this[XsI] = $
	},
	getTextField: function() {
		return this[XsI]
	},
	getItemValue: function($) {
		return String($[this.valueField])
	},
	getItemText: function($) {
		var _ = $[this.textField];
		return mini.isNull(_) ? "": String(_)
	},
	Ydy: function(A) {
		if (mini.isNull(A)) A = [];
		var B = [],
		C = [];
		for (var _ = 0,
		D = A.length; _ < D; _++) {
			var $ = A[_];
			if ($) {
				B.push(this[V3WP]($));
				C.push(this[PTHV]($))
			}
		}
		return [B.join(this.delimiter), C.join(this.delimiter)]
	},
	OiYH: function(A) {
		var D = {};
		for (var $ = 0,
		B = A.length; $ < B; $++) {
			var _ = A[$],
			C = _[this.valueField];
			D[C] = _
		}
		return D
	},
	Da8J: function(G) {
		var B = this.OiYH(this.grid.getData()),
		C = this.OiYH(this.grid.getSelecteds()),
		F = this.OiYH(this.data);
		if (this[A0A] == false) {
			F = {};
			this.data = []
		}
		var A = {};
		for (var E in F) {
			var $ = F[E];
			if (B[E]) if (C[E]);
			else A[E] = $
		}
		for (var _ = this.data.length - 1; _ >= 0; _--) {
			$ = this.data[_],
			E = $[this.valueField];
			if (A[E]) this.data.removeAt(_)
		}
		for (E in C) {
			$ = C[E];
			if (!F[E]) this.data.push($)
		}
		var D = this.Ydy(this.data);
		this[G3S](D[0]);
		this[HH](D[1]);
		this.GdW()
	},
	Tfd: function(H) {
		var C = this.value.split(this.delimiter),
		F = {};
		for (var $ = 0,
		D = C.length; $ < D; $++) {
			var G = C[$];
			F[G] = 1
		}
		var A = this.grid.getData(),
		B = [];
		for ($ = 0, D = A.length; $ < D; $++) {
			var _ = A[$],
			E = _[this.valueField];
			if (F[E]) B.push(_)
		}
		this.grid[Lhu](B)
	},
	doUpdate: function() {
		HMt[Xc$][WRl][POm](this);
		this.H4[PrF] = true;
		this.el.style.cursor = "default"
	},
	KiC: function($) {
		HMt[Xc$].KiC[POm](this, $);
		switch ($.keyCode) {
		case 46:
		case 8:
			break;
		case 37:
			break;
		case 39:
			break
		}
	},
	UP5J: function(C) {
		if (this[Ot]()) return;
		var _ = mini.getSelectRange(this.H4),
		A = _[0],
		B = _[1],
		$ = this.YfC(A)
	},
	YfC: function(E) {
		var _ = -1;
		if (this.text == "") return _;
		var C = this.text.split(this.delimiter),
		$ = 0;
		for (var A = 0,
		D = C.length; A < D; A++) {
			var B = C[A];
			if ($ < E && E <= $ + B.length) {
				_ = A;
				break
			}
			$ = $ + B.length + 1
		}
		return _
	},
	getAttrs: function($) {
		var _ = HMt[Xc$][Z_s][POm](this, $);
		mini[Dm7Q]($, _, ["grid", "valueField", "textField"]);
		mini[CW7m]($, _, ["multiSelect"]);
		return _
	}
});
J9_$(HMt, "lookup");
XYy7 = function() {
	XYy7[Xc$][TYcW][POm](this);
	this.data = [];
	this[WRl]()
};
Mup(XYy7, _bO, {
	formField: true,
	value: "",
	text: "",
	valueField: "id",
	textField: "text",
	url: "",
	delay: 250,
	allowInput: true,
	editIndex: 0,
	$O$: "mini-textboxlist-focus",
	_4: "mini-textboxlist-item-hover",
	XSv: "mini-textboxlist-item-selected",
	HRM: "mini-textboxlist-close-hover",
	textName: "",
	setTextName: function($) {
		this.textName = $
	},
	getTextName: function() {
		return this.textName
	},
	uiCls: "mini-textboxlist",
	_create: function() {
		var A = "<table class=\"mini-textboxlist\" cellpadding=\"0\" cellspacing=\"0\"><tr ><td class=\"mini-textboxlist-border\"><ul></ul><a href=\"#\"></a><input type=\"hidden\"/></td></tr></table>",
		_ = document.createElement("div");
		_.innerHTML = A;
		this.el = _.firstChild;
		var $ = this.el.getElementsByTagName("td")[0];
		this.ulEl = $.firstChild;
		this.G5 = $.lastChild;
		this.focusEl = $.childNodes[1]
	},
	destroy: function($) {
		if (this.isShowPopup) this[JAaF]();
		Ri(document, "mousedown", this.Zq_, this);
		XYy7[Xc$][$Kt][POm](this, $)
	},
	_initEvents: function() {
		XYy7[Xc$][ZOZN][POm](this);
		VPoJ(this.el, "mousemove", this.MAb, this);
		VPoJ(this.el, "mouseout", this.XKd, this);
		VPoJ(this.el, "mousedown", this.HG_, this);
		VPoJ(this.el, "click", this.Vj6T, this);
		VPoJ(this.el, "keydown", this.GqHp, this);
		VPoJ(document, "mousedown", this.Zq_, this)
	},
	Zq_: function($) {
		if (this[Ot]()) return false;
		if (this.isShowPopup) if (!Dmv(this.popup.el, $.target)) this[JAaF]();
		if (this.EEGT) if (this[W05]($) == false) {
			this[MAi](null, false);
			this.showInput(false);
			this[TkP](this.$O$);
			this.EEGT = false
		}
	},
	errorIconEl: null,
	getErrorIconEl: function() {
		if (!this.AiOy) {
			var _ = this.el.rows[0],
			$ = _.insertCell(1);
			$.style.cssText = "width:18px;vertical-align:top;";
			$.innerHTML = "<div class=\"mini-errorIcon\"></div>";
			this.AiOy = $.firstChild
		}
		return this.AiOy
	},
	AJj: function() {
		if (this.AiOy) jQuery(this.AiOy.parentNode).remove();
		this.AiOy = null
	},
	doLayout: function() {
		if (this.canLayout() == false) return;
		XYy7[Xc$][QM][POm](this);
		if (this[Ot]() || this.allowInput == false) this.USE[PrF] = true;
		else this.USE[PrF] = false
	},
	doUpdate: function() {
		if (this.F54f) clearInterval(this.F54f);
		if (this.USE) Ri(this.USE, "keydown", this.KiC, this);
		var G = [],
		F = this.uid;
		for (var A = 0,
		E = this.data.length; A < E; A++) {
			var _ = this.data[A],
			C = F + "$text$" + A,
			B = _[this.textField];
			if (mini.isNull(B)) B = "";
			G[G.length] = "<li id=\"" + C + "\" class=\"mini-textboxlist-item\">";
			G[G.length] = B;
			G[G.length] = "<span class=\"mini-textboxlist-close\"></span></li>"
		}
		var $ = F + "$input";
		G[G.length] = "<li id=\"" + $ + "\" class=\"mini-textboxlist-inputLi\"><input class=\"mini-textboxlist-input\" type=\"text\" autocomplete=\"off\"></li>";
		this.ulEl.innerHTML = G.join("");
		this.editIndex = this.data.length;
		if (this.editIndex < 0) this.editIndex = 0;
		this.inputLi = this.ulEl.lastChild;
		this.USE = this.inputLi.firstChild;
		VPoJ(this.USE, "keydown", this.KiC, this);
		var D = this;
		this.USE.onkeyup = function() {
			D.GmFC()
		};
		D.F54f = null;
		D.M8XB = D.USE.value;
		this.USE.onfocus = function() {
			D.F54f = setInterval(function() {
				if (D.M8XB != D.USE.value) {
					D.Pls();
					D.M8XB = D.USE.value
				}
			},
			10);
			D[Mr](D.$O$);
			D.EEGT = true
		};
		this.USE.onblur = function() {
			clearInterval(D.F54f)
		}
	},
	IS3: function(_) {
		var A = BD(_.target, "mini-textboxlist-item");
		if (A) {
			var $ = A.id.split("$"),
			B = $[$.length - 1];
			return this.data[B]
		}
	},
	getItem: function($) {
		if (typeof $ == "number") return this.data[$];
		if (typeof $ == "object") return $
	},
	getItemEl: function(_) {
		var $ = this.data.indexOf(_),
		A = this.uid + "$text$" + $;
		return document.getElementById(A)
	},
	hoverItem: function($, A) {
		this.blurItem();
		var _ = this.getItemEl($);
		Rw(_, this._4);
		if (A && Adi(A.target, "mini-textboxlist-close")) Rw(A.target, this.HRM)
	},
	blurItem: function() {
		var _ = this.data.length;
		for (var A = 0,
		C = _; A < C; A++) {
			var $ = this.data[A],
			B = this.getItemEl($);
			if (B) {
				EhVe(B, this._4);
				EhVe(B.lastChild, this.HRM)
			}
		}
	},
	showInput: function(A) {
		this[MAi](null);
		if (mini.isNumber(A)) this.editIndex = A;
		else this.editIndex = this.data.length;
		if (this.editIndex < 0) this.editIndex = 0;
		if (this.editIndex > this.data.length) this.editIndex = this.data.length;
		var B = this.inputLi;
		B.style.display = "block";
		if (mini.isNumber(A) && A < this.data.length) {
			var _ = this.data[A],
			$ = this.getItemEl(_);
			jQuery($).before(B)
		} else this.ulEl.appendChild(B);
		if (A !== false) setTimeout(function() {
			try {
				B.firstChild.focus();
				mini.selectRange(B.firstChild, 100)
			} catch($) {}
		},
		10);
		else {
			this.lastInputText = "";
			this.USE.value = ""
		}
		return B
	},
	select: function(_) {
		_ = this[SJA](_);
		if (this.HJ5N) {
			var $ = this.getItemEl(this.HJ5N);
			EhVe($, this.XSv)
		}
		this.HJ5N = _;
		if (this.HJ5N) {
			$ = this.getItemEl(this.HJ5N);
			Rw($, this.XSv)
		}
		var A = this;
		if (this.HJ5N) {
			this.focusEl.focus();
			var B = this;
			setTimeout(function() {
				try {
					B.focusEl.focus()
				} catch($) {}
			},
			50)
		}
		if (this.HJ5N) {
			A[Mr](A.$O$);
			A.EEGT = true
		}
	},
	F6: function() {
		var _ = this.VC_1[QN2](),
		$ = this.editIndex;
		if (_) {
			_ = mini.clone(_);
			this.insertItem($, _)
		}
	},
	insertItem: function(_, $) {
		this.data.insert(_, $);
		var B = this.getText(),
		A = this.getValue();
		this[G3S](A, false);
		this[HH](B, false);
		this.T$Y();
		this[WRl]();
		this.showInput(_ + 1);
		this.GdW()
	},
	removeItem: function(_) {
		if (!_) return;
		var $ = this.getItemEl(_);
		mini[NlM]($);
		this.data.remove(_);
		var B = this.getText(),
		A = this.getValue();
		this[G3S](A, false);
		this[HH](B, false);
		this.GdW()
	},
	T$Y: function() {
		var C = (this.text ? this.text: "").split(","),
		B = (this.value ? this.value: "").split(",");
		if (B[0] == "") B = [];
		var _ = B.length;
		this.data.length = _;
		for (var A = 0,
		D = _; A < D; A++) {
			var $ = this.data[A];
			if (!$) {
				$ = {};
				this.data[A] = $
			}
			$[this.textField] = !mini.isNull(C[A]) ? C[A] : "";
			$[this.valueField] = !mini.isNull(B[A]) ? B[A] : ""
		}
		this.value = this.getValue();
		this.text = this.getText()
	},
	getInputText: function() {
		return this.USE ? this.USE.value: ""
	},
	getText: function() {
		var C = [];
		for (var _ = 0,
		A = this.data.length; _ < A; _++) {
			var $ = this.data[_],
			B = $[this.textField];
			if (mini.isNull(B)) B = "";
			B = B.replace(",", "\uff0c");
			C.push(B)
		}
		return C.join(",")
	},
	getValue: function() {
		var B = [];
		for (var _ = 0,
		A = this.data.length; _ < A; _++) {
			var $ = this.data[_];
			B.push($[this.valueField])
		}
		return B.join(",")
	},
	setName: function($) {
		if (this.name != $) {
			this.name = $;
			this.G5.name = $
		}
	},
	setValue: function($) {
		if (mini.isNull($)) $ = "";
		if (this.value != $) {
			this.value = $;
			this.G5.value = $;
			this.T$Y();
			this[WRl]()
		}
	},
	setText: function($) {
		if (mini.isNull($)) $ = "";
		if (this.text !== $) {
			this.text = $;
			this.T$Y();
			this[WRl]()
		}
	},
	setValueField: function($) {
		this[KQP] = $
	},
	getValueField: function() {
		return this[KQP]
	},
	setTextField: function($) {
		this[XsI] = $
	},
	getTextField: function() {
		return this[XsI]
	},
	setAllowInput: function($) {
		this.allowInput = $;
		this[QM]()
	},
	getAllowInput: function() {
		return this.allowInput
	},
	setUrl: function($) {
		this.url = $
	},
	getUrl: function() {
		return this.url
	},
	setPopupHeight: function($) {
		this[L_h5] = $
	},
	getPopupHeight: function() {
		return this[L_h5]
	},
	setPopupMinHeight: function($) {
		this[ARjH] = $
	},
	getPopupMinHeight: function() {
		return this[ARjH]
	},
	setPopupMaxHeight: function($) {
		this[N9cK] = $
	},
	getPopupMaxHeight: function() {
		return this[N9cK]
	},
	GmFC: function() {
		if (this[S8B]() == false) return;
		var _ = this.getInputText(),
		B = mini.measureText(this.USE, _),
		$ = B.width > 20 ? B.width + 4 : 20,
		A = WDf(this.el, true);
		if ($ > A - 15) $ = A - 15;
		this.USE.style.width = $ + "px"
	},
	Pls: function(_) {
		var $ = this;
		setTimeout(function() {
			$.GmFC()
		},
		1);
		this[Lvd]("loading");
		this.XVMn();
		this._loading = true;
		this.delayTimer = setTimeout(function() {
			var _ = $.USE.value;
			$.Ia6()
		},
		this.delay)
	},
	Ia6: function() {
		if (this[S8B]() == false) return;
		var _ = this.getInputText(),
		A = this,
		$ = this.VC_1.getData(),
		B = {
			key: _,
			value: this.getValue(),
			text: this.getText()
		},
		C = this.url,
		E = typeof C == "function" ? C: window[C];
		if (typeof E == "function") C = E(this);
		if (!C) return;
		var D = {
			url: C,
			async: true,
			data: B,
			type: "GET",
			cache: false,
			dataType: "text",
			cancel: false
		};
		this.fire("beforeload", D);
		if (D.cancel) return;
		mini.copyTo(D, {
			success: function($) {
				var _ = mini.decode($);
				A.VC_1[Uq0](_);
				A[Lvd]();
				A.VC_1.Z1W(0, true);
				A.fire("load");
				A._loading = false;
				if (A._selectOnLoad) {
					A.__doSelectValue();
					A._selectOnLoad = null
				}
			},
			error: function($, B, _) {
				A[Lvd]("error")
			}
		});
		A.NWj = jQuery.ajax(D)
	},
	XVMn: function() {
		if (this.delayTimer) {
			clearTimeout(this.delayTimer);
			this.delayTimer = null
		}
		if (this.NWj) this.NWj.abort();
		this._loading = false
	},
	within: function($) {
		if (Dmv(this.el, $.target)) return true;
		if (this[Lvd] && this.popup && this.popup[W05]($)) return true;
		return false
	},
	popupLoadingText: "<span class='mini-textboxlist-popup-loading'>Loading...</span>",
	popupErrorText: "<span class='mini-textboxlist-popup-error'>Error</span>",
	popupEmptyText: "<span class='mini-textboxlist-popup-noresult'>No Result</span>",
	isShowPopup: false,
	popupHeight: "",
	popupMinHeight: 30,
	popupMaxHeight: 150,
	MEA: function() {
		if (!this.popup) {
			this.popup = new Zr();
			this.popup[Mr]("mini-textboxlist-popup");
			this.popup.setStyle("position:absolute;left:0;top:0;");
			this.popup[Zl] = true;
			this.popup[_FNO](this[KQP]);
			this.popup.setTextField(this[XsI]);
			this.popup[LV3H](document.body);
			this.popup.on("itemclick",
			function($) {
				this[JAaF]();
				this.F6()
			},
			this)
		}
		this.VC_1 = this.popup;
		return this.popup
	},
	showPopup: function($) {
		this.isShowPopup = true;
		var _ = this.MEA();
		_.el.style.zIndex = mini.getMaxZIndex();
		var B = this.VC_1;
		B[Sa8] = this.popupEmptyText;
		if ($ == "loading") {
			B[Sa8] = this.popupLoadingText;
			this.VC_1[Uq0]([])
		} else if ($ == "error") {
			B[Sa8] = this.popupLoadingText;
			this.VC_1[Uq0]([])
		}
		this.VC_1[WRl]();
		var A = this.getBox(),
		D = A.x,
		C = A.y + A.height;
		this.popup.el.style.display = "block";
		mini[UCK](_.el, -1000, -1000);
		this.popup[B26J](A.width);
		this.popup[X7B7](this[L_h5]);
		if (this.popup[Ls]() < this[ARjH]) this.popup[X7B7](this[ARjH]);
		if (this.popup[Ls]() > this[N9cK]) this.popup[X7B7](this[N9cK]);
		mini[UCK](_.el, D, C)
	},
	hidePopup: function() {
		this.isShowPopup = false;
		if (this.popup) this.popup.el.style.display = "none"
	},
	MAb: function(_) {
		if (this.enabled == false) return;
		var $ = this.IS3(_);
		if (!$) {
			this.blurItem();
			return
		}
		this.hoverItem($, _)
	},
	XKd: function($) {
		this.blurItem()
	},
	Vj6T: function(_) {
		if (this.enabled == false) return;
		var $ = this.IS3(_);
		if (!$) {
			if (BD(_.target, "mini-textboxlist-input"));
			else this.showInput();
			return
		}
		this.focusEl.focus();
		this[MAi]($);
		if (_ && Adi(_.target, "mini-textboxlist-close")) this.removeItem($)
	},
	GqHp: function(B) {
		if (this[Ot]() || this.allowInput == false) return false;
		var $ = this.data.indexOf(this.HJ5N),
		_ = this;
		function A() {
			var A = _.data[$];
			_.removeItem(A);
			A = _.data[$];
			if (!A) A = _.data[$ - 1];
			_[MAi](A);
			if (!A) _.showInput()
		}
		switch (B.keyCode) {
		case 8:
			B.preventDefault();
			A();
			break;
		case 37:
		case 38:
			this[MAi](null);
			this.showInput($);
			break;
		case 39:
		case 40:
			$ += 1;
			this[MAi](null);
			this.showInput($);
			break;
		case 46:
			A();
			break
		}
	},
	__doSelectValue: function() {
		var $ = this.VC_1.getFocusedItem();
		if ($) this.VC_1[_Fs]($);
		this.lastInputText = this.text;
		this[JAaF]();
		this.F6()
	},
	KiC: function(G) {
		this._selectOnLoad = null;
		if (this[Ot]() || this.allowInput == false) return false;
		G.stopPropagation();
		if (this[Ot]() || this.allowInput == false) return;
		var E = mini.getSelectRange(this.USE),
		B = E[0],
		D = E[1],
		F = this.USE.value.length,
		C = B == D && B == 0,
		A = B == D && D == F;
		if (this[Ot]() || this.allowInput == false) G.preventDefault();
		if (G.keyCode == 9) {
			this[JAaF]();
			return
		}
		if (G.keyCode == 16 || G.keyCode == 17 || G.keyCode == 18) return;
		switch (G.keyCode) {
		case 13:
			if (this.isShowPopup) {
				G.preventDefault();
				if (this._loading) {
					this._selectOnLoad = true;
					return
				}
				this.__doSelectValue()
			}
			break;
		case 27:
			G.preventDefault();
			this[JAaF]();
			break;
		case 8:
			if (C) G.preventDefault();
		case 37:
			if (C) if (this.isShowPopup) this[JAaF]();
			else if (this.editIndex > 0) {
				var _ = this.editIndex - 1;
				if (_ < 0) _ = 0;
				if (_ >= this.data.length) _ = this.data.length - 1;
				this.showInput(false);
				this[MAi](_)
			}
			break;
		case 39:
			if (A) if (this.isShowPopup) this[JAaF]();
			else if (this.editIndex <= this.data.length - 1) {
				_ = this.editIndex;
				this.showInput(false);
				this[MAi](_)
			}
			break;
		case 38:
			G.preventDefault();
			if (this.isShowPopup) {
				var _ = -1,
				$ = this.VC_1.getFocusedItem();
				if ($) _ = this.VC_1.indexOf($);
				_--;
				if (_ < 0) _ = 0;
				this.VC_1.Z1W(_, true)
			}
			break;
		case 40:
			G.preventDefault();
			if (this.isShowPopup) {
				_ = -1,
				$ = this.VC_1.getFocusedItem();
				if ($) _ = this.VC_1.indexOf($);
				_++;
				if (_ < 0) _ = 0;
				if (_ >= this.VC_1.getCount()) _ = this.VC_1.getCount() - 1;
				this.VC_1.Z1W(_, true)
			} else this.Pls(true);
			break;
		default:
			break
		}
	},
	focus: function() {
		try {
			this.USE.focus()
		} catch($) {}
	},
	blur: function() {
		try {
			this.USE.blur()
		} catch($) {}
	},
	getAttrs: function($) {
		var A = ZoD[Xc$][Z_s][POm](this, $),
		_ = jQuery($);
		mini[Dm7Q]($, A, ["value", "text", "valueField", "textField", "url", "popupHeight", "textName"]);
		mini[CW7m]($, A, ["allowInput"]);
		mini[_i]($, A, ["popupMinHeight", "popupMaxHeight"]);
		return A
	}
});
J9_$(XYy7, "textboxlist");
FzDH = function() {
	FzDH[Xc$][TYcW][POm](this);
	var $ = this;
	$.F54f = null;
	this.H4.onfocus = function() {
		$.M8XB = $.H4.value;
		$.F54f = setInterval(function() {
			if ($.M8XB != $.H4.value) {
				$.Nys();
				$.M8XB = $.H4.value;
				if ($.H4.value == "" && $.value != "") {
					$[G3S]("");
					$.GdW()
				}
			}
		},
		10)
	};
	this.H4.onblur = function() {
		clearInterval($.F54f);
		if (!$.isShowPopup()) if ($.M8XB != $.H4.value) if ($.H4.value == "" && $.value != "") {
			$[G3S]("");
			$.GdW()
		}
	};
	this._buttonEl.style.display = "none"
};
Mup(FzDH, JX, {
	url: "",
	allowInput: true,
	delay: 250,
	_buttonWidth: 0,
	uiCls: "mini-autocomplete",
	setUrl: function($) {
		this.url = $
	},
	setValue: function($) {
		if (this.value != $) {
			this.value = $;
			this.G5.value = this.value
		}
	},
	setText: function($) {
		if (this.text != $) {
			this.text = $;
			this.M8XB = $
		}
		this.H4.value = this.text
	},
	popupLoadingText: "<span class='mini-textboxlist-popup-loading'>Loading...</span>",
	popupErrorText: "<span class='mini-textboxlist-popup-error'>Error</span>",
	popupEmptyText: "<span class='mini-textboxlist-popup-noresult'>No Result</span>",
	showPopup: function($) {
		var _ = this.getPopup(),
		A = this.VC_1;
		A[Zl] = true;
		A[Sa8] = this.popupEmptyText;
		if ($ == "loading") {
			A[Sa8] = this.popupLoadingText;
			this.VC_1[Uq0]([])
		} else if ($ == "error") {
			A[Sa8] = this.popupLoadingText;
			this.VC_1[Uq0]([])
		}
		this.VC_1[WRl]();
		FzDH[Xc$][Lvd][POm](this)
	},
	KiC: function(C) {
		this.fire("keydown", {
			htmlEvent: C
		});
		if (C.keyCode == 8 && (this[Ot]() || this.allowInput == false)) return false;
		if (C.keyCode == 9) {
			this[JAaF]();
			return
		}
		switch (C.keyCode) {
		case 27:
			if (this.isShowPopup()) C.stopPropagation();
			this[JAaF]();
			break;
		case 13:
			if (this.isShowPopup()) {
				C.preventDefault();
				C.stopPropagation();
				var _ = this.VC_1.getFocusedIndex();
				if (_ != -1) {
					var $ = this.VC_1.getAt(_),
					B = this.VC_1.Ydy([$]),
					A = B[0];
					this[G3S](A);
					this[HH](B[1]);
					this.GdW();
					this[JAaF]()
				}
			} else this.fire("enter");
			break;
		case 37:
			break;
		case 38:
			_ = this.VC_1.getFocusedIndex();
			if (_ == -1) {
				_ = 0;
				if (!this[A0A]) {
					$ = this.VC_1.findItems(this.value)[0];
					if ($) _ = this.VC_1.indexOf($)
				}
			}
			if (this.isShowPopup()) if (!this[A0A]) {
				_ -= 1;
				if (_ < 0) _ = 0;
				this.VC_1.Z1W(_, true)
			}
			break;
		case 39:
			break;
		case 40:
			_ = this.VC_1.getFocusedIndex();
			if (this.isShowPopup()) {
				if (!this[A0A]) {
					_ += 1;
					if (_ > this.VC_1.getCount() - 1) _ = this.VC_1.getCount() - 1;
					this.VC_1.Z1W(_, true)
				}
			} else this.Nys(this.H4.value);
			break;
		default:
			this.Nys(this.H4.value);
			break
		}
	},
	Nys: function(_) {
		var $ = this;
		if (this._queryTimer) {
			clearTimeout(this._queryTimer);
			this._queryTimer = null
		}
		this._queryTimer = setTimeout(function() {
			var _ = $.H4.value;
			$.Ia6(_)
		},
		this.delay);
		this[Lvd]("loading")
	},
	Ia6: function($) {
		if (!this.url) return;
		if (this.NWj) this.NWj.abort();
		var _ = this;
		this.NWj = jQuery.ajax({
			url: this.url,
			data: {
				key: $
			},
			async: true,
			cache: false,
			dataType: "text",
			success: function($) {
				try {
					var A = mini.decode($)
				} catch(B) {
					throw new Error("autocomplete json is error")
				}
				_.VC_1[Uq0](A);
				_[Lvd]();
				_.VC_1.Z1W(0, true);
				_.fire("load")
			},
			error: function($, B, A) {
				_[Lvd]("error")
			}
		})
	},
	getAttrs: function($) {
		var A = FzDH[Xc$][Z_s][POm](this, $),
		_ = jQuery($);
		return A
	}
});
J9_$(FzDH, "autocomplete");
mini.Form = function($) {
	this.el = PBm($);
	if (!this.el) throw new Error("form element not null");
	mini.Form[Xc$][TYcW][POm](this)
};
Mup(mini.Form, QFL, {
	el: null,
	getFields: function() {
		if (!this.el) return [];
		var $ = mini.findControls(function($) {
			if (!$.el || $.formField != true) return false;
			if (Dmv(this.el, $.el)) return true;
			return false
		},
		this);
		return $
	},
	getFieldsMap: function() {
		var B = this.getFields(),
		A = {};
		for (var $ = 0,
		C = B.length; $ < C; $++) {
			var _ = B[$];
			if (_.name) A[_.name] = _
		}
		return A
	},
	getField: function($) {
		if (!this.el) return null;
		return mini.getbyName($, this.el)
	},
	getData: function(B) {
		var A = B ? "getFormValue": "getValue",
		$ = this.getFields(),
		D = {};
		for (var _ = 0,
		E = $.length; _ < E; _++) {
			var C = $[_],
			F = C[A];
			if (!F) continue;
			if (C.name) D[C.name] = F[POm](C);
			if (C.textName && C.getText) D[C.textName] = C.getText()
		}
		return D
	},
	setData: function(E, A) {
		if (typeof E != "object") E = {};
		var B = this.getFieldsMap();
		for (var C in B) {
			var _ = B[C];
			if (!_) continue;
			if (_[G3S]) {
				var D = E[C];
				if (D === undefined && A === false) continue;
				if (D === null) D = "";
				_[G3S](D)
			}
			if (_[HH] && _.textName) {
				var $ = E[_.textName] || "";
				_[HH]($)
			}
		}
	},
	reset: function() {
		var $ = this.getFields();
		for (var _ = 0,
		B = $.length; _ < B; _++) {
			var A = $[_];
			if (!A[G3S]) continue;
			A[G3S](A[Kr2H])
		}
		this.setIsValid(true)
	},
	clear: function() {
		var $ = this.getFields();
		for (var _ = 0,
		B = $.length; _ < B; _++) {
			var A = $[_];
			if (!A[G3S]) continue;
			A[G3S]("")
		}
		this.setIsValid(true)
	},
	validate: function(C) {
		var $ = this.getFields();
		for (var _ = 0,
		D = $.length; _ < D; _++) {
			var A = $[_];
			if (!A[$XOk]) continue;
			var B = A[$XOk]();
			if (B == false && C === false) break
		}
		return this.isValid()
	},
	setIsValid: function(B) {
		var $ = this.getFields();
		for (var _ = 0,
		C = $.length; _ < C; _++) {
			var A = $[_];
			if (!A.setIsValid) continue;
			A.setIsValid(B)
		}
	},
	isValid: function() {
		var $ = this.getFields();
		for (var _ = 0,
		B = $.length; _ < B; _++) {
			var A = $[_];
			if (!A.isValid) continue;
			if (A.isValid() == false) return false
		}
		return true
	},
	getErrorTexts: function() {
		var A = [],
		_ = this.getErrors();
		for (var $ = 0,
		C = _.length; $ < C; $++) {
			var B = _[$];
			A.push(B.errorText)
		}
		return A
	},
	getErrors: function() {
		var A = [],
		$ = this.getFields();
		for (var _ = 0,
		C = $.length; _ < C; _++) {
			var B = $[_];
			if (!B.isValid) continue;
			if (B.isValid() == false) A.push(B)
		}
		return A
	},
	mask: function($) {
		if (typeof $ == "string") $ = {
			html: $
		};
		$ = $ || {};
		$.el = this.el;
		if (!$.cls) $.cls = this.QEg;
		mini.mask($)
	},
	unmask: function() {
		mini.unmask(this.el)
	},
	QEg: "mini-mask-loading",
	loadingMsg: "\u6570\u636e\u52a0\u8f7d\u4e2d\uff0c\u8bf7\u7a0d\u540e...",
	loading: function($) {
		this.mask($ || this.loadingMsg)
	},
	YQy: function($) {
		this._changed = true
	},
	_changed: false,
	setChanged: function(A) {
		this._changed = A;
		var $ = form.getFields();
		for (var _ = 0,
		C = $.length; _ < C; _++) {
			var B = $[_];
			B.on("valuechanged", this.YQy, this)
		}
	},
	isChanged: function() {
		return this._changed
	},
	setEnabled: function(A) {
		var $ = form.getFields();
		for (var _ = 0,
		C = $.length; _ < C; _++) {
			var B = $[_];
			B.setEnabled(A)
		}
	}
});
L6Ez = function() {
	L6Ez[Xc$][TYcW][POm](this)
};
Mup(L6Ez, DZV, {
	style: "",
	_clearBorder: false,
	uiCls: "mini-fit",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "mini-fit";
		this.LLB = this.el
	},
	_initEvents: function() {},
	isFixedSize: function() {
		return false
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		var $ = this.el.parentNode,
		_ = mini[$Vy$]($);
		if ($ == document.body) this.el.style.height = "0px";
		var F = J6($, true);
		for (var E = 0,
		D = _.length; E < D; E++) {
			var C = _[E];
			if (C == this.el) continue;
			var G = $qPf(C, "position");
			if (G == "absolute" || G == "fixed") continue;
			var A = J6(C),
			I = UG(C);
			F = F - A - I.top - I.bottom
		}
		var H = Ps$(this.el),
		B = TNY(this.el),
		I = UG(this.el);
		F = F - I.top - I.bottom;
		if (jQuery.boxModel) F = F - B.top - B.bottom - H.top - H.bottom;
		if (F < 0) F = 0;
		this.el.style.height = F + "px";
		try {
			_ = mini[$Vy$](this.el);
			for (E = 0, D = _.length; E < D; E++) {
				C = _[E];
				mini.layout(C)
			}
		} catch(J) {}
	},
	set_bodyParent: function($) {
		if (!$) return;
		var _ = this.LLB,
		A = $;
		while (A.firstChild) {
			try {
				_.appendChild(A.firstChild)
			} catch(B) {}
		}
		this[QM]()
	},
	getAttrs: function($) {
		var _ = L6Ez[Xc$][Z_s][POm](this, $);
		_._bodyParent = $;
		return _
	}
});
J9_$(L6Ez, "fit");
P7 = function() {
	this.LCK();
	P7[Xc$][TYcW][POm](this);
	if (this.url) this.setUrl(this.url)
};
Mup(P7, DZV, {
	width: 250,
	title: "",
	iconCls: "",
	iconStyle: "",
	url: "",
	refreshOnExpand: false,
	maskOnLoad: true,
	showCollapseButton: false,
	showCloseButton: false,
	closeAction: "display",
	showHeader: true,
	showToolbar: false,
	showFooter: false,
	headerCls: "",
	headerStyle: "",
	bodyCls: "",
	bodyStyle: "",
	footerCls: "",
	footerStyle: "",
	toolbarCls: "",
	toolbarStyle: "",
	set: function(A) {
		if (typeof A == "string") return this;
		var _ = this.Bfj;
		this.Bfj = false;
		var C = A.toolbar;
		delete A.toolbar;
		var $ = A.footer;
		delete A.footer;
		var B = A.url;
		delete A.url;
		P7[Xc$].set[POm](this, A);
		if (C) this.setToolbar(C);
		if ($) this.setFooter($);
		if (B) this.setUrl(B);
		this.Bfj = _;
		this[QM]();
		return this
	},
	uiCls: "mini-panel",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "mini-panel";
		var _ = "<div class=\"mini-panel-border\">" + "<div class=\"mini-panel-header\" ><div class=\"mini-panel-header-inner\" ><span class=\"mini-panel-icon\"></span><div class=\"mini-panel-title\" ></div><div class=\"mini-tools\" ></div></div></div>" + "<div class=\"mini-panel-viewport\">" + "<div class=\"mini-panel-toolbar\"></div>" + "<div class=\"mini-panel-body\" ></div>" + "<div class=\"mini-panel-footer\"></div>" + "<div class=\"mini-panel-resizeGrid\"></div>" + "</div>" + "</div>";
		this.el.innerHTML = _;
		this.$Ar = this.el.firstChild;
		this.U2N = this.$Ar.firstChild;
		this.Hvo = this.$Ar.lastChild;
		this.Ehh = mini.byClass("mini-panel-toolbar", this.el);
		this.LLB = mini.byClass("mini-panel-body", this.el);
		this.NO3 = mini.byClass("mini-panel-footer", this.el);
		this.U8 = mini.byClass("mini-panel-resizeGrid", this.el);
		var $ = mini.byClass("mini-panel-header-inner", this.el);
		this.MvGu = mini.byClass("mini-panel-icon", this.el);
		this.Mee = mini.byClass("mini-panel-title", this.el);
		this.EJap = mini.byClass("mini-tools", this.el);
		MsRJ(this.LLB, this.bodyStyle);
		this[WRl]()
	},
	_initEvents: function() {
		Xs(function() {
			VPoJ(this.el, "click", this.Vj6T, this)
		},
		this)
	},
	doUpdate: function() {
		this.Mee.innerHTML = this.title;
		this.MvGu.style.display = (this.iconCls || this[QrZ]) ? "inline": "none";
		this.MvGu.className = "mini-panel-icon " + this.iconCls;
		MsRJ(this.MvGu, this[QrZ]);
		this.U2N.style.display = this.showHeader ? "": "none";
		this.Ehh.style.display = this[Plr] ? "": "none";
		this.NO3.style.display = this[NCGk] ? "": "none";
		var A = "";
		for (var $ = this.buttons.length - 1; $ >= 0; $--) {
			var _ = this.buttons[$];
			A += "<span id=\"" + $ + "\" class=\"" + _.cls + " " + (_.enabled ? "": "mini-disabled") + "\" style=\"" + _.style + ";" + (_.visible ? "": "display:none;") + "\"></span>"
		}
		this.EJap.innerHTML = A;
		this[QM]()
	},
	count: 1,
	doLayout: function() {
		if (!this.canLayout()) return;
		this.U8.style.display = this[Wpk] ? "": "none";
		this.LLB.style.height = "";
		this.LLB.style.width = "";
		this.U2N.style.width = "";
		this.Hvo.style.width = "";
		var F = this[_Y1](),
		C = this[Zf6](),
		_ = TNY(this.LLB),
		G = Ps$(this.LLB),
		J = UG(this.LLB),
		$ = this[Hy](true),
		E = $;
		$ = $ - J.left - J.right;
		if (jQuery.boxModel) $ = $ - _.left - _.right - G.left - G.right;
		if ($ < 0) $ = 0;
		this.LLB.style.width = $ + "px";
		$ = E;
		this.U2N.style.width = $ + "px";
		this.Ehh.style.width = $ + "px";
		this.NO3.style.width = "auto";
		if (!F) {
			var I = Ps$(this.$Ar),
			A = this[Ls](true),
			B = this.showHeader ? jQuery(this.U2N).outerHeight() : 0,
			D = this[Plr] ? jQuery(this.Ehh).outerHeight() : 0,
			H = this[NCGk] ? jQuery(this.NO3).outerHeight() : 0;
			this.Hvo.style.height = (A - B) + "px";
			A = A - B - D - H;
			if (jQuery.boxModel) A = A - _.top - _.bottom - G.top - G.bottom;
			A = A - J.top - J.bottom;
			if (A < 0) A = 0;
			this.LLB.style.height = A + "px"
		}
		mini.layout(this.$Ar)
	},
	setHeaderStyle: function($) {
		this.headerStyle = $;
		MsRJ(this.U2N, $);
		this[QM]()
	},
	getHeaderStyle: function() {
		return this.headerStyle
	},
	setBodyStyle: function($) {
		this.bodyStyle = $;
		MsRJ(this.LLB, $);
		this[QM]()
	},
	getBodyStyle: function() {
		return this.bodyStyle
	},
	setToolbarStyle: function($) {
		this.toolbarStyle = $;
		MsRJ(this.Ehh, $);
		this[QM]()
	},
	getToolbarStyle: function() {
		return this.toolbarStyle
	},
	setFooterStyle: function($) {
		this.footerStyle = $;
		MsRJ(this.NO3, $);
		this[QM]()
	},
	getFooterStyle: function() {
		return this.footerStyle
	},
	setHeaderCls: function($) {
		jQuery(this.U2N)[UTn](this.headerCls);
		jQuery(this.U2N)[X0R]($);
		this.headerCls = $;
		this[QM]()
	},
	getHeaderCls: function() {
		return this.headerCls
	},
	setBodyCls: function($) {
		jQuery(this.LLB)[UTn](this.bodyCls);
		jQuery(this.LLB)[X0R]($);
		this.bodyCls = $;
		this[QM]()
	},
	getBodyCls: function() {
		return this.bodyCls
	},
	setToolbarCls: function($) {
		jQuery(this.Ehh)[UTn](this.toolbarCls);
		jQuery(this.Ehh)[X0R]($);
		this.toolbarCls = $;
		this[QM]()
	},
	getToolbarCls: function() {
		return this.toolbarCls
	},
	setFooterCls: function($) {
		jQuery(this.NO3)[UTn](this.footerCls);
		jQuery(this.NO3)[X0R]($);
		this.footerCls = $;
		this[QM]()
	},
	getFooterCls: function() {
		return this.footerCls
	},
	setTitle: function($) {
		this.title = $;
		this[WRl]()
	},
	getTitle: function() {
		return this.title
	},
	setIconCls: function($) {
		this.iconCls = $;
		this[WRl]()
	},
	getIconCls: function() {
		return this.iconCls
	},
	setShowCloseButton: function($) {
		this[SVtU] = $;
		var _ = this.getButton("close");
		_.visible = $;
		if (_) this[WRl]()
	},
	getShowCloseButton: function() {
		return this[SVtU]
	},
	setCloseAction: function($) {
		this[E9w] = $
	},
	getCloseAction: function() {
		return this[E9w]
	},
	setShowCollapseButton: function($) {
		this[Bdk] = $;
		var _ = this.getButton("collapse");
		_.visible = $;
		if (_) this[WRl]()
	},
	getShowCollapseButton: function() {
		return this[Bdk]
	},
	setShowHeader: function($) {
		this.showHeader = $;
		this[WRl]()
	},
	getShowHeader: function() {
		return this.showHeader
	},
	setShowToolbar: function($) {
		this[Plr] = $;
		this[WRl]()
	},
	getShowToolbar: function() {
		return this[Plr]
	},
	setShowFooter: function($) {
		this[NCGk] = $;
		this[WRl]()
	},
	getShowFooter: function() {
		return this[NCGk]
	},
	Vj6T: function(A) {
		var $ = BD(A.target, "mini-tools");
		if ($) {
			var _ = this.getButton(parseInt(A.target.id));
			if (_) this.WsEp(_, A)
		}
	},
	WsEp: function(B, $) {
		var C = {
			button: B,
			index: this.buttons.indexOf(B),
			name: B.name.toLowerCase(),
			htmlEvent: $,
			cancel: false
		};
		this.fire("beforebuttonclick", C);
		try {
			if (C.name == "close" && this.PiZ4 && this.PiZ4.contentWindow) {
				var _ = true;
				if (this.PiZ4.contentWindow.CloseWindow) _ = this.PiZ4.contentWindow.CloseWindow("close");
				else if (this.PiZ4.contentWindow.CloseOwnerWindow) _ = this.PiZ4.contentWindow.CloseOwnerWindow("close");
				if (_ === false) C.cancel = true
			}
		} catch(A) {}
		if (C.cancel == true) return C;
		this.fire("buttonclick", C);
		if (C.name == "close") if (this[E9w] == "destroy") {
			this.__HideAction = "close";
			this[$Kt]()
		} else this.hide();
		if (C.name == "collapse") {
			this.toggle();
			if (this[S9Uy] && this.expanded && this.url) this.reload()
		}
		return C
	},
	onButtonClick: function(_, $) {
		this.on("buttonclick", _, $)
	},
	LCK: function() {
		this.buttons = [];
		var _ = this.createButton({
			name: "close",
			cls: "mini-tools-close",
			visible: this[SVtU]
		});
		this.buttons.push(_);
		var $ = this.createButton({
			name: "collapse",
			cls: "mini-tools-collapse",
			visible: this[Bdk]
		});
		this.buttons.push($)
	},
	createButton: function(_) {
		var $ = mini.copyTo({
			name: "",
			cls: "",
			style: "",
			visible: true,
			enabled: true,
			html: ""
		},
		_);
		return $
	},
	addButton: function(_, $) {
		if (typeof _ == "string") _ = {
			iconCls: _
		};
		_ = this.createButton(_);
		if (typeof $ != "number") $ = this.buttons.length;
		this.buttons.insert($, _);
		this[WRl]()
	},
	updateButton: function($, A) {
		var _ = this.getButton($);
		if (!_) return;
		mini.copyTo(_, A);
		this[WRl]()
	},
	removeButton: function($) {
		var _ = this.getButton($);
		if (!_) return;
		this.buttons.remove(_);
		this[WRl]()
	},
	getButton: function($) {
		if (typeof $ == "number") return this.buttons[$];
		else for (var _ = 0,
		A = this.buttons.length; _ < A; _++) {
			var B = this.buttons[_];
			if (B.name == $) return B
		}
	},
	destroy: function($) {
		this.FRpI();
		this.PiZ4 = null;
		this.Ehh = null;
		this.LLB = null;
		this.NO3 = null;
		P7[Xc$][$Kt][POm](this, $)
	},
	setBody: function(_) {
		if (!_) return;
		if (!mini.isArray(_)) _ = [_];
		for (var $ = 0,
		A = _.length; $ < A; $++) {
			var B = _[$];
			mini.append(this.LLB, B)
		}
		mini.parse(this.LLB);
		this[QM]()
	},
	set_bodyParent: function($) {},
	setToolbar: function(_) {
		if (!_) return;
		if (!mini.isArray(_)) _ = [_];
		for (var $ = 0,
		A = _.length; $ < A; $++) mini.append(this.Ehh, _[$]);
		mini.parse(this.Ehh);
		this[QM]()
	},
	setFooter: function(_) {
		if (!_) return;
		if (!mini.isArray(_)) _ = [_];
		for (var $ = 0,
		A = _.length; $ < A; $++) mini.append(this.NO3, _[$]);
		mini.parse(this.NO3);
		this[QM]()
	},
	getHeaderEl: function() {
		return this.U2N
	},
	getToolbarEl: function() {
		return this.Ehh
	},
	getBodyEl: function() {
		return this.LLB
	},
	getFooterEl: function() {
		return this.NO3
	},
	getIFrameEl: function($) {
		return this.PiZ4
	},
	Eb: function() {
		return this.LLB
	},
	FRpI: function($) {
		if (this.PiZ4) {
			var _ = this.PiZ4;
			_.src = "";
			if (_._ondestroy) _._ondestroy();
			try {
				this.PiZ4.parentNode.removeChild(this.PiZ4);
				this.PiZ4[NlM](true)
			} catch(A) {}
		}
		this.PiZ4 = null;
		try {
			CollectGarbage()
		} catch(B) {}
		if ($ === true) mini.removeChilds(this.LLB)
	},
	Enq: 80,
	LpO: function() {
		this.FRpI(true);
		var A = new Date(),
		$ = this;
		this.loadedUrl = this.url;
		if (this.maskOnLoad) this.loading();
		var _ = mini.createIFrame(this.url,
		function(_, C) {
			var B = (A - new Date()) + $.Enq;
			if (B < 0) B = 0;
			setTimeout(function() {
				$.unmask()
			},
			B);
			try {
				$.PiZ4.contentWindow.Owner = $.Owner;
				$.PiZ4.contentWindow.CloseOwnerWindow = function(_) {
					$.__HideAction = _;
					var A = true;
					if ($.__onDestroy) A = $.__onDestroy(_);
					if (A === false) return false;
					var B = {
						iframe: $.PiZ4,
						action: _
					};
					$.fire("unload", B);
					setTimeout(function() {
						$[$Kt]()
					},
					10)
				}
			} catch(D) {}
			if (C) {
				if ($.__onLoad) $.__onLoad();
				var D = {
					iframe: $.PiZ4
				};
				$.fire("load", D)
			}
		});
		this.LLB.appendChild(_);
		this.PiZ4 = _
	},
	load: function(_, $, A) {
		this.setUrl(_, $, A)
	},
	reload: function() {
		this.setUrl(this.url)
	},
	setUrl: function($, _, A) {
		this.url = $;
		this.__onLoad = _;
		this.__onDestroy = A;
		if (this.expanded) this.LpO()
	},
	getUrl: function() {
		return this.url
	},
	setRefreshOnExpand: function($) {
		this[S9Uy] = $
	},
	getRefreshOnExpand: function() {
		return this[S9Uy]
	},
	setMaskOnLoad: function($) {
		this.maskOnLoad = $
	},
	getMaskOnLoad: function($) {
		return this.maskOnLoad
	},
	expanded: true,
	setExpanded: function($) {
		if (this.expanded != $) {
			this.expanded = $;
			if (this.expanded) this.expand();
			else this.collapse()
		}
	},
	toggle: function() {
		if (this.expanded) this.collapse();
		else this.expand()
	},
	collapse: function() {
		this.expanded = false;
		this._height = this.el.style.height;
		this.el.style.height = "auto";
		this.Hvo.style.display = "none";
		Rw(this.el, "mini-panel-collapse");
		this[QM]()
	},
	expand: function() {
		this.expanded = true;
		this.el.style.height = this._height;
		this.Hvo.style.display = "block";
		delete this._height;
		EhVe(this.el, "mini-panel-collapse");
		if (this.url && this.url != this.loadedUrl) this.LpO();
		this[QM]()
	},
	getAttrs: function(_) {
		var D = P7[Xc$][Z_s][POm](this, _);
		mini[Dm7Q](_, D, ["title", "iconCls", "iconStyle", "headerCls", "headerStyle", "bodyCls", "bodyStyle", "footerCls", "footerStyle", "toolbarCls", "toolbarStyle", "footer", "toolbar", "url", "closeAction", "loadingMsg", "beforebuttonclick", "buttonclick", "load"]);
		mini[CW7m](_, D, ["allowResize", "showCloseButton", "showHeader", "showToolbar", "showFooter", "showCollapseButton", "refreshOnExpand", "maskOnLoad", "expanded"]);
		var C = mini[$Vy$](_, true);
		for (var $ = C.length - 1; $ >= 0; $--) {
			var B = C[$],
			A = jQuery(B).attr("property");
			if (!A) continue;
			A = A.toLowerCase();
			if (A == "toolbar") D.toolbar = B;
			else if (A == "footer") D.footer = B
		}
		D.body = C;
		return D
	}
});
J9_$(P7, "panel");
NBMP = function() {
	NBMP[Xc$][TYcW][POm](this);
	this[Mr]("mini-window");
	this[AYD](false);
	this.setAllowDrag(this.allowDrag);
	this.setAllowResize(this[Wpk])
};
Mup(NBMP, P7, {
	x: 0,
	y: 0,
	state: "restore",
	Ve$: "mini-window-drag",
	QUY: "mini-window-resize",
	allowDrag: true,
	allowResize: false,
	showCloseButton: true,
	showMaxButton: false,
	showMinButton: false,
	showCollapseButton: false,
	showModal: true,
	minWidth: 150,
	minHeight: 80,
	maxWidth: 2000,
	maxHeight: 2000,
	uiCls: "mini-window",
	_create: function() {
		NBMP[Xc$][JLTb][POm](this)
	},
	LCK: function() {
		this.buttons = [];
		var A = this.createButton({
			name: "close",
			cls: "mini-tools-close",
			visible: this[SVtU]
		});
		this.buttons.push(A);
		var B = this.createButton({
			name: "max",
			cls: "mini-tools-max",
			visible: this[MnY]
		});
		this.buttons.push(B);
		var _ = this.createButton({
			name: "min",
			cls: "mini-tools-min",
			visible: this[WsX8]
		});
		this.buttons.push(_);
		var $ = this.createButton({
			name: "collapse",
			cls: "mini-tools-collapse",
			visible: this[Bdk]
		});
		this.buttons.push($)
	},
	_initEvents: function() {
		NBMP[Xc$][ZOZN][POm](this);
		Xs(function() {
			VPoJ(this.el, "mouseover", this.Nv5, this);
			VPoJ(window, "resize", this.CPM, this);
			VPoJ(this.el, "mousedown", this.H3i, this)
		},
		this)
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		if (this.state == "max") {
			var $ = this.getParentBox();
			this.el.style.left = "0px";
			this.el.style.top = "0px";
			mini.setSize(this.el, $.width, $.height)
		}
		NBMP[Xc$][QM][POm](this);
		if (this.allowDrag) Rw(this.el, this.Ve$);
		if (this.state == "max") {
			this.U8.style.display = "none";
			EhVe(this.el, this.Ve$)
		}
		this.Np_()
	},
	Np_: function() {
		var A = this[PXb] && this[S8B]();
		if (!this.Fts) this.Fts = mini.append(document.body, "<div class=\"mini-modal\" style=\"display:none\"></div>");
		function $() {
			mini[RX](document.body);
			var _ = Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
			D = Math.max(document.body.scrollHeight, document.documentElement.scrollHeight),
			C = mini.getViewportBox(),
			B = C.height;
			if (B < D) B = D;
			var $ = C.width;
			if ($ < _) $ = _;
			this.Fts.style.display = A ? "block": "none";
			this.Fts.style.height = B + "px";
			this.Fts.style.width = $ + "px";
			this.Fts.style.zIndex = $qPf(this.el, "zIndex") - 1
		}
		if (A) {
			var _ = this;
			setTimeout(function() {
				_.Fts.style.display = "none";
				$[POm](_)
			},
			1)
		}
	},
	getParentBox: function() {
		var $ = mini.getViewportBox(),
		_ = this.EQg || document.body;
		if (_ != document.body) $ = Vrm(_);
		return $
	},
	setShowModal: function($) {
		this[PXb] = $
	},
	getShowModal: function() {
		return this[PXb]
	},
	setMinWidth: function($) {
		if (isNaN($)) return;
		this.minWidth = $
	},
	getMinWidth: function() {
		return this.minWidth
	},
	setMinHeight: function($) {
		if (isNaN($)) return;
		this.minHeight = $
	},
	getMinHeight: function() {
		return this.minHeight
	},
	setMaxWidth: function($) {
		if (isNaN($)) return;
		this.maxWidth = $
	},
	getMaxWidth: function() {
		return this.maxWidth
	},
	setMaxHeight: function($) {
		if (isNaN($)) return;
		this.maxHeight = $
	},
	getMaxHeight: function() {
		return this.maxHeight
	},
	setAllowDrag: function($) {
		this.allowDrag = $;
		EhVe(this.el, this.Ve$);
		if ($) Rw(this.el, this.Ve$)
	},
	getAllowDrag: function() {
		return this.allowDrag
	},
	setAllowResize: function($) {
		if (this[Wpk] != $) {
			this[Wpk] = $;
			this[QM]()
		}
	},
	getAllowResize: function() {
		return this[Wpk]
	},
	setShowMaxButton: function($) {
		this[MnY] = $;
		var _ = this.getButton("max");
		_.visible = $;
		if (_) this[WRl]()
	},
	getShowMaxButton: function() {
		return this[MnY]
	},
	setShowMinButton: function($) {
		this[WsX8] = $;
		var _ = this.getButton("min");
		_.visible = $;
		if (_) this[WRl]()
	},
	getShowMinButton: function() {
		return this[WsX8]
	},
	max: function() {
		this.state = "max";
		this.show();
		var $ = this.getButton("max");
		if ($) {
			$.cls = "mini-tools-restore";
			this[WRl]()
		}
	},
	restore: function() {
		this.state = "restore";
		this.show(this.x, this.y);
		var $ = this.getButton("max");
		if ($) {
			$.cls = "mini-tools-max";
			this[WRl]()
		}
	},
	containerEl: null,
	show: function(B, _) {
		this.Bfj = false;
		var A = this.EQg || document.body;
		if (!this.isRender() || this.el.parentNode != A) this[LV3H](A);
		this.el.style.zIndex = mini.getMaxZIndex();
		this.Tf(B, _);
		this.Bfj = true;
		this[AYD](true);
		if (this.state != "max") {
			var $ = Vrm(this.el);
			this.x = $.x;
			this.y = $.y
		}
		try {
			this.el.focus()
		} catch(C) {}
	},
	hide: function() {
		this[AYD](false);
		this.Np_()
	},
	CGd: function() {
		this.el.style.display = "";
		var $ = Vrm(this.el);
		if ($.width > this.maxWidth) {
			_ZS(this.el, this.maxWidth);
			$ = Vrm(this.el)
		}
		if ($.height > this.maxHeight) {
			M$(this.el, this.maxHeight);
			$ = Vrm(this.el)
		}
		if ($.width < this.minWidth) {
			_ZS(this.el, this.minWidth);
			$ = Vrm(this.el)
		}
		if ($.height < this.minHeight) {
			M$(this.el, this.minHeight);
			$ = Vrm(this.el)
		}
	},
	Tf: function(B, A) {
		var _ = this.getParentBox();
		if (this.state == "max") {
			if (!this._width) {
				var $ = Vrm(this.el);
				this._width = $.width;
				this._height = $.height;
				this.x = $.x;
				this.y = $.y
			}
		} else {
			if (mini.isNull(B)) B = "center";
			if (mini.isNull(A)) A = "middle";
			this.el.style.position = "absolute";
			this.el.style.left = "-2000px";
			this.el.style.top = "-2000px";
			this.el.style.display = "";
			if (this._width) {
				this[B26J](this._width);
				this[X7B7](this._height)
			}
			this.CGd();
			$ = Vrm(this.el);
			if (B == "left") B = 0;
			if (B == "center") B = _.width / 2 - $.width / 2;
			if (B == "right") B = _.width - $.width;
			if (A == "top") A = 0;
			if (A == "middle") A = _.y + _.height / 2 - $.height / 2;
			if (A == "bottom") A = _.height - $.height;
			if (B + $.width > _.right) B = _.right - $.width;
			if (A + $.height > _.bottom) A = _.bottom - $.height;
			if (B < 0) B = 0;
			if (A < 0) A = 0;
			this.el.style.display = "";
			mini.setX(this.el, B);
			mini.setY(this.el, A)
		}
		this[QM]()
	},
	WsEp: function(_, $) {
		var A = NBMP[Xc$].WsEp[POm](this, _, $);
		if (A.cancel == true) return A;
		if (A.name == "max") if (this.state == "max") this.restore();
		else this.max();
		return A
	},
	CPM: function($) {
		if (this.state == "max") this[QM]();
		this.Np_()
	},
	H3i: function(B) {
		var _ = this;
		if (this.state != "max" && this.allowDrag && Dmv(this.U2N, B.target) && !BD(B.target, "mini-tools")) {
			var _ = this,
			A = this.getBox(),
			$ = new mini.Drag({
				capture: false,
				onStart: function() {
					_.O$ = mini.append(document.body, "<div class=\"mini-resizer-mask\"></div>");
					_.FT6 = mini.append(document.body, "<div class=\"mini-drag-proxy\"></div>")
				},
				onMove: function(B) {
					var F = B.now[0] - B.init[0],
					E = B.now[1] - B.init[1];
					F = A.x + F;
					E = A.y + E;
					var D = _.getParentBox(),
					$ = F + A.width,
					C = E + A.height;
					if ($ > D.width) F = D.width - A.width;
					if (F < 0) F = 0;
					if (E < 0) E = 0;
					_.x = F;
					_.y = E;
					var G = {
						x: F,
						y: E,
						width: A.width,
						height: A.height
					};
					_cw(_.FT6, G)
				},
				onStop: function() {
					var $ = Vrm(_.FT6);
					_cw(_.el, $);
					jQuery(_.O$).remove();
					_.O$ = null;
					jQuery(_.FT6).remove();
					_.FT6 = null
				}
			});
			$.start(B)
		}
		if (Dmv(this.U8, B.target) && this[Wpk]) {
			$ = this.E6W();
			$.start(B)
		}
	},
	E6W: function() {
		if (!this._resizeDragger) this._resizeDragger = new mini.Drag({
			capture: true,
			onStart: mini.createDelegate(this.Zn, this),
			onMove: mini.createDelegate(this.Utfh, this),
			onStop: mini.createDelegate(this.OOu4, this)
		});
		return this._resizeDragger
	},
	Zn: function($) {
		this.proxy = mini.append(document.body, "<div class=\"mini-windiw-resizeProxy\"></div>");
		this.proxy.style.cursor = "se-resize";
		this.elBox = Vrm(this.el);
		_cw(this.proxy, this.elBox)
	},
	Utfh: function(A) {
		var C = A.now[0] - A.init[0],
		$ = A.now[1] - A.init[1],
		_ = this.elBox.width + C,
		B = this.elBox.height + $;
		if (_ < this.minWidth) _ = this.minWidth;
		if (B < this.minHeight) B = this.minHeight;
		if (_ > this.maxWidth) _ = this.maxWidth;
		if (B > this.maxHeight) B = this.maxHeight;
		mini.setSize(this.proxy, _, B)
	},
	OOu4: function($) {
		var _ = Vrm(this.proxy);
		jQuery(this.proxy).remove();
		this.proxy = null;
		this.elBox = null;
		this[B26J](_.width);
		this[X7B7](_.height);
		delete this._width;
		delete this._height
	},
	destroy: function($) {
		Ri(window, "resize", this.CPM, this);
		if (this.Fts) {
			jQuery(this.Fts).remove();
			this.Fts = null
		}
		if (this.shadowEl) {
			jQuery(this.shadowEl).remove();
			this.shadowEl = null
		}
		NBMP[Xc$][$Kt][POm](this, $)
	},
	getAttrs: function($) {
		var _ = NBMP[Xc$][Z_s][POm](this, $);
		mini[Dm7Q]($, _, ["modalStyle"]);
		mini[CW7m]($, _, ["showModal", "showShadow", "allowDrag", "allowResize", "showMaxButton", "showMinButton"]);
		mini[_i]($, _, ["minWidth", "minHeight", "maxWidth", "maxHeight"]);
		return _
	}
});
J9_$(NBMP, "window");
mini.MessageBox = {
	alertTitle: "\u63d0\u9192",
	confirmTitle: "\u786e\u8ba4",
	prompTitle: "\u8f93\u5165",
	prompMessage: "\u8bf7\u8f93\u5165\u5185\u5bb9\uff1a",
	buttonText: {
		ok: "\u786e\u5b9a",
		cancel: "\u53d6\u6d88",
		yes: "\u662f",
		no: "\u5426"
	},
	show: function(F) {
		F = mini.copyTo({
			width: "auto",
			height: "auto",
			showModal: true,
			minWidth: 150,
			maxWidth: 800,
			minHeight: 100,
			maxHeight: 350,
			title: "",
			titleIcon: "",
			iconCls: "",
			iconStyle: "",
			message: "",
			html: "",
			spaceStyle: "margin-right:15px",
			showCloseButton: true,
			buttons: null,
			buttonWidth: 55,
			callback: null
		},
		F);
		var I = F.callback,
		C = new NBMP();
		C.setBodyStyle("overflow:hidden");
		C.setShowModal(F[PXb]);
		C.setTitle(F.title || "");
		C.setIconCls(F.titleIcon);
		C.setShowCloseButton(F[SVtU]);
		var J = C.uid + "$table",
		N = C.uid + "$content",
		L = "<div class=\"" + F.iconCls + "\" style=\"" + F[QrZ] + "\"></div>",
		Q = "<table class=\"mini-messagebox-table\" id=\"" + J + "\" style=\"\" cellspacing=\"0\" cellpadding=\"0\"><tr><td>" + L + "</td><td id=\"" + N + "\" style=\"text-align:center;padding:8px;padding-left:0;\">" + (F.message || "") + "</td></tr></table>",
		_ = "<div class=\"mini-messagebox-content\"></div>" + "<div class=\"mini-messagebox-buttons\"></div>";
		C.LLB.innerHTML = _;
		var M = C.LLB.firstChild;
		if (F.html) {
			if (typeof F.html == "string") M.innerHTML = F.html;
			else if (mini.isElement(F.html)) M.appendChild(F.html)
		} else M.innerHTML = Q;
		C._Buttons = [];
		var P = C.LLB.lastChild;
		if (F.buttons && F.buttons.length > 0) {
			for (var H = 0,
			D = F.buttons.length; H < D; H++) {
				var E = F.buttons[H],
				K = mini.MessageBox.buttonText[E],
				$ = new LDc();
				$[HH](K);
				$[B26J](F.buttonWidth);
				$[LV3H](P);
				$.action = E;
				$.on("click",
				function(_) {
					var $ = _.sender;
					if (I) I($.action);
					mini.MessageBox.hide(C)
				});
				if (H != D - 1) $.setStyle(F.spaceStyle);
				C._Buttons.push($)
			}
		} else P.style.display = "none";
		C.setMinWidth(F.minWidth);
		C.setMinHeight(F.minHeight);
		C.setMaxWidth(F.maxWidth);
		C.setMaxHeight(F.maxHeight);
		C[B26J](F.width);
		C[X7B7](F.height);
		C.show();
		var A = C[Hy]();
		C[B26J](A);
		var B = document.getElementById(J);
		if (B) B.style.width = "100%";
		var G = document.getElementById(N);
		if (G) G.style.width = "100%";
		var O = C._Buttons[0];
		if (O) O.focus();
		else C.focus();
		C.on("beforebuttonclick",
		function($) {
			if (I) I("close");
			$.cancel = true;
			mini.MessageBox.hide(C)
		});
		VPoJ(C.el, "keydown",
		function($) {
			if ($.keyCode == 27) {
				if (I) I("close");
				$.cancel = true;
				mini.MessageBox.hide(C)
			}
		});
		return C.uid
	},
	hide: function(C) {
		if (!C) return;
		var _ = typeof C == "object" ? C: mini.getbyUID(C);
		if (!_) return;
		for (var $ = 0,
		A = _._Buttons.length; $ < A; $++) {
			var B = _._Buttons[$];
			B[$Kt]()
		}
		_._Buttons = null;
		_[$Kt]()
	},
	alert: function(A, _, $) {
		return mini.MessageBox.show({
			minWidth: 250,
			title: _ || mini.MessageBox.alertTitle,
			buttons: ["ok"],
			message: A,
			iconCls: "mini-messagebox-warning",
			callback: $
		})
	},
	confirm: function(A, _, $) {
		return mini.MessageBox.show({
			minWidth: 250,
			title: _ || mini.MessageBox.confirmTitle,
			buttons: ["ok", "cancel"],
			message: A,
			iconCls: "mini-messagebox-question",
			callback: $
		})
	},
	prompt: function(C, B, A, _) {
		var F = "prompt$" + new Date().getTime(),
		E = C || mini.MessageBox.promptMessage;
		if (_) E = E + "<br/><textarea id=\"" + F + "\" style=\"width:200px;height:60px;margin-top:3px;\"></textarea>";
		else E = E + "<br/><input id=\"" + F + "\" type=\"text\" style=\"width:200px;margin-top:3px;\"/>";
		var D = mini.MessageBox.show({
			title: B || mini.MessageBox.promptTitle,
			buttons: ["ok", "cancel"],
			width: 250,
			html: "<div style=\"padding:5px;padding-left:10px;\">" + E + "</div>",
			callback: function(_) {
				var $ = document.getElementById(F);
				if (A) A(_, $.value)
			}
		}),
		$ = document.getElementById(F);
		$.focus();
		return D
	},
	loading: function(_, $) {
		return mini.MessageBox.show({
			minHeight: 50,
			title: $,
			showCloseButton: false,
			message: _,
			iconCls: "mini-messagebox-waiting"
		})
	}
};
mini.alert = mini.MessageBox.alert;
mini.confirm = mini.MessageBox.confirm;
mini.prompt = mini.MessageBox.prompt;
mini.loading = mini.MessageBox.loading;
mini.showMessageBox = mini.MessageBox.show;
mini.hideMessageBox = mini.MessageBox.hide;
Jgu = function() {
	this.CA0_();
	Jgu[Xc$][TYcW][POm](this)
};
Mup(Jgu, DZV, {
	width: 300,
	height: 180,
	vertical: false,
	allowResize: true,
	pane1: null,
	pane2: null,
	showHandleButton: true,
	handlerStyle: "",
	handlerCls: "",
	handlerSize: 6,
	uiCls: "mini-splitter",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "mini-splitter";
		this.el.innerHTML = "<div class=\"mini-splitter-border\"><div id=\"1\" class=\"mini-splitter-pane mini-splitter-pane1\"></div><div id=\"2\" class=\"mini-splitter-pane mini-splitter-pane2\"></div><div class=\"mini-splitter-handler\"></div></div>";
		this.$Ar = this.el.firstChild;
		this.CzY = this.$Ar.firstChild;
		this.R1E = this.$Ar.childNodes[1];
		this.LDN0 = this.$Ar.lastChild
	},
	_initEvents: function() {
		Xs(function() {
			VPoJ(this.el, "click", this.Vj6T, this);
			VPoJ(this.el, "mousedown", this.HG_, this)
		},
		this)
	},
	CA0_: function() {
		this.pane1 = {
			index: 1,
			minSize: 30,
			maxSize: 3000,
			size: "",
			showCollapseButton: false,
			cls: "",
			style: "",
			visible: true,
			expanded: true
		};
		this.pane2 = mini.copyTo({},
		this.pane1);
		this.pane2.index = 2
	},
	doUpdate: function() {
		this[QM]()
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		this.LDN0.style.cursor = this[Wpk] ? "": "default";
		EhVe(this.el, "mini-splitter-vertical");
		if (this.vertical) Rw(this.el, "mini-splitter-vertical");
		EhVe(this.CzY, "mini-splitter-pane1-vertical");
		EhVe(this.R1E, "mini-splitter-pane2-vertical");
		if (this.vertical) {
			Rw(this.CzY, "mini-splitter-pane1-vertical");
			Rw(this.R1E, "mini-splitter-pane2-vertical")
		}
		EhVe(this.LDN0, "mini-splitter-handler-vertical");
		if (this.vertical) Rw(this.LDN0, "mini-splitter-handler-vertical");
		MsRJ(this.CzY, this.pane1.style);
		MsRJ(this.R1E, this.pane2.style);
		var B = this[Ls](true),
		_ = this[Hy](true);
		if (!jQuery.boxModel) {
			var Q = Ps$(this.$Ar);
			B = B + Q.top + Q.bottom;
			_ = _ + Q.left + Q.right
		}
		this.$Ar.style.width = _ + "px";
		this.$Ar.style.height = B + "px";
		var $ = this.CzY,
		C = this.R1E,
		G = jQuery($),
		I = jQuery(C);
		$.style.display = C.style.display = this.LDN0.style.display = "";
		var D = this[Q4M1];
		this.pane1.size = String(this.pane1.size);
		this.pane2.size = String(this.pane2.size);
		var F = parseFloat(this.pane1.size),
		H = parseFloat(this.pane2.size),
		O = isNaN(F),
		T = isNaN(H),
		N = !isNaN(F) && this.pane1.size.indexOf("%") != -1,
		R = !isNaN(H) && this.pane2.size.indexOf("%") != -1,
		J = !O && !N,
		M = !T && !R,
		P = this.vertical ? B - this[Q4M1] : _ - this[Q4M1],
		K = p2Size = 0;
		if (O || T) {
			if (O && T) {
				K = parseInt(P / 2);
				p2Size = P - K
			} else if (J) {
				K = F;
				p2Size = P - K
			} else if (N) {
				K = parseInt(P * F / 100);
				p2Size = P - K
			} else if (M) {
				p2Size = H;
				K = P - p2Size
			} else if (R) {
				p2Size = parseInt(P * H / 100);
				K = P - p2Size
			}
		} else if (N && M) {
			p2Size = H;
			K = P - p2Size
		} else if (J && R) {
			K = F;
			p2Size = P - K
		} else {
			var L = F + H;
			K = parseInt(P * F / L);
			p2Size = P - K
		}
		if (K > this.pane1.maxSize) {
			K = this.pane1.maxSize;
			p2Size = P - K
		}
		if (p2Size > this.pane2.maxSize) {
			p2Size = this.pane2.maxSize;
			K = P - p2Size
		}
		if (K < this.pane1.minSize) {
			K = this.pane1.minSize;
			p2Size = P - K
		}
		if (p2Size < this.pane2.minSize) {
			p2Size = this.pane2.minSize;
			K = P - p2Size
		}
		if (this.pane1.expanded == false) {
			p2Size = P;
			K = 0;
			$.style.display = "none"
		} else if (this.pane2.expanded == false) {
			K = P;
			p2Size = 0;
			C.style.display = "none"
		}
		if (this.pane1.visible == false) {
			p2Size = P + D;
			K = D = 0;
			$.style.display = "none";
			this.LDN0.style.display = "none"
		} else if (this.pane2.visible == false) {
			K = P + D;
			p2Size = D = 0;
			C.style.display = "none";
			this.LDN0.style.display = "none"
		}
		if (this.vertical) {
			_ZS($, _);
			_ZS(C, _);
			M$($, K);
			M$(C, p2Size);
			C.style.top = (K + D) + "px";
			this.LDN0.style.left = "0px";
			this.LDN0.style.top = K + "px";
			_ZS(this.LDN0, _);
			M$(this.LDN0, this[Q4M1]);
			$.style.left = "0px";
			C.style.left = "0px"
		} else {
			_ZS($, K);
			_ZS(C, p2Size);
			M$($, B);
			M$(C, B);
			C.style.left = (K + D) + "px";
			this.LDN0.style.top = "0px";
			this.LDN0.style.left = K + "px";
			_ZS(this.LDN0, this[Q4M1]);
			M$(this.LDN0, B);
			$.style.top = "0px";
			C.style.top = "0px"
		}
		var S = "<div class=\"mini-splitter-handler-buttons\">";
		if (!this.pane1.expanded || !this.pane2.expanded) {
			if (!this.pane1.expanded) {
				if (this.pane1[Bdk]) S += "<a id=\"1\" class=\"mini-splitter-pane2-button\"></a>"
			} else if (this.pane2[Bdk]) S += "<a id=\"2\" class=\"mini-splitter-pane1-button\"></a>"
		} else {
			if (this.pane1[Bdk]) S += "<a id=\"1\" class=\"mini-splitter-pane1-button\"></a>";
			if (this[Wpk]) if ((this.pane1[Bdk] && this.pane2[Bdk]) || (!this.pane1[Bdk] && !this.pane2[Bdk])) S += "<span class=\"mini-splitter-resize-button\"></span>";
			if (this.pane2[Bdk]) S += "<a id=\"2\" class=\"mini-splitter-pane2-button\"></a>"
		}
		S += "</div>";
		this.LDN0.innerHTML = S;
		var E = this.LDN0.firstChild;
		E.style.display = this.showHandleButton ? "": "none";
		var A = Vrm(E);
		if (this.vertical) E.style.marginLeft = -A.width / 2 + "px";
		else E.style.marginTop = -A.height / 2 + "px";
		if (!this.pane1.visible || !this.pane2.visible || !this.pane1.expanded || !this.pane2.expanded) Rw(this.LDN0, "mini-splitter-nodrag");
		else EhVe(this.LDN0, "mini-splitter-nodrag");
		mini.layout(this.$Ar)
	},
	getPaneBox: function($) {
		var _ = this.getPaneEl($);
		if (!_) return null;
		return Vrm(_)
	},
	getPane: function($) {
		if ($ == 1) return this.pane1;
		else if ($ == 2) return this.pane2;
		return $
	},
	setPanes: function(_) {
		if (!mini.isArray(_)) return;
		for (var $ = 0; $ < 2; $++) {
			var A = _[$];
			this.updatePane($ + 1, A)
		}
	},
	getPaneEl: function($) {
		if ($ == 1) return this.CzY;
		return this.R1E
	},
	updatePane: function(_, F) {
		var $ = this.getPane(_);
		if (!$) return;
		mini.copyTo($, F);
		var B = this.getPaneEl(_),
		C = $.body;
		delete $.body;
		if (C) {
			if (!mini.isArray(C)) C = [C];
			for (var A = 0,
			E = C.length; A < E; A++) mini.append(B, C[A])
		}
		if ($.bodyParent) {
			var D = $.bodyParent;
			while (D.firstChild) B.appendChild(D.firstChild)
		}
		delete $.bodyParent;
		this[WRl]()
	},
	setShowHandleButton: function($) {
		this.showHandleButton = $;
		this[WRl]()
	},
	getShowHandleButton: function($) {
		return this.showHandleButton
	},
	setVertical: function($) {
		this.vertical = $;
		this[WRl]()
	},
	getVertical: function() {
		return this.vertical
	},
	expandPane: function(_) {
		var $ = this.getPane(_);
		if (!$) return;
		$.expanded = true;
		this[WRl]()
	},
	collapsePane: function(_) {
		var $ = this.getPane(_);
		if (!$) return;
		$.expanded = false;
		var A = $ == this.pane1 ? this.pane2: this.pane1;
		if (A.expanded == false) {
			A.expanded = true;
			A.visible = true
		}
		this[WRl]()
	},
	togglePane: function(_) {
		var $ = this.getPane(_);
		if (!$) return;
		if ($.expanded) this.collapsePane($);
		else this.expandPane($)
	},
	showPane: function(_) {
		var $ = this.getPane(_);
		if (!$) return;
		$.visible = true;
		this[WRl]()
	},
	hidePane: function(_) {
		var $ = this.getPane(_);
		if (!$) return;
		$.visible = false;
		var A = $ == this.pane1 ? this.pane2: this.pane1;
		if (A.visible == false) {
			A.expanded = true;
			A.visible = true
		}
		this[WRl]()
	},
	setAllowResize: function($) {
		if (this[Wpk] != $) {
			this[Wpk] = $;
			this[QM]()
		}
	},
	getAllowResize: function() {
		return this[Wpk]
	},
	setHandlerSize: function($) {
		if (this[Q4M1] != $) {
			this[Q4M1] = $;
			this[QM]()
		}
	},
	getHandlerSize: function() {
		return this[Q4M1]
	},
	Vj6T: function(B) {
		var A = B.target;
		if (!Dmv(this.LDN0, A)) return;
		var _ = parseInt(A.id),
		$ = this.getPane(_),
		B = {
			pane: $,
			paneIndex: _,
			cancel: false
		};
		if ($.expanded) this.fire("beforecollapse", B);
		else this.fire("beforeexpand", B);
		if (B.cancel == true) return;
		if (A.className == "mini-splitter-pane1-button") this.togglePane(_);
		else if (A.className == "mini-splitter-pane2-button") this.togglePane(_)
	},
	WsEp: function($, _) {
		this.fire("buttonclick", {
			pane: $,
			index: this.pane1 == $ ? 1 : 2,
			htmlEvent: _
		})
	},
	onButtonClick: function(_, $) {
		this.on("buttonclick", _, $)
	},
	HG_: function(A) {
		var _ = A.target;
		if (!this[Wpk]) return;
		if (!this.pane1.visible || !this.pane2.visible || !this.pane1.expanded || !this.pane2.expanded) return;
		if (Dmv(this.LDN0, _)) if (_.className == "mini-splitter-pane1-button" || _.className == "mini-splitter-pane2-button");
		else {
			var $ = this.QKX$();
			$.start(A)
		}
	},
	QKX$: function() {
		if (!this.drag) this.drag = new mini.Drag({
			capture: true,
			onStart: mini.createDelegate(this.Zn, this),
			onMove: mini.createDelegate(this.Utfh, this),
			onStop: mini.createDelegate(this.OOu4, this)
		});
		return this.drag
	},
	Zn: function($) {
		this.O$ = mini.append(document.body, "<div class=\"mini-resizer-mask\"></div>");
		this.FT6 = mini.append(document.body, "<div class=\"mini-proxy\"></div>");
		this.FT6.style.cursor = this.vertical ? "n-resize": "w-resize";
		this.handlerBox = Vrm(this.LDN0);
		this.elBox = Vrm(this.$Ar, true);
		_cw(this.FT6, this.handlerBox)
	},
	Utfh: function(C) {
		if (!this.handlerBox) return;
		if (!this.elBox) this.elBox = Vrm(this.$Ar, true);
		var B = this.elBox.width,
		D = this.elBox.height,
		E = this[Q4M1],
		I = this.vertical ? D - this[Q4M1] : B - this[Q4M1],
		A = this.pane1.minSize,
		F = this.pane1.maxSize,
		$ = this.pane2.minSize,
		G = this.pane2.maxSize;
		if (this.vertical == true) {
			var _ = C.now[1] - C.init[1],
			H = this.handlerBox.y + _;
			if (H - this.elBox.y > F) H = this.elBox.y + F;
			if (H + this.handlerBox.height < this.elBox.bottom - G) H = this.elBox.bottom - G - this.handlerBox.height;
			if (H - this.elBox.y < A) H = this.elBox.y + A;
			if (H + this.handlerBox.height > this.elBox.bottom - $) H = this.elBox.bottom - $ - this.handlerBox.height;
			mini.setY(this.FT6, H)
		} else {
			var J = C.now[0] - C.init[0],
			K = this.handlerBox.x + J;
			if (K - this.elBox.x > F) K = this.elBox.x + F;
			if (K + this.handlerBox.width < this.elBox.right - G) K = this.elBox.right - G - this.handlerBox.width;
			if (K - this.elBox.x < A) K = this.elBox.x + A;
			if (K + this.handlerBox.width > this.elBox.right - $) K = this.elBox.right - $ - this.handlerBox.width;
			mini.setX(this.FT6, K)
		}
	},
	OOu4: function(_) {
		var $ = this.elBox.width,
		B = this.elBox.height,
		C = this[Q4M1],
		D = parseFloat(this.pane1.size),
		E = parseFloat(this.pane2.size),
		I = isNaN(D),
		N = isNaN(E),
		J = !isNaN(D) && this.pane1.size.indexOf("%") != -1,
		M = !isNaN(E) && this.pane2.size.indexOf("%") != -1,
		G = !I && !J,
		K = !N && !M,
		L = this.vertical ? B - this[Q4M1] : $ - this[Q4M1],
		A = Vrm(this.FT6),
		H = A.x - this.elBox.x,
		F = L - H;
		if (this.vertical) {
			H = A.y - this.elBox.y;
			F = L - H
		}
		if (I || N) {
			if (I && N) {
				D = parseFloat(H / L * 100).toFixed(1);
				this.pane1.size = D + "%"
			} else if (G) {
				D = H;
				this.pane1.size = D
			} else if (J) {
				D = parseFloat(H / L * 100).toFixed(1);
				this.pane1.size = D + "%"
			} else if (K) {
				E = F;
				this.pane2.size = E
			} else if (M) {
				E = parseFloat(F / L * 100).toFixed(1);
				this.pane2.size = E + "%"
			}
		} else if (J && K) this.pane2.size = F;
		else if (G && M) this.pane1.size = H;
		else {
			this.pane1.size = parseFloat(H / L * 100).toFixed(1);
			this.pane2.size = 100 - this.pane1.size
		}
		jQuery(this.FT6).remove();
		jQuery(this.O$).remove();
		this.O$ = null;
		this.FT6 = null;
		this.elBox = this.handlerBox = null;
		this[QM]()
	},
	getAttrs: function(B) {
		var G = Jgu[Xc$][Z_s][POm](this, B);
		mini[CW7m](B, G, ["allowResize", "vertical", "showHandleButton"]);
		mini[_i](B, G, ["handlerSize"]);
		var A = [],
		F = mini[$Vy$](B);
		for (var _ = 0,
		E = 2; _ < E; _++) {
			var C = F[_],
			D = jQuery(C),
			$ = {};
			A.push($);
			if (!C) continue;
			$.style = C.style.cssText;
			mini[Dm7Q](C, $, ["cls", "size"]);
			mini[CW7m](C, $, ["visible", "expanded", "showCollapseButton"]);
			mini[_i](C, $, ["minSize", "maxSize", "handlerSize"]);
			$.bodyParent = C
		}
		G.panes = A;
		return G
	}
});
J9_$(Jgu, "splitter");
Hg$E = function() {
	this.regions = [];
	this.regionMap = {};
	Hg$E[Xc$][TYcW][POm](this)
};
Mup(Hg$E, DZV, {
	regions: [],
	splitSize: 6,
	collapseWidth: 28,
	collapseHeight: 25,
	regionWidth: 150,
	regionHeight: 80,
	regionMinWidth: 50,
	regionMinHeight: 25,
	regionMaxWidth: 2000,
	regionMaxHeight: 2000,
	uiCls: "mini-layout",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "mini-layout";
		this.el.innerHTML = "<div class=\"mini-layout-border\"></div>";
		this.$Ar = this.el.firstChild;
		this[WRl]()
	},
	_initEvents: function() {
		Xs(function() {
			VPoJ(this.el, "click", this.Vj6T, this);
			VPoJ(this.el, "mousedown", this.HG_, this);
			VPoJ(this.el, "mouseover", this.Nv5, this);
			VPoJ(this.el, "mouseout", this.XKd, this);
			VPoJ(document, "mousedown", this.Zq_, this)
		},
		this)
	},
	getRegionEl: function($) {
		var $ = this[HvgL]($);
		if (!$) return null;
		return $._el
	},
	getRegionHeaderEl: function($) {
		var $ = this[HvgL]($);
		if (!$) return null;
		return $._header
	},
	getRegionBodyEl: function($) {
		var $ = this[HvgL]($);
		if (!$) return null;
		return $._body
	},
	getRegionSplitEl: function($) {
		var $ = this[HvgL]($);
		if (!$) return null;
		return $._split
	},
	getRegionProxyEl: function($) {
		var $ = this[HvgL]($);
		if (!$) return null;
		return $._proxy
	},
	getRegionBox: function(_) {
		var $ = this[FnF](_);
		if ($) return Vrm($);
		return null
	},
	getRegion: function($) {
		if (typeof $ == "string") return this.regionMap[$];
		return $
	},
	Lt: function(_, B) {
		var D = _.buttons;
		for (var $ = 0,
		A = D.length; $ < A; $++) {
			var C = D[$];
			if (C.name == B) return C
		}
	},
	Wwg: function(_) {
		var $ = mini.copyTo({
			region: "",
			title: "",
			iconCls: "",
			iconStyle: "",
			showCloseButton: false,
			showCollapseButton: true,
			buttons: [{
				name: "close",
				cls: "mini-tools-close",
				html: "",
				visible: false
			},
			{
				name: "collapse",
				cls: "mini-tools-collapse",
				html: "",
				visible: true
			}],
			showSplit: true,
			showHeader: true,
			splitSize: this.splitSize,
			collapseSize: this.collapseWidth,
			width: this.regionWidth,
			height: this.regionHeight,
			minWidth: this.regionMinWidth,
			minHeight: this.regionMinHeight,
			maxWidth: this.regionMaxWidth,
			maxHeight: this.regionMaxHeight,
			allowResize: true,
			cls: "",
			style: "",
			headerCls: "",
			headerStyle: "",
			bodyCls: "",
			bodyStyle: "",
			visible: true,
			expanded: true
		},
		_);
		return $
	},
	RRH: function($) {
		var $ = this[HvgL]($);
		if (!$) return;
		mini.append(this.$Ar, "<div id=\"" + $.region + "\" class=\"mini-layout-region\"><div class=\"mini-layout-region-header\" style=\"" + $.headerStyle + "\"></div><div class=\"mini-layout-region-body\" style=\"" + $.bodyStyle + "\"></div></div>");
		$._el = this.$Ar.lastChild;
		$._header = $._el.firstChild;
		$._body = $._el.lastChild;
		if ($.cls) Rw($._el, $.cls);
		if ($.style) MsRJ($._el, $.style);
		Rw($._el, "mini-layout-region-" + $.region);
		if ($.region != "center") {
			mini.append(this.$Ar, "<div uid=\"" + this.uid + "\" id=\"" + $.region + "\" class=\"mini-layout-split\"></div>");
			$._split = this.$Ar.lastChild;
			Rw($._split, "mini-layout-split-" + $.region)
		}
		if ($.region != "center") {
			mini.append(this.$Ar, "<div id=\"" + $.region + "\" class=\"mini-layout-proxy\"></div>");
			$._proxy = this.$Ar.lastChild;
			Rw($._proxy, "mini-layout-proxy-" + $.region)
		}
	},
	setRegions: function(A) {
		if (!mini.isArray(A)) return;
		for (var $ = 0,
		_ = A.length; $ < _; $++) this.addRegion(A[$])
	},
	addRegion: function(D, $) {
		var G = D;
		D = this.Wwg(D);
		if (!D.region) D.region = "center";
		D.region = D.region.toLowerCase();
		if (D.region == "center" && G && !G.showHeader) D.showHeader = false;
		if (D.region == "north" || D.region == "south") if (!G.collapseSize) D.collapseSize = this.collapseHeight;
		this.I_H(D);
		if (typeof $ != "number") $ = this.regions.length;
		var A = this.regionMap[D.region];
		if (A) return;
		this.regions.insert($, D);
		this.regionMap[D.region] = D;
		this.RRH(D);
		var B = this.getRegionBodyEl(D),
		C = D.body;
		delete D.body;
		if (C) {
			if (!mini.isArray(C)) C = [C];
			for (var _ = 0,
			F = C.length; _ < F; _++) mini.append(B, C[_])
		}
		if (D.bodyParent) {
			var E = D.bodyParent;
			while (E.firstChild) B.appendChild(E.firstChild)
		}
		delete D.bodyParent;
		this[WRl]()
	},
	removeRegion: function($) {
		var $ = this[HvgL]($);
		if (!$) return;
		this.regions.remove($);
		delete this.regionMap[$.region];
		jQuery($._el).remove();
		jQuery($._split).remove();
		jQuery($._proxy).remove();
		this[WRl]()
	},
	moveRegion: function(A, $) {
		var A = this[HvgL](A);
		if (!A) return;
		var _ = this.regions[$];
		if (!_ || _ == A) return;
		this.regions.remove(A);
		var $ = this.region.indexOf(_);
		this.regions.insert($, A);
		this[WRl]()
	},
	I_H: function($) {
		var _ = this.Lt($, "close");
		_.visible = $[SVtU];
		_ = this.Lt($, "collapse");
		_.visible = $[Bdk];
		if ($.width < $.minWidth) $.width = mini.minWidth;
		if ($.width > $.maxWidth) $.width = mini.maxWidth;
		if ($.height < $.minHeight) $.height = mini.minHeight;
		if ($.height > $.maxHeight) $.height = mini.maxHeight
	},
	updateRegion: function($, _) {
		$ = this[HvgL]($);
		if (!$) return;
		if (_) delete _.region;
		mini.copyTo($, _);
		this.I_H($);
		this[WRl]()
	},
	expandRegion: function($) {
		$ = this[HvgL]($);
		if (!$) return;
		$.expanded = true;
		this[WRl]()
	},
	collapseRegion: function($) {
		$ = this[HvgL]($);
		if (!$) return;
		$.expanded = false;
		this[WRl]()
	},
	toggleRegion: function($) {
		$ = this[HvgL]($);
		if (!$) return;
		if ($.expanded) this.collapseRegion($);
		else this.expandRegion($)
	},
	showRegion: function($) {
		$ = this[HvgL]($);
		if (!$) return;
		$.visible = true;
		this[WRl]()
	},
	hideRegion: function($) {
		$ = this[HvgL]($);
		if (!$) return;
		$.visible = false;
		this[WRl]()
	},
	isExpandRegion: function($) {
		$ = this[HvgL]($);
		if (!$) return null;
		return this.region.expanded
	},
	isVisibleRegion: function($) {
		$ = this[HvgL]($);
		if (!$) return null;
		return this.region.visible
	},
	UPu7: function($) {
		$ = this[HvgL]($);
		var _ = {
			region: $,
			cancel: false
		};
		if ($.expanded) {
			this.fire("BeforeCollapse", _);
			if (_.cancel == false) this.collapseRegion($)
		} else {
			this.fire("BeforeExpand", _);
			if (_.cancel == false) this.expandRegion($)
		}
	},
	H5NN: function(_) {
		var $ = BD(_.target, "mini-layout-proxy");
		return $
	},
	WA: function(_) {
		var $ = BD(_.target, "mini-layout-region");
		return $
	},
	Vj6T: function(D) {
		if (this.I2u) return;
		var A = this.H5NN(D);
		if (A) {
			var _ = A.id,
			C = BD(D.target, "mini-tools-collapse");
			if (C) this.UPu7(_);
			else this.SVC(_)
		}
		var B = this.WA(D);
		if (B && BD(D.target, "mini-layout-region-header")) {
			_ = B.id,
			C = BD(D.target, "mini-tools-collapse");
			if (C) this.UPu7(_);
			var $ = BD(D.target, "mini-tools-close");
			if ($) this.updateRegion(_, {
				visible: false
			})
		}
	},
	WsEp: function(_, A, $) {
		this.fire("buttonclick", {
			htmlEvent: $,
			region: _,
			button: A,
			index: this.buttons.indexOf(A),
			name: A.name
		})
	},
	IuQe: function(_, A, $) {
		this.fire("buttonmousedown", {
			htmlEvent: $,
			region: _,
			button: A,
			index: this.buttons.indexOf(A),
			name: A.name
		})
	},
	hoverProxyEl: null,
	Nv5: function(_) {
		var $ = this.H5NN(_);
		if ($) {
			Rw($, "mini-layout-proxy-hover");
			this.hoverProxyEl = $
		}
	},
	XKd: function($) {
		if (this.hoverProxyEl) EhVe(this.hoverProxyEl, "mini-layout-proxy-hover");
		this.hoverProxyEl = null
	},
	onButtonClick: function(_, $) {
		this.on("buttonclick", _, $)
	},
	onButtonMouseDown: function(_, $) {
		this.on("buttonmousedown", _, $)
	}
});
mini.copyTo(Hg$E.prototype, {
	ZK8: function(_, A) {
		var C = "<div class=\"mini-tools\">";
		if (A) C += "<span class=\"mini-tools-collapse\"></span>";
		else for (var $ = _.buttons.length - 1; $ >= 0; $--) {
			var B = _.buttons[$];
			C += "<span class=\"" + B.cls + "\" style=\"";
			C += B.style + ";" + (B.visible ? "": "display:none;") + "\">" + B.html + "</span>"
		}
		C += "</div>";
		C += "<div class=\"mini-layout-region-icon " + _.iconCls + "\" style=\"" + _[QrZ] + ";" + ((_[QrZ] || _.iconCls) ? "": "display:none;") + "\"></div>";
		C += "<div class=\"mini-layout-region-title\">" + _.title + "</div>";
		return C
	},
	doUpdate: function() {
		for (var $ = 0,
		E = this.regions.length; $ < E; $++) {
			var B = this.regions[$],
			_ = B.region,
			A = B._el,
			D = B._split,
			C = B._proxy;
			B._header.style.display = B.showHeader ? "": "none";
			B._header.innerHTML = this.ZK8(B);
			if (B._proxy) B._proxy.innerHTML = this.ZK8(B, true);
			if (D) {
				EhVe(D, "mini-layout-split-nodrag");
				if (B.expanded == false || !B[Wpk]) Rw(D, "mini-layout-split-nodrag")
			}
		}
		this[QM]()
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		if (this.I2u) return;
		var C = J6(this.el, true),
		_ = WDf(this.el, true),
		D = {
			x: 0,
			y: 0,
			width: _,
			height: C
		},
		I = this.regions.clone(),
		P = this[HvgL]("center");
		I.remove(P);
		if (P) I.push(P);
		for (var K = 0,
		H = I.length; K < H; K++) {
			var E = I[K];
			E._Expanded = false;
			EhVe(E._el, "mini-layout-popup");
			var A = E.region,
			L = E._el,
			F = E._split,
			G = E._proxy;
			if (E.visible == false) {
				L.style.display = "none";
				if (A != "center") F.style.display = G.style.display = "none";
				continue
			}
			L.style.display = "";
			if (A != "center") F.style.display = G.style.display = "";
			var R = D.x,
			O = D.y,
			_ = D.width,
			C = D.height,
			B = E.width,
			J = E.height;
			if (!E.expanded) if (A == "west" || A == "east") {
				B = E.collapseSize;
				_ZS(L, E.width)
			} else if (A == "north" || A == "south") {
				J = E.collapseSize;
				M$(L, E.height)
			}
			switch (A) {
			case "north":
				C = J;
				D.y += J;
				D.height -= J;
				break;
			case "south":
				C = J;
				O = D.y + D.height - J;
				D.height -= J;
				break;
			case "west":
				_ = B;
				D.x += B;
				D.width -= B;
				break;
			case "east":
				_ = B;
				R = D.x + D.width - B;
				D.width -= B;
				break;
			case "center":
				break;
			default:
				continue
			}
			if (_ < 0) _ = 0;
			if (C < 0) C = 0;
			if (A == "west" || A == "east") M$(L, C);
			if (A == "north" || A == "south") _ZS(L, _);
			var N = "left:" + R + "px;top:" + O + "px;",
			$ = L;
			if (!E.expanded) {
				$ = G;
				L.style.top = "-100px";
				L.style.left = "-1500px"
			} else if (G) {
				G.style.left = "-1500px";
				G.style.top = "-100px"
			}
			$.style.left = R + "px";
			$.style.top = O + "px";
			_ZS($, _);
			M$($, C);
			var M = jQuery(E._el).height(),
			Q = E.showHeader ? jQuery(E._header).outerHeight() : 0;
			M$(E._body, M - Q);
			if (A == "center") continue;
			B = J = E.splitSize;
			R = D.x,
			O = D.y,
			_ = D.width,
			C = D.height;
			switch (A) {
			case "north":
				C = J;
				D.y += J;
				D.height -= J;
				break;
			case "south":
				C = J;
				O = D.y + D.height - J;
				D.height -= J;
				break;
			case "west":
				_ = B;
				D.x += B;
				D.width -= B;
				break;
			case "east":
				_ = B;
				R = D.x + D.width - B;
				D.width -= B;
				break;
			case "center":
				break
			}
			if (_ < 0) _ = 0;
			if (C < 0) C = 0;
			F.style.left = R + "px";
			F.style.top = O + "px";
			_ZS(F, _);
			M$(F, C);
			F.style.display = E.showSplit ? "block": "none"
		}
		mini.layout(this.$Ar)
	},
	HG_: function(B) {
		if (this.I2u) return;
		if (BD(B.target, "mini-layout-split")) {
			var A = jQuery(B.target).attr("uid");
			if (A != this.uid) return;
			var _ = this[HvgL](B.target.id);
			if (_.expanded == false || !_[Wpk]) return;
			this.dragRegion = _;
			var $ = this.QKX$();
			$.start(B)
		}
	},
	QKX$: function() {
		if (!this.drag) this.drag = new mini.Drag({
			capture: true,
			onStart: mini.createDelegate(this.Zn, this),
			onMove: mini.createDelegate(this.Utfh, this),
			onStop: mini.createDelegate(this.OOu4, this)
		});
		return this.drag
	},
	Zn: function($) {
		this.O$ = mini.append(document.body, "<div class=\"mini-resizer-mask\"></div>");
		this.FT6 = mini.append(document.body, "<div class=\"mini-proxy\"></div>");
		this.FT6.style.cursor = "n-resize";
		if (this.dragRegion.region == "west" || this.dragRegion.region == "east") this.FT6.style.cursor = "w-resize";
		this.splitBox = Vrm(this.dragRegion._split);
		_cw(this.FT6, this.splitBox);
		this.elBox = Vrm(this.el, true)
	},
	Utfh: function(C) {
		var I = C.now[0] - C.init[0],
		V = this.splitBox.x + I,
		A = C.now[1] - C.init[1],
		U = this.splitBox.y + A,
		K = V + this.splitBox.width,
		T = U + this.splitBox.height,
		G = this[HvgL]("west"),
		L = this[HvgL]("east"),
		F = this[HvgL]("north"),
		D = this[HvgL]("south"),
		H = this[HvgL]("center"),
		O = G && G.visible ? G.width: 0,
		Q = L && L.visible ? L.width: 0,
		R = F && F.visible ? F.height: 0,
		J = D && D.visible ? D.height: 0,
		P = G && G.showSplit ? WDf(G._split) : 0,
		$ = L && L.showSplit ? WDf(L._split) : 0,
		B = F && F.showSplit ? J6(F._split) : 0,
		S = D && D.showSplit ? J6(D._split) : 0,
		E = this.dragRegion,
		N = E.region;
		if (N == "west") {
			var M = this.elBox.width - Q - $ - P - H.minWidth;
			if (V - this.elBox.x > M) V = M + this.elBox.x;
			if (V - this.elBox.x < E.minWidth) V = E.minWidth + this.elBox.x;
			if (V - this.elBox.x > E.maxWidth) V = E.maxWidth + this.elBox.x;
			mini.setX(this.FT6, V)
		} else if (N == "east") {
			M = this.elBox.width - O - P - $ - H.minWidth;
			if (this.elBox.right - (V + this.splitBox.width) > M) V = this.elBox.right - M - this.splitBox.width;
			if (this.elBox.right - (V + this.splitBox.width) < E.minWidth) V = this.elBox.right - E.minWidth - this.splitBox.width;
			if (this.elBox.right - (V + this.splitBox.width) > E.maxWidth) V = this.elBox.right - E.maxWidth - this.splitBox.width;
			mini.setX(this.FT6, V)
		} else if (N == "north") {
			var _ = this.elBox.height - J - S - B - H.minHeight;
			if (U - this.elBox.y > _) U = _ + this.elBox.y;
			if (U - this.elBox.y < E.minHeight) U = E.minHeight + this.elBox.y;
			if (U - this.elBox.y > E.maxHeight) U = E.maxHeight + this.elBox.y;
			mini.setY(this.FT6, U)
		} else if (N == "south") {
			_ = this.elBox.height - R - B - S - H.minHeight;
			if (this.elBox.bottom - (U + this.splitBox.height) > _) U = this.elBox.bottom - _ - this.splitBox.height;
			if (this.elBox.bottom - (U + this.splitBox.height) < E.minHeight) U = this.elBox.bottom - E.minHeight - this.splitBox.height;
			if (this.elBox.bottom - (U + this.splitBox.height) > E.maxHeight) U = this.elBox.bottom - E.maxHeight - this.splitBox.height;
			mini.setY(this.FT6, U)
		}
	},
	OOu4: function(B) {
		var C = Vrm(this.FT6),
		D = this.dragRegion,
		A = D.region;
		if (A == "west") {
			var $ = C.x - this.elBox.x;
			this.updateRegion(D, {
				width: $
			})
		} else if (A == "east") {
			$ = this.elBox.right - C.right;
			this.updateRegion(D, {
				width: $
			})
		} else if (A == "north") {
			var _ = C.y - this.elBox.y;
			this.updateRegion(D, {
				height: _
			})
		} else if (A == "south") {
			_ = this.elBox.bottom - C.bottom;
			this.updateRegion(D, {
				height: _
			})
		}
		jQuery(this.FT6).remove();
		this.FT6 = null;
		this.elBox = this.handlerBox = null;
		jQuery(this.O$).remove();
		this.O$ = null
	},
	SVC: function($) {
		$ = this[HvgL]($);
		if ($._Expanded === true) this.WX5($);
		else this.RIg($)
	},
	RIg: function(D) {
		if (this.I2u) return;
		this[QM]();
		var A = D.region,
		H = D._el;
		D._Expanded = true;
		Rw(H, "mini-layout-popup");
		var E = Vrm(D._proxy),
		B = Vrm(D._el),
		F = {};
		if (A == "east") {
			var K = E.x,
			J = E.y,
			C = E.height;
			M$(H, C);
			mini[UCK](H, K, J);
			var I = parseInt(H.style.left);
			F = {
				left: I - B.width
			}
		} else if (A == "west") {
			K = E.right - B.width,
			J = E.y,
			C = E.height;
			M$(H, C);
			mini[UCK](H, K, J);
			I = parseInt(H.style.left);
			F = {
				left: I + B.width
			}
		} else if (A == "north") {
			var K = E.x,
			J = E.bottom - B.height,
			_ = E.width;
			_ZS(H, _);
			mini[UCK](H, K, J);
			var $ = parseInt(H.style.top);
			F = {
				top: $ + B.height
			}
		} else if (A == "south") {
			K = E.x,
			J = E.y,
			_ = E.width;
			_ZS(H, _);
			mini[UCK](H, K, J);
			$ = parseInt(H.style.top);
			F = {
				top: $ - B.height
			}
		}
		Rw(D._proxy, "mini-layout-maxZIndex");
		this.I2u = true;
		var G = this,
		L = jQuery(H);
		L.animate(F, 250,
		function() {
			EhVe(D._proxy, "mini-layout-maxZIndex");
			G.I2u = false
		})
	},
	WX5: function(F) {
		if (this.I2u) return;
		F._Expanded = false;
		var B = F.region,
		E = F._el,
		D = Vrm(E),
		_ = {};
		if (B == "east") {
			var C = parseInt(E.style.left);
			_ = {
				left: C + D.width
			}
		} else if (B == "west") {
			C = parseInt(E.style.left);
			_ = {
				left: C - D.width
			}
		} else if (B == "north") {
			var $ = parseInt(E.style.top);
			_ = {
				top: $ - D.height
			}
		} else if (B == "south") {
			$ = parseInt(E.style.top);
			_ = {
				top: $ + D.height
			}
		}
		Rw(F._proxy, "mini-layout-maxZIndex");
		this.I2u = true;
		var A = this,
		G = jQuery(E);
		G.animate(_, 250,
		function() {
			EhVe(F._proxy, "mini-layout-maxZIndex");
			A.I2u = false;
			A[QM]()
		})
	},
	Zq_: function(B) {
		if (this.I2u) return;
		for (var $ = 0,
		A = this.regions.length; $ < A; $++) {
			var _ = this.regions[$];
			if (!_._Expanded) continue;
			if (Dmv(_._el, B.target) || Dmv(_._proxy, B.target));
			else this.WX5(_)
		}
	},
	getAttrs: function(A) {
		var H = Hg$E[Xc$][Z_s][POm](this, A),
		G = jQuery(A),
		E = parseInt(G.attr("splitSize"));
		if (!isNaN(E)) H.splitSize = E;
		var F = [],
		D = mini[$Vy$](A);
		for (var _ = 0,
		C = D.length; _ < C; _++) {
			var B = D[_],
			$ = {};
			F.push($);
			$.cls = B.className;
			$.style = B.style.cssText;
			mini[Dm7Q](B, $, ["region", "title", "iconCls", "iconStyle", "cls", "headerCls", "headerStyle", "bodyCls", "bodyStyle"]);
			mini[CW7m](B, $, ["allowResize", "visible", "showCloseButton", "showCollapseButton", "showSplit", "showHeader", "expanded"]);
			mini[_i](B, $, ["splitSize", "collapseSize", "width", "height", "minWidth", "minHeight", "maxWidth", "maxHeight"]);
			$.bodyParent = B
		}
		H.regions = F;
		return H
	}
});
J9_$(Hg$E, "layout");
KRr = function() {
	KRr[Xc$][TYcW][POm](this)
};
Mup(KRr, DZV, {
	style: "",
	borderStyle: "",
	bodyStyle: "",
	uiCls: "mini-box",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "mini-box";
		this.el.innerHTML = "<div class=\"mini-box-border\"></div>";
		this.LLB = this.$Ar = this.el.firstChild
	},
	_initEvents: function() {},
	doLayout: function() {
		if (!this.canLayout()) return;
		var C = this[_Y1](),
		E = this[Zf6](),
		B = TNY(this.LLB),
		D = UG(this.LLB);
		if (!C) {
			var A = this[Ls](true);
			if (jQuery.boxModel) A = A - B.top - B.bottom;
			A = A - D.top - D.bottom;
			if (A < 0) A = 0;
			this.LLB.style.height = A + "px"
		} else this.LLB.style.height = "";
		var $ = this[Hy](true),
		_ = $;
		$ = $ - D.left - D.right;
		if (jQuery.boxModel) $ = $ - B.left - B.right;
		if ($ < 0) $ = 0;
		this.LLB.style.width = $ + "px";
		mini.layout(this.$Ar)
	},
	setBody: function(_) {
		if (!_) return;
		if (!mini.isArray(_)) _ = [_];
		for (var $ = 0,
		A = _.length; $ < A; $++) mini.append(this.LLB, _[$]);
		mini.parse(this.LLB);
		this[QM]()
	},
	set_bodyParent: function($) {
		if (!$) return;
		var _ = this.LLB,
		A = $;
		while (A.firstChild) _.appendChild(A.firstChild);
		this[QM]()
	},
	setBodyStyle: function($) {
		MsRJ(this.LLB, $);
		this[QM]()
	},
	getAttrs: function($) {
		var _ = KRr[Xc$][Z_s][POm](this, $);
		_._bodyParent = $;
		mini[Dm7Q]($, _, ["bodyStyle"]);
		return _
	}
});
J9_$(KRr, "box");
HZ = function() {
	HZ[Xc$][TYcW][POm](this)
};
Mup(HZ, DZV, {
	url: "",
	uiCls: "mini-include",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "mini-include"
	},
	_initEvents: function() {},
	doLayout: function() {
		if (!this.canLayout()) return;
		var A = this.el.childNodes;
		if (A) for (var $ = 0,
		B = A.length; $ < B; $++) {
			var _ = A[$];
			mini.layout(_)
		}
	},
	setUrl: function($) {
		this.url = $;
		mini.update({
			url: this.url,
			el: this.el,
			async: this.async
		});
		this[QM]()
	},
	getUrl: function($) {
		return this.url
	},
	getAttrs: function($) {
		var _ = HZ[Xc$][Z_s][POm](this, $);
		mini[Dm7Q]($, _, ["url"]);
		return _
	}
});
J9_$(HZ, "include");
TVOy = function() {
	this.$Wi();
	TVOy[Xc$][TYcW][POm](this)
};
Mup(TVOy, DZV, {
	activeIndex: -1,
	tabAlign: "left",
	tabPosition: "top",
	showBody: true,
	nameField: "id",
	titleField: "title",
	urlField: "url",
	url: "",
	maskOnLoad: true,
	bodyStyle: "",
	$go: "mini-tab-hover",
	$oW: "mini-tab-active",
	set: function($) {
		if (typeof $ == "string") return this;
		var _ = this.Bfj;
		this.Bfj = false;
		var A = $.activeIndex;
		delete $.activeIndex;
		var B = $.url;
		delete $.url;
		TVOy[Xc$].set[POm](this, $);
		if (B) this.setUrl(B);
		if (mini.isNumber(A)) this.setActiveIndex(A);
		this.Bfj = _;
		this[QM]();
		return this
	},
	uiCls: "mini-tabs",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "mini-tabs";
		var _ = "<table class=\"mini-tabs-table\" cellspacing=\"0\" cellpadding=\"0\"><tr style=\"width:100%;\">" + "<td></td>" + "<td style=\"text-align:left;vertical-align:top;width:100%;\"><div class=\"mini-tabs-bodys\"></div></td>" + "<td></td>" + "</tr></table>";
		this.el.innerHTML = _;
		this.LT9 = this.el.firstChild;
		var $ = this.el.getElementsByTagName("td");
		this.Br = $[0];
		this.K033 = $[1];
		this.RwG = $[2];
		this.LLB = this.K033.firstChild;
		this.$Ar = this.LLB;
		this[WRl]()
	},
	QZGT: function() {
		EhVe(this.Br, "mini-tabs-header");
		EhVe(this.RwG, "mini-tabs-header");
		this.Br.innerHTML = "";
		this.RwG.innerHTML = "";
		mini.removeChilds(this.K033, this.LLB)
	},
	_initEvents: function() {
		Xs(function() {
			VPoJ(this.el, "mousedown", this.HG_, this);
			VPoJ(this.el, "click", this.Vj6T, this);
			VPoJ(this.el, "mouseover", this.Nv5, this);
			VPoJ(this.el, "mouseout", this.XKd, this)
		},
		this)
	},
	$Wi: function() {
		this.tabs = []
	},
	Xem9: 1,
	createTab: function(_) {
		var $ = mini.copyTo({
			_id: this.Xem9++,
			name: "",
			title: "",
			newLine: false,
			iconCls: "",
			iconStyle: "",
			headerCls: "",
			headerStyle: "",
			bodyCls: "",
			bodyStyle: "",
			visible: true,
			enabled: true,
			showCloseButton: false,
			active: false,
			url: "",
			loaded: false,
			refreshOnClick: false
		},
		_);
		if (_) {
			_ = mini.copyTo(_, $);
			$ = _
		}
		return $
	},
	LpO: function() {
		var _ = mini.getData(this.url);
		if (!_) _ = [];
		for (var $ = 0,
		B = _.length; $ < B; $++) {
			var A = _[$];
			A.title = A[this.titleField];
			A.url = A[this.urlField];
			A.name = A[this.nameField]
		}
		this.setTabs(_);
		this.fire("load")
	},
	load: function($) {
		if (typeof $ == "string") this.setUrl($);
		else this.setTabs($)
	},
	setUrl: function($) {
		this.url = $;
		this.LpO()
	},
	getUrl: function() {
		return this.url
	},
	setNameField: function($) {
		this.nameField = $
	},
	getNameField: function() {
		return this.nameField
	},
	setTitleField: function($) {
		this[H35] = $
	},
	getTitleField: function() {
		return this[H35]
	},
	setUrlField: function($) {
		this[FQZ] = $
	},
	getUrlField: function() {
		return this[FQZ]
	},
	setTabs: function(_) {
		if (!mini.isArray(_)) return;
		this.beginUpdate();
		this.removeAll();
		for (var $ = 0,
		A = _.length; $ < A; $++) this.addTab(_[$]);
		this.setActiveIndex(0);
		this.endUpdate()
	},
	getTabs: function() {
		return this.tabs
	},
	removeAll: function(A) {
		if (mini.isNull(A)) A = [];
		if (!mini.isArray(A)) A = [A];
		for (var $ = A.length - 1; $ >= 0; $--) {
			var B = this.getTab(A[$]);
			if (!B) A.removeAt($);
			else A[$] = B
		}
		var _ = this.tabs;
		for ($ = _.length - 1; $ >= 0; $--) {
			var D = _[$];
			if (A.indexOf(D) == -1) this.removeTab(D)
		}
		var C = A[0];
		if (C) this.activeTab(C)
	},
	addTab: function(C, $) {
		if (typeof C == "string") C = {
			title: C
		};
		C = this.createTab(C);
		if (!C.name) C.name = "";
		if (typeof $ != "number") $ = this.tabs.length;
		this.tabs.insert($, C);
		var F = this.JP1L(C),
		G = "<div id=\"" + F + "\" class=\"mini-tabs-body " + C.bodyCls + "\" style=\"" + C.bodyStyle + ";display:none;\"></div>";
		mini.append(this.LLB, G);
		var A = this.getTabBodyEl(C),
		B = C.body;
		delete C.body;
		if (B) {
			if (!mini.isArray(B)) B = [B];
			for (var _ = 0,
			E = B.length; _ < E; _++) mini.append(A, B[_])
		}
		if (C.bodyParent) {
			var D = C.bodyParent;
			while (D.firstChild) A.appendChild(D.firstChild)
		}
		delete C.bodyParent;
		this[WRl]();
		return C
	},
	removeTab: function(C) {
		C = this.getTab(C);
		if (!C) return;
		var D = this.getActiveTab(),
		B = C == D,
		A = this.WLA(C);
		this.tabs.remove(C);
		this.FRpI(C);
		var _ = this.getTabBodyEl(C);
		if (_) this.LLB.removeChild(_);
		if (A && B) {
			for (var $ = this.activeIndex; $ >= 0; $--) {
				var C = this.getTab($);
				if (C && C.enabled && C.visible) {
					this.activeIndex = $;
					break
				}
			}
			this[WRl]();
			this.setActiveIndex(this.activeIndex);
			this.fire("activechanged")
		} else {
			this.activeIndex = this.tabs.indexOf(D);
			this[WRl]()
		}
		return C
	},
	moveTab: function(A, $) {
		A = this.getTab(A);
		if (!A) return;
		var _ = this.tabs[$];
		if (!_ || _ == A) return;
		this.tabs.remove(A);
		var $ = this.tabs.indexOf(_);
		this.tabs.insert($, A);
		this[WRl]()
	},
	updateTab: function($, _) {
		$ = this.getTab($);
		if (!$) return;
		mini.copyTo($, _);
		this[WRl]()
	},
	Eb: function() {
		return this.LLB
	},
	FRpI: function(C, A) {
		if (C.PiZ4 && C.PiZ4.parentNode) {
			C.PiZ4.src = "";
			if (C.PiZ4._ondestroy) C.PiZ4._ondestroy();
			try {
				C.PiZ4.parentNode.removeChild(C.PiZ4);
				C.PiZ4[NlM](true)
			} catch(F) {}
		}
		C.PiZ4 = null;
		C.loadedUrl = null;
		if (A === true) {
			var D = this.getTabBodyEl(C);
			if (D) {
				var B = mini[$Vy$](D, true);
				for (var _ = 0,
				E = B.length; _ < E; _++) {
					var $ = B[_];
					if ($ && $.parentNode) $.parentNode.removeChild($)
				}
			}
		}
	},
	Enq: 180,
	_cancelLoadTabs: function(B) {
		var _ = this.tabs;
		for (var $ = 0,
		C = _.length; $ < C; $++) {
			var A = _[$];
			if (A != B) if (A._loading && A.PiZ4) {
				A._loading = false;
				this.FRpI(A, true)
			}
		}
		this._loading = false;
		this.unmask()
	},
	Ih: function(A) {
		if (!A) return;
		var B = this.getTabBodyEl(A);
		if (!B) return;
		this._cancelLoadTabs();
		this.FRpI(A, true);
		this._loading = true;
		A._loading = true;
		this.unmask();
		if (this.maskOnLoad) this.loading();
		var C = new Date(),
		$ = this;
		$.isLoading = true;
		var _ = mini.createIFrame(A.url,
		function(_, D) {
			try {
				A.PiZ4.contentWindow.Owner = window;
				A.PiZ4.contentWindow.CloseOwnerWindow = function(_) {
					A.removeAction = _;
					var B = true;
					if (A.ondestroy) {
						if (typeof A.ondestroy == "string") A.ondestroy = window[A.ondestroy];
						if (A.ondestroy) B = A.ondestroy[POm](this, E)
					}
					if (B === false) return false;
					setTimeout(function() {
						$.removeTab(A)
					},
					10)
				}
			} catch(E) {}
			if (A._loading != true) return;
			var B = (C - new Date()) + $.Enq;
			A._loading = false;
			A.loadedUrl = A.url;
			if (B < 0) B = 0;
			setTimeout(function() {
				$.unmask();
				$[QM]();
				$.isLoading = false
			},
			B);
			if (D) {
				var E = {
					sender: $,
					tab: A,
					index: $.tabs.indexOf(A),
					name: A.name,
					iframe: A.PiZ4
				};
				if (A.onload) {
					if (typeof A.onload == "string") A.onload = window[A.onload];
					if (A.onload) A.onload[POm]($, E)
				}
			}
			$.fire("tabload", E)
		});
		setTimeout(function() {
			if (A.PiZ4 == _) B.appendChild(_)
		},
		1);
		A.PiZ4 = _
	},
	WLA: function($) {
		var _ = {
			sender: this,
			tab: $,
			index: this.tabs.indexOf($),
			name: $.name,
			iframe: $.PiZ4,
			autoActive: true
		};
		this.fire("tabdestroy", _);
		return _.autoActive
	},
	loadTab: function(A, _, $, C) {
		if (!A) return;
		_ = this.getTab(_);
		if (!_) _ = this.getActiveTab();
		if (!_) return;
		_.url = A;
		delete _.loadedUrl;
		var B = this;
		clearTimeout(this._loadTabTimer);
		this._loadTabTimer = setTimeout(function() {
			B.Ih(_)
		},
		1)
	},
	reloadTab: function($) {
		$ = this.getTab($);
		if (!$) $ = this.getActiveTab();
		if (!$) return;
		this.loadTab($.url, $)
	},
	getTabRows: function() {
		var A = [],
		_ = [];
		for (var $ = 0,
		C = this.tabs.length; $ < C; $++) {
			var B = this.tabs[$];
			if ($ != 0 && B.newLine) {
				A.push(_);
				_ = []
			}
			_.push(B)
		}
		A.push(_);
		return A
	},
	doUpdate: function() {
		if (this.O7bE === false) return;
		EhVe(this.el, "mini-tabs-position-left");
		EhVe(this.el, "mini-tabs-position-top");
		EhVe(this.el, "mini-tabs-position-right");
		EhVe(this.el, "mini-tabs-position-bottom");
		if (this[Usv] == "bottom") {
			Rw(this.el, "mini-tabs-position-bottom");
			this.Q3Z()
		} else if (this[Usv] == "right") {
			Rw(this.el, "mini-tabs-position-right");
			this._M2()
		} else if (this[Usv] == "left") {
			Rw(this.el, "mini-tabs-position-left");
			this.ZHG()
		} else {
			Rw(this.el, "mini-tabs-position-top");
			this.Trv()
		}
		this[QM]();
		this.setActiveIndex(this.activeIndex, false)
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		var R = this[_Y1]();
		C = this[Ls](true);
		w = this[Hy](true);
		var G = C,
		O = w;
		if (!R && this[GQXY]) {
			var Q = jQuery(this.U2N).outerHeight(),
			$ = jQuery(this.U2N).outerWidth();
			if (this[Usv] == "top") Q = jQuery(this.U2N.parentNode).outerHeight();
			if (this[Usv] == "left" || this[Usv] == "right") w = w - $;
			else C = C - Q;
			if (jQuery.boxModel) {
				var D = TNY(this.LLB),
				S = Ps$(this.LLB);
				C = C - D.top - D.bottom - S.top - S.bottom;
				w = w - D.left - D.right - S.left - S.right
			}
			margin = UG(this.LLB);
			C = C - margin.top - margin.bottom;
			w = w - margin.left - margin.right;
			if (C < 0) C = 0;
			if (w < 0) w = 0;
			this.LLB.style.width = w + "px";
			this.LLB.style.height = C + "px";
			if (this[Usv] == "left" || this[Usv] == "right") {
				var I = this.U2N.getElementsByTagName("tr")[0],
				E = I.childNodes,
				_ = E[0].getElementsByTagName("tr"),
				F = last = all = 0;
				for (var K = 0,
				H = _.length; K < H; K++) {
					var I = _[K],
					N = jQuery(I).outerHeight();
					all += N;
					if (K == 0) F = N;
					if (K == H - 1) last = N
				}
				switch (this[X21]) {
				case "center":
					var P = parseInt((G - (all - F - last)) / 2);
					for (K = 0, H = E.length; K < H; K++) {
						E[K].firstChild.style.height = G + "px";
						var B = E[K].firstChild,
						_ = B.getElementsByTagName("tr"),
						L = _[0],
						U = _[_.length - 1];
						L.style.height = P + "px";
						U.style.height = P + "px"
					}
					break;
				case "right":
					for (K = 0, H = E.length; K < H; K++) {
						var B = E[K].firstChild,
						_ = B.getElementsByTagName("tr"),
						I = _[0],
						T = G - (all - F);
						if (T >= 0) I.style.height = T + "px"
					}
					break;
				case "fit":
					for (K = 0, H = E.length; K < H; K++) E[K].firstChild.style.height = G + "px";
					break;
				default:
					for (K = 0, H = E.length; K < H; K++) {
						B = E[K].firstChild,
						_ = B.getElementsByTagName("tr"),
						I = _[_.length - 1],
						T = G - (all - last);
						if (T >= 0) I.style.height = T + "px"
					}
					break
				}
			}
		} else {
			this.LLB.style.width = "auto";
			this.LLB.style.height = "auto"
		}
		var A = this.getTabBodyEl(this.activeIndex);
		if (A) if (!R && this[GQXY]) {
			var C = J6(this.LLB, true);
			if (jQuery.boxModel) {
				D = TNY(A),
				S = Ps$(A);
				C = C - D.top - D.bottom - S.top - S.bottom
			}
			A.style.height = C + "px"
		} else A.style.height = "auto";
		switch (this[Usv]) {
		case "bottom":
			var M = this.U2N.childNodes;
			for (K = 0, H = M.length; K < H; K++) {
				B = M[K];
				EhVe(B, "mini-tabs-header2");
				if (H > 1 && K != 0) Rw(B, "mini-tabs-header2")
			}
			break;
		case "left":
			E = this.U2N.firstChild.rows[0].cells;
			for (K = 0, H = E.length; K < H; K++) {
				var J = E[K];
				EhVe(J, "mini-tabs-header2");
				if (H > 1 && K == 0) Rw(J, "mini-tabs-header2")
			}
			break;
		case "right":
			E = this.U2N.firstChild.rows[0].cells;
			for (K = 0, H = E.length; K < H; K++) {
				J = E[K];
				EhVe(J, "mini-tabs-header2");
				if (H > 1 && K != 0) Rw(J, "mini-tabs-header2")
			}
			break;
		default:
			M = this.U2N.childNodes;
			for (K = 0, H = M.length; K < H; K++) {
				B = M[K];
				EhVe(B, "mini-tabs-header2");
				if (H > 1 && K == 0) Rw(B, "mini-tabs-header2")
			}
			break
		}
		EhVe(this.el, "mini-tabs-scroll");
		if (this[Usv] == "top") {
			jQuery(this.U2N).width(O);
			if (this.U2N.offsetWidth < this.U2N.scrollWidth) {
				jQuery(this.U2N).width(O - 60);
				Rw(this.el, "mini-tabs-scroll")
			}
			if (isIE && !jQuery.boxModel) this.M4H.style.left = "-26px"
		}
		this.AOXR();
		mini.layout(this.LLB)
	},
	setTabAlign: function($) {
		this[X21] = $;
		this[WRl]()
	},
	setTabPosition: function($) {
		this[Usv] = $;
		this[WRl]()
	},
	getTab: function($) {
		if (typeof $ == "object") return $;
		if (typeof $ == "number") return this.tabs[$];
		else for (var _ = 0,
		B = this.tabs.length; _ < B; _++) {
			var A = this.tabs[_];
			if (A.name == $) return A
		}
	},
	getHeaderEl: function() {
		return this.U2N
	},
	getBodyEl: function() {
		return this.LLB
	},
	getTabEl: function($) {
		var C = this.getTab($);
		if (!C) return null;
		var E = this.F08l(C),
		B = this.el.getElementsByTagName("*");
		for (var _ = 0,
		D = B.length; _ < D; _++) {
			var A = B[_];
			if (A.id == E) return A
		}
		return null
	},
	getTabBodyEl: function($) {
		var C = this.getTab($);
		if (!C) return null;
		var E = this.JP1L(C),
		B = this.LLB.childNodes;
		for (var _ = 0,
		D = B.length; _ < D; _++) {
			var A = B[_];
			if (A.id == E) return A
		}
		return null
	},
	getTabIFrameEl: function($) {
		var _ = this.getTab($);
		if (!_) return null;
		return _.PiZ4
	},
	F08l: function($) {
		return this.uid + "$" + $._id
	},
	JP1L: function($) {
		return this.uid + "$body$" + $._id
	},
	AOXR: function() {
		if (this[Usv] == "top") {
			EhVe(this.M4H, "mini-disabled");
			EhVe(this.IzK, "mini-disabled");
			if (this.U2N.scrollLeft == 0) Rw(this.M4H, "mini-disabled");
			var _ = this.getTabEl(this.tabs.length - 1);
			if (_) {
				var $ = Vrm(_),
				A = Vrm(this.U2N);
				if ($.right <= A.right) Rw(this.IzK, "mini-disabled")
			}
		}
	},
	setActiveIndex: function($, I) {
		var M = this.getTab($),
		C = this.getTab(this.activeIndex),
		N = M != C,
		K = this.getTabBodyEl(this.activeIndex);
		if (K) K.style.display = "none";
		if (M) this.activeIndex = this.tabs.indexOf(M);
		else this.activeIndex = -1;
		K = this.getTabBodyEl(this.activeIndex);
		if (K) K.style.display = "";
		K = this.getTabEl(C);
		if (K) EhVe(K, this.$oW);
		K = this.getTabEl(M);
		if (K) Rw(K, this.$oW);
		if (K && N) {
			if (this[Usv] == "bottom") {
				var A = BD(K, "mini-tabs-header");
				if (A) jQuery(this.U2N).prepend(A)
			} else if (this[Usv] == "left") {
				var G = BD(K, "mini-tabs-header").parentNode;
				if (G) G.parentNode.appendChild(G)
			} else if (this[Usv] == "right") {
				G = BD(K, "mini-tabs-header").parentNode;
				if (G) jQuery(G.parentNode).prepend(G)
			} else {
				A = BD(K, "mini-tabs-header");
				if (A) this.U2N.appendChild(A)
			}
			var B = this.U2N.scrollLeft;
			this[QM]();
			var _ = this.getTabRows();
			if (_.length > 1);
			else {
				if (this[Usv] == "top") {
					this.U2N.scrollLeft = B;
					var O = this.getTabEl(this.activeIndex);
					if (O) {
						var J = this,
						L = Vrm(O),
						F = Vrm(J.U2N);
						if (L.x < F.x) J.U2N.scrollLeft -= (F.x - L.x);
						else if (L.right > F.right) J.U2N.scrollLeft += (L.right - F.right)
					}
				}
				this.AOXR()
			}
			for (var H = 0,
			E = this.tabs.length; H < E; H++) {
				O = this.getTabEl(this.tabs[H]);
				if (O) EhVe(O, this.$go)
			}
		}
		var D = this;
		if (N) {
			var P = {
				tab: M,
				index: this.tabs.indexOf(M),
				name: M.name
			};
			setTimeout(function() {
				D.fire("ActiveChanged", P)
			},
			1)
		}
		this._cancelLoadTabs(M);
		if (I !== false) if (M && M.url && !M.loadedUrl) {
			D = this;
			D.loadTab(M.url, M)
		}
		if (D.canLayout()) {
			try {
				mini.layoutIFrames(D.el)
			} catch(P) {}
		}
	},
	getActiveIndex: function() {
		return this.activeIndex
	},
	activeTab: function($) {
		this.setActiveIndex($)
	},
	getActiveTab: function() {
		return this.getTab(this.activeIndex)
	},
	getActiveIndex: function() {
		return this.activeIndex
	},
	KCY: function(_) {
		_ = this.getTab(_);
		if (!_) return;
		var $ = this.tabs.indexOf(_);
		if (this.activeIndex == $) return;
		var A = {
			tab: _,
			index: $,
			name: _.name,
			cancel: false
		};
		this.fire("BeforeActiveChanged", A);
		if (A.cancel == false) this.activeTab(_)
	},
	setShowBody: function($) {
		if (this[GQXY] != $) {
			this[GQXY] = $;
			this[QM]()
		}
	},
	getShowBody: function() {
		return this[GQXY]
	},
	setBodyStyle: function($) {
		this.bodyStyle = $;
		MsRJ(this.LLB, $);
		this[QM]()
	},
	getBodyStyle: function() {
		return this.bodyStyle
	},
	setMaskOnLoad: function($) {
		this.maskOnLoad = $
	},
	getMaskOnLoad: function() {
		return this.maskOnLoad
	},
	getTabByEvent: function($) {
		return this.V6p($)
	},
	V6p: function(B) {
		var A = BD(B.target, "mini-tab");
		if (!A) return null;
		var _ = A.id.split("$");
		if (_[0] != this.uid) return null;
		var $ = parseInt(jQuery(A).attr("index"));
		return this.getTab($)
	},
	Vj6T: function(A) {
		if (this.isLoading) return;
		var $ = this.V6p(A);
		if (!$) return;
		if ($.enabled) {
			var _ = this;
			setTimeout(function() {
				if (BD(A.target, "mini-tab-close")) _.G0R($, A);
				else {
					var B = $.loadedUrl;
					_.KCY($);
					if ($[JM] && $.url == B) _.reloadTab($)
				}
			},
			10)
		}
	},
	hoverTab: null,
	Nv5: function(A) {
		var $ = this.V6p(A);
		if ($ && $.enabled) {
			var _ = this.getTabEl($);
			Rw(_, this.$go);
			this.hoverTab = $
		}
	},
	XKd: function(_) {
		if (this.hoverTab) {
			var $ = this.getTabEl(this.hoverTab);
			EhVe($, this.$go)
		}
		this.hoverTab = null
	},
	HG_: function(B) {
		clearInterval(this.XDI);
		if (this[Usv] == "top") {
			var _ = this,
			A = 0,
			$ = 10;
			if (B.target == this.M4H) this.XDI = setInterval(function() {
				_.U2N.scrollLeft -= $;
				A++;
				if (A > 5) $ = 18;
				if (A > 10) $ = 25;
				_.AOXR()
			},
			25);
			else if (B.target == this.IzK) this.XDI = setInterval(function() {
				_.U2N.scrollLeft += $;
				A++;
				if (A > 5) $ = 18;
				if (A > 10) $ = 25;
				_.AOXR()
			},
			25);
			VPoJ(document, "mouseup", this.SdR, this)
		}
	},
	SdR: function($) {
		clearInterval(this.XDI);
		this.XDI = null;
		Ri(document, "mouseup", this.SdR, this)
	},
	Trv: function() {
		var L = this[Usv] == "top",
		O = "";
		if (L) {
			O += "<div class=\"mini-tabs-scrollCt\">";
			O += "<a class=\"mini-tabs-leftButton\" href=\"javascript:void(0)\" hideFocus onclick=\"return false\"></a><a class=\"mini-tabs-rightButton\" href=\"javascript:void(0)\" hideFocus onclick=\"return false\"></a>"
		}
		O += "<div class=\"mini-tabs-headers\">";
		var B = this.getTabRows();
		for (var M = 0,
		A = B.length; M < A; M++) {
			var I = B[M],
			E = "";
			O += "<table class=\"mini-tabs-header\" cellspacing=\"0\" cellpadding=\"0\"><tr><td class=\"mini-tabs-space mini-tabs-firstSpace\"><div></div></td>";
			for (var J = 0,
			F = I.length; J < F; J++) {
				var N = I[J],
				G = this.F08l(N);
				if (!N.visible) continue;
				var $ = this.tabs.indexOf(N),
				E = N.headerCls || "";
				if (N.enabled == false) E += " mini-disabled";
				O += "<td id=\"" + G + "\" index=\"" + $ + "\"  class=\"mini-tab " + E + "\" style=\"" + N.headerStyle + "\">";
				if (N.iconCls || N[QrZ]) O += "<span class=\"mini-tab-icon " + N.iconCls + "\" style=\"" + N[QrZ] + "\"></span>";
				O += "<span class=\"mini-tab-text\">" + N.title + "</span>";
				if (N[SVtU]) {
					var _ = "";
					if (N.enabled) _ = "onmouseover=\"Rw(this,'mini-tab-close-hover')\" onmouseout=\"EhVe(this,'mini-tab-close-hover')\"";
					O += "<span class=\"mini-tab-close\" " + _ + "></span>"
				}
				O += "</td>";
				if (J != F - 1) O += "<td class=\"mini-tabs-space2\"><div></div></td>"
			}
			O += "<td class=\"mini-tabs-space mini-tabs-lastSpace\" ><div></div></td></tr></table>"
		}
		if (L) O += "</div>";
		O += "</div>";
		this.QZGT();
		mini.prepend(this.K033, O);
		var H = this.K033;
		this.U2N = H.firstChild.lastChild;
		if (L) {
			this.M4H = this.U2N.parentNode.firstChild;
			this.IzK = this.U2N.parentNode.childNodes[1]
		}
		switch (this[X21]) {
		case "center":
			var K = this.U2N.childNodes;
			for (J = 0, F = K.length; J < F; J++) {
				var C = K[J],
				D = C.getElementsByTagName("td");
				D[0].style.width = "50%";
				D[D.length - 1].style.width = "50%"
			}
			break;
		case "right":
			K = this.U2N.childNodes;
			for (J = 0, F = K.length; J < F; J++) {
				C = K[J],
				D = C.getElementsByTagName("td");
				D[0].style.width = "100%"
			}
			break;
		case "fit":
			break;
		default:
			K = this.U2N.childNodes;
			for (J = 0, F = K.length; J < F; J++) {
				C = K[J],
				D = C.getElementsByTagName("td");
				D[D.length - 1].style.width = "100%"
			}
			break
		}
	},
	Q3Z: function() {
		this.Trv();
		var $ = this.K033;
		mini.append($, $.firstChild);
		this.U2N = $.lastChild
	},
	ZHG: function() {
		var J = "<table cellspacing=\"0\" cellpadding=\"0\"><tr>",
		B = this.getTabRows();
		for (var H = 0,
		A = B.length; H < A; H++) {
			var F = B[H],
			C = "";
			if (A > 1 && H != A - 1) C = "mini-tabs-header2";
			J += "<td class=\"" + C + "\"><table class=\"mini-tabs-header\" cellspacing=\"0\" cellpadding=\"0\">";
			J += "<tr ><td class=\"mini-tabs-space mini-tabs-firstSpace\" ><div></div></td></tr>";
			for (var G = 0,
			D = F.length; G < D; G++) {
				var I = F[G],
				E = this.F08l(I);
				if (!I.visible) continue;
				var $ = this.tabs.indexOf(I),
				C = I.headerCls || "";
				if (I.enabled == false) C += " mini-disabled";
				J += "<tr><td id=\"" + E + "\" index=\"" + $ + "\"  class=\"mini-tab " + C + "\" style=\"" + I.headerStyle + "\">";
				if (I.iconCls || I[QrZ]) J += "<span class=\"mini-tab-icon " + I.iconCls + "\" style=\"" + I[QrZ] + "\"></span>";
				J += "<span class=\"mini-tab-text\">" + I.title + "</span>";
				if (I[SVtU]) {
					var _ = "";
					if (I.enabled) _ = "onmouseover=\"Rw(this,'mini-tab-close-hover')\" onmouseout=\"EhVe(this,'mini-tab-close-hover')\"";
					J += "<span class=\"mini-tab-close\" " + _ + "></span>"
				}
				J += "</td></tr>";
				if (G != D - 1) J += "<tr><td class=\"mini-tabs-space2\"><div></div></td></tr>"
			}
			J += "<tr ><td class=\"mini-tabs-space mini-tabs-lastSpace\" ><div></div></td></tr>";
			J += "</table></td>"
		}
		J += "</tr ></table>";
		this.QZGT();
		Rw(this.Br, "mini-tabs-header");
		mini.append(this.Br, J);
		this.U2N = this.Br
	},
	_M2: function() {
		this.ZHG();
		EhVe(this.Br, "mini-tabs-header");
		EhVe(this.RwG, "mini-tabs-header");
		mini.append(this.RwG, this.Br.firstChild);
		this.U2N = this.RwG
	},
	G0R: function(_, $) {
		var C = {
			tab: _,
			index: this.tabs.indexOf(_),
			name: _.name.toLowerCase(),
			htmlEvent: $,
			cancel: false
		};
		this.fire("beforecloseclick", C);
		try {
			if (_.PiZ4 && _.PiZ4.contentWindow) {
				var A = true;
				if (_.PiZ4.contentWindow.CloseWindow) A = _.PiZ4.contentWindow.CloseWindow("close");
				else if (_.PiZ4.contentWindow.CloseOwnerWindow) A = _.PiZ4.contentWindow.CloseOwnerWindow("close");
				if (A === false) C.cancel = true
			}
		} catch(B) {}
		if (C.cancel == true) return;
		_.removeAction = "close";
		this.removeTab(_);
		this.fire("closeclick", C)
	},
	onBeforeCloseClick: function(_, $) {
		this.on("beforecloseclick", _, $)
	},
	onCloseClick: function(_, $) {
		this.on("closeclick", _, $)
	},
	onActiveChanged: function(_, $) {
		this.on("activechanged", _, $)
	},
	getAttrs: function(B) {
		var F = TVOy[Xc$][Z_s][POm](this, B);
		mini[Dm7Q](B, F, ["tabAlign", "tabPosition", "bodyStyle", "onactivechanged", "onbeforeactivechanged", "url", "ontabload", "ontabdestroy", "onbeforecloseclick", "oncloseclick", "titleField", "urlField", "nameField", "loadingMsg"]);
		mini[CW7m](B, F, ["allowAnim", "showBody", "maskOnLoad"]);
		mini[_i](B, F, ["activeIndex"]);
		var A = [],
		E = mini[$Vy$](B);
		for (var _ = 0,
		D = E.length; _ < D; _++) {
			var C = E[_],
			$ = {};
			A.push($);
			$.style = C.style.cssText;
			mini[Dm7Q](C, $, ["name", "title", "url", "cls", "iconCls", "iconStyle", "headerCls", "headerStyle", "bodyCls", "bodyStyle", "onload", "ondestroy"]);
			mini[CW7m](C, $, ["newLine", "visible", "enabled", "showCloseButton", "refreshOnClick"]);
			$.bodyParent = C
		}
		F.tabs = A;
		return F
	}
});
J9_$(TVOy, "tabs");
XL = function() {
	this.items = [];
	XL[Xc$][TYcW][POm](this)
};
Mup(XL, DZV);
mini.copyTo(XL.prototype, Nist_prototype);
var Nist_prototype_hide = Nist_prototype.hide;
mini.copyTo(XL.prototype, {
	width: 140,
	vertical: true,
	allowSelectItem: false,
	VZD0: null,
	_XA2: "mini-menuitem-selected",
	textField: "text",
	resultAsTree: false,
	idField: "id",
	parentField: "pid",
	itemsField: "children",
	_clearBorder: false,
	showAction: "none",
	hideAction: "outerclick",
	getbyName: function(C) {
		for (var _ = 0,
		B = this.items.length; _ < B; _++) {
			var $ = this.items[_];
			if ($.name == C) return $;
			if ($.menu) {
				var A = $.menu.getbyName(C);
				if (A) return A
			}
		}
		return null
	},
	set: function($) {
		if (typeof $ == "string") return this;
		var _ = $.url;
		delete $.url;
		XL[Xc$].set[POm](this, $);
		if (_) this.setUrl(_);
		return this
	},
	uiCls: "mini-menu",
	_create: function() {
		var _ = "<table class=\"mini-menu\" cellpadding=\"0\" cellspacing=\"0\"><tr><td style=\"text-align:left;vertical-align:top;padding:0;border:0;\"><div class=\"mini-menu-inner\"></div></td></tr></table>",
		$ = document.createElement("div");
		$.innerHTML = _;
		this.el = $.firstChild;
		this._contentEl = mini.byClass("mini-menu-inner", this.el);
		if (this.isVertical() == false) Rw(this.el, "mini-menu-horizontal")
	},
	destroy: function($) {
		this._popupEl = this.popupEl = null;
		this.owner = null;
		Ri(document, "mousedown", this.F9T, this);
		Ri(window, "resize", this.CPM, this);
		XL[Xc$][$Kt][POm](this, $)
	},
	_initEvents: function() {
		Xs(function() {
			VPoJ(document, "mousedown", this.F9T, this);
			VPoJ(this.el, "mouseover", this.Nv5, this);
			VPoJ(window, "resize", this.CPM, this);
			VPoJ(this.el, "contextmenu",
			function($) {
				$.preventDefault()
			},
			this)
		},
		this)
	},
	within: function(B) {
		if (Dmv(this.el, B.target)) return true;
		for (var _ = 0,
		A = this.items.length; _ < A; _++) {
			var $ = this.items[_];
			if ($[W05](B)) return true
		}
		return false
	},
	Z39B: function() {
		if (!this._clearEl) this._clearEl = mini.append(this._contentEl, "<div style=\"clear:both;\"></div>");
		return this._clearEl
	},
	setVertical: function($) {
		this.vertical = $;
		if (!$) Rw(this.el, "mini-menu-horizontal");
		else EhVe(this.el, "mini-menu-horizontal");
		mini.append(this._contentEl, this.Z39B())
	},
	getVertical: function() {
		return this.vertical
	},
	isVertical: function() {
		return this.vertical
	},
	show: function() {
		this[AYD](true)
	},
	hide: function() {
		this.hideItems();
		Nist_prototype_hide[POm](this)
	},
	hideItems: function() {
		for (var $ = 0,
		A = this.items.length; $ < A; $++) {
			var _ = this.items[$];
			_.hideMenu()
		}
	},
	showItemMenu: function($) {
		for (var _ = 0,
		B = this.items.length; _ < B; _++) {
			var A = this.items[_];
			if (A == $) A.showMenu();
			else A.hideMenu()
		}
	},
	hasShowItemMenu: function() {
		for (var $ = 0,
		A = this.items.length; $ < A; $++) {
			var _ = this.items[$];
			if (_ && _.menu && _.menu.isPopup) return true
		}
		return false
	},
	setItems: function(_) {
		if (!mini.isArray(_)) return;
		this.removeAll();
		for (var $ = 0,
		A = _.length; $ < A; $++) this.addItem(_[$])
	},
	getItems: function() {
		return this.items
	},
	addItem: function($) {
		if ($ == "-" || $ == "|") {
			mini.append(this._contentEl, "<span class=\"mini-separator\"></span>");
			return
		}
		if (!mini.isControl($) && !mini.getClass($.type)) $.type = "menuitem";
		$ = mini.getAndCreate($);
		this.items.push($);
		this._contentEl.appendChild($.el);
		$.ownerMenu = this;
		mini.append(this._contentEl, this.Z39B());
		this.fire("itemschanged")
	},
	removeItem: function($) {
		$ = mini.get($);
		if (!$) return;
		this.items.remove($);
		this._contentEl.removeChild($.el);
		this.fire("itemschanged")
	},
	removeItemAt: function(_) {
		var $ = this.items[_];
		this.removeItem($)
	},
	removeAll: function() {
		var _ = this.items.clone();
		for (var $ = _.length - 1; $ >= 0; $--) this.removeItem(_[$]);
		this._contentEl.innerHTML = ""
	},
	getGroupItems: function(C) {
		if (!C) return [];
		var A = [];
		for (var _ = 0,
		B = this.items.length; _ < B; _++) {
			var $ = this.items[_];
			if ($[S4OT] == C) A.push($)
		}
		return A
	},
	getItem: function($) {
		if (typeof $ == "number") return this.items[$];
		return $
	},
	setAllowSelectItem: function($) {
		this.allowSelectItem = $
	},
	getAllowSelectItem: function() {
		return this.allowSelectItem
	},
	setSelectedItem: function($) {
		$ = this[SJA]($);
		this._OnItemSelect($)
	},
	getSelectedItem: function($) {
		return this.VZD0
	},
	setTextField: function($) {
		this[XsI] = $
	},
	getTextField: function() {
		return this[XsI]
	},
	setResultAsTree: function($) {
		this[Ajh] = $
	},
	getResultAsTree: function() {
		return this[Ajh]
	},
	setIdField: function($) {
		this[TKUG] = $
	},
	getIdField: function() {
		return this[TKUG]
	},
	setParentField: function($) {
		this[L_o] = $
	},
	getParentField: function() {
		return this[L_o]
	},
	url: "",
	LpO: function() {
		var B = mini.getData(this.url);
		if (!B) B = [];
		if (this[Ajh] == false) B = mini.arrayToTree(B, this.itemsField, this.idField, this[L_o]);
		var _ = mini[J19](B, this.itemsField, this.idField, this[L_o]);
		for (var A = 0,
		C = _.length; A < C; A++) {
			var $ = _[A];
			$.text = $[this.textField]
		}
		this.setItems(B);
		this.fire("load")
	},
	load: function($) {
		if (typeof $ == "string") this.setUrl($);
		else this.setItems($)
	},
	setUrl: function($) {
		this.url = $;
		this.LpO()
	},
	getUrl: function() {
		return this.url
	},
	_OnItemClick: function($, _) {
		var A = {
			item: $,
			isLeaf: !$.menu,
			htmlEvent: _
		};
		if (this.isPopup) this.hide();
		else this.hideItems();
		if (this.allowSelectItem) this.setSelectedItem($);
		this.fire("itemclick", A);
		if (this.ownerItem);
	},
	_OnItemSelect: function($) {
		if (this.VZD0) this.VZD0[TkP](this._XA2);
		this.VZD0 = $;
		if (this.VZD0) this.VZD0[Mr](this._XA2);
		var _ = {
			item: this.VZD0
		};
		this.fire("itemselect", _)
	},
	onItemClick: function(_, $) {
		this.on("itemclick", _, $)
	},
	onItemSelect: function(_, $) {
		this.on("itemselect", _, $)
	},
	parseItems: function(G) {
		var C = [];
		for (var _ = 0,
		F = G.length; _ < F; _++) {
			var B = G[_];
			if (B.className == "separator") {
				C.add("-");
				continue
			}
			var E = mini[$Vy$](B),
			A = E[0],
			D = E[1],
			$ = new EU9B();
			if (!D) {
				mini.applyTo[POm]($, B);
				C.add($);
				continue
			}
			mini.applyTo[POm]($, A);
			$[LV3H](document.body);
			var H = new XL();
			mini.applyTo[POm](H, D);
			$.setMenu(H);
			H[LV3H](document.body);
			C.add($)
		}
		return C.clone()
	},
	getAttrs: function(_) {
		var E = XL[Xc$][Z_s][POm](this, _),
		D = jQuery(_);
		mini[Dm7Q](_, E, ["popupEl", "popupCls", "showAction", "hideAction", "hAlign", "vAlign", "modalStyle", "onbeforeopen", "open", "onbeforeclose", "onclose", "url", "onitemclick", "onitemselect", "textField", "idField", "parentField"]);
		mini[CW7m](_, E, ["resultAsTree"]);
		var A = mini[$Vy$](_),
		$ = this.parseItems(A);
		if ($.length > 0) E.items = $;
		var B = D.attr("vertical");
		if (B) E.vertical = B == "true" ? true: false;
		var C = D.attr("allowSelectItem");
		if (C) E.allowSelectItem = C == "true" ? true: false;
		return E
	}
});
J9_$(XL, "menu");
XLBar = function() {
	XLBar[Xc$][TYcW][POm](this)
};
Mup(XLBar, XL, {
	uiCls: "mini-menubar",
	vertical: false,
	setVertical: function($) {
		this.vertical = false
	}
});
J9_$(XLBar, "menubar");
mini.ContextMenu = function() {
	mini.ContextMenu[Xc$][TYcW][POm](this)
};
Mup(mini.ContextMenu, XL, {
	uiCls: "mini-contextmenu",
	vertical: true,
	visible: false,
	setVertical: function($) {
		this.vertical = true
	}
});
J9_$(mini.ContextMenu, "contextmenu");
EU9B = function() {
	EU9B[Xc$][TYcW][POm](this)
};
Mup(EU9B, DZV, {
	text: "",
	iconCls: "",
	iconStyle: "",
	iconPosition: "left",
	showIcon: true,
	showAllow: true,
	checked: false,
	checkOnClick: false,
	groupName: "",
	_hoverCls: "mini-menuitem-hover",
	JvuQ: "mini-menuitem-pressed",
	Sl6f: "mini-menuitem-checked",
	_clearBorder: false,
	menu: null,
	uiCls: "mini-menuitem",
	_create: function() {
		var $ = this.el = document.createElement("div");
		this.el.className = "mini-menuitem";
		this.el.innerHTML = "<div class=\"mini-menuitem-inner\"><div class=\"mini-menuitem-icon\"></div><div class=\"mini-menuitem-text\"></div><div class=\"mini-menuitem-allow\"></div></div>";
		this.Dh = this.el.firstChild;
		this.MvGu = this.Dh.firstChild;
		this.H4 = this.Dh.childNodes[1];
		this.allowEl = this.Dh.lastChild
	},
	_initEvents: function() {
		VPoJ(this.el, "click", this.Vj6T, this);
		VPoJ(this.el, "mouseup", this.UP5J, this);
		VPoJ(this.el, "mouseover", this.Nv5, this);
		VPoJ(this.el, "mouseout", this.XKd, this)
	},
	destroy: function($) {
		this.menu = null;
		EU9B[Xc$][$Kt][POm](this, $)
	},
	within: function($) {
		if (Dmv(this.el, $.target)) return true;
		if (this.menu && this.menu[W05]($)) return true;
		return false
	},
	doUpdate: function() {
		if (this.H4) this.H4.innerHTML = this.text;
		if (this.MvGu) {
			MsRJ(this.MvGu, this[QrZ]);
			Rw(this.MvGu, this.iconCls);
			this.MvGu.style.display = (this[QrZ] || this.iconCls) ? "block": "none"
		}
		if (this.iconPosition == "top") Rw(this.el, "mini-menuitem-icontop");
		else EhVe(this.el, "mini-menuitem-icontop");
		if (this.checked) Rw(this.el, this.Sl6f);
		else EhVe(this.el, this.Sl6f);
		if (this.allowEl) if (this.menu && this.menu.items.length > 0) this.allowEl.style.display = "block";
		else this.allowEl.style.display = "none"
	},
	setText: function($) {
		this.text = $;
		this[WRl]()
	},
	getText: function() {
		return this.text
	},
	setIconCls: function($) {
		EhVe(this.MvGu, this.iconCls);
		this.iconCls = $;
		this[WRl]()
	},
	getIconCls: function() {
		return this.iconCls
	},
	setIconStyle: function($) {
		this[QrZ] = $;
		this[WRl]()
	},
	getIconStyle: function() {
		return this[QrZ]
	},
	setIconPosition: function($) {
		this.iconPosition = $;
		this[WRl]()
	},
	getIconPosition: function() {
		return this.iconPosition
	},
	setCheckOnClick: function($) {
		this[Sak] = $;
		if ($) Rw(this.el, "mini-menuitem-showcheck");
		else EhVe(this.el, "mini-menuitem-showcheck")
	},
	getCheckOnClick: function() {
		return this[Sak]
	},
	setChecked: function($) {
		if (this.checked != $) {
			this.checked = $;
			this[WRl]();
			this.fire("checkedchanged")
		}
	},
	getChecked: function() {
		return this.checked
	},
	setGroupName: function($) {
		if (this[S4OT] != $) this[S4OT] = $
	},
	getGroupName: function() {
		return this[S4OT]
	},
	setChildren: function($) {
		this.setMenu($)
	},
	setMenu: function($) {
		if (mini.isArray($)) $ = {
			type: "menu",
			items: $
		};
		if (this.menu !== $) {
			this.menu = mini.getAndCreate($);
			this.menu.hide();
			this.menu.ownerItem = this;
			this[WRl]();
			this.menu.on("itemschanged", this._8Cl, this)
		}
	},
	getMenu: function() {
		return this.menu
	},
	showMenu: function() {
		if (this.menu) {
			this.menu.setHideAction("outerclick");
			var $ = {
				hAlign: "outright",
				vAlign: "top",
				outHAlign: "outleft",
				popupCls: "mini-menu-popup"
			};
			if (this.ownerMenu && this.ownerMenu.vertical == false) {
				$.hAlign = "left";
				$.vAlign = "below";
				$.outHAlign = null
			}
			this.menu.showAtEl(this.el, $)
		}
	},
	hideMenu: function() {
		if (this.menu) this.menu.hide()
	},
	hide: function() {
		this.hideMenu();
		this[AYD](false)
	},
	_8Cl: function($) {
		this[WRl]()
	},
	getTopMenu: function() {
		if (this.ownerMenu) if (this.ownerMenu.ownerItem) return this.ownerMenu.ownerItem.getTopMenu();
		else return this.ownerMenu;
		return null
	},
	Vj6T: function(D) {
		if (this[Ot]()) return;
		if (this[Sak]) if (this.ownerMenu && this[S4OT]) {
			var B = this.ownerMenu.getGroupItems(this[S4OT]);
			if (B.length > 0) {
				if (this.checked == false) {
					for (var _ = 0,
					C = B.length; _ < C; _++) {
						var $ = B[_];
						if ($ != this) $.setChecked(false)
					}
					this.setChecked(true)
				}
			} else this.setChecked(!this.checked)
		} else this.setChecked(!this.checked);
		this.fire("click");
		var A = this.getTopMenu();
		if (A) A._OnItemClick(this, D)
	},
	UP5J: function(_) {
		if (this[Ot]()) return;
		if (this.ownerMenu) {
			var $ = this;
			setTimeout(function() {
				if ($[S8B]()) $.ownerMenu.showItemMenu($)
			},
			1)
		}
	},
	Nv5: function($) {
		if (this[Ot]()) return;
		Rw(this.el, this._hoverCls);
		if (this.ownerMenu) if (this.ownerMenu.isVertical() == true) this.ownerMenu.showItemMenu(this);
		else if (this.ownerMenu.hasShowItemMenu()) this.ownerMenu.showItemMenu(this)
	},
	XKd: function($) {
		EhVe(this.el, this._hoverCls)
	},
	onClick: function(_, $) {
		this.on("click", _, $)
	},
	onCheckedChanged: function(_, $) {
		this.on("checkedchanged", _, $)
	},
	getAttrs: function($) {
		var A = EU9B[Xc$][Z_s][POm](this, $),
		_ = jQuery($);
		A.text = $.innerHTML;
		mini[Dm7Q]($, A, ["text", "iconCls", "iconStyle", "iconPosition", "groupName", "onclick", "oncheckedchanged"]);
		mini[CW7m]($, A, ["checkOnClick", "checked"]);
		return A
	}
});
J9_$(EU9B, "menuitem");
Hi1b = function() {
	this.Yse();
	Hi1b[Xc$][TYcW][POm](this)
};
Mup(Hi1b, DZV, {
	width: 180,
	activeIndex: -1,
	autoCollapse: false,
	groupCls: "",
	groupStyle: "",
	groupHeaderCls: "",
	groupHeaderStyle: "",
	groupBodyCls: "",
	groupBodyStyle: "",
	groupHoverCls: "",
	groupActiveCls: "",
	allowAnim: true,
	set: function(A) {
		if (typeof A == "string") return this;
		var $ = this.Bfj;
		this.Bfj = false;
		var _ = A.activeIndex;
		delete A.activeIndex;
		Hi1b[Xc$].set[POm](this, A);
		if (mini.isNumber(_)) this.setActiveIndex(_);
		this.Bfj = $;
		this[QM]();
		return this
	},
	uiCls: "mini-outlookbar",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "mini-outlookbar";
		this.el.innerHTML = "<div class=\"mini-outlookbar-border\"></div>";
		this.$Ar = this.el.firstChild
	},
	_initEvents: function() {
		Xs(function() {
			VPoJ(this.el, "click", this.Vj6T, this)
		},
		this)
	},
	_5: function($) {
		return this.uid + "$" + $._id
	},
	_GroupId: 1,
	Yse: function() {
		this.groups = []
	},
	C3V: function(_) {
		var H = this._5(_),
		G = "<div id=\"" + H + "\" class=\"mini-outlookbar-group " + _.cls + "\" style=\"" + _.style + "\">" + "<div class=\"mini-outlookbar-groupHeader " + _.headerCls + "\" style=\"" + _.headerStyle + ";\"></div>" + "<div class=\"mini-outlookbar-groupBody " + _.bodyCls + "\" style=\"" + _.bodyStyle + ";\"></div>" + "</div>",
		A = mini.append(this.$Ar, G),
		E = A.lastChild,
		C = _.body;
		delete _.body;
		if (C) {
			if (!mini.isArray(C)) C = [C];
			for (var $ = 0,
			F = C.length; $ < F; $++) {
				var B = C[$];
				mini.append(E, B)
			}
			C.length = 0
		}
		if (_.bodyParent) {
			var D = _.bodyParent;
			while (D.firstChild) E.appendChild(D.firstChild)
		}
		delete _.bodyParent;
		return A
	},
	createGroup: function(_) {
		var $ = mini.copyTo({
			_id: this._GroupId++,
			name: "",
			title: "",
			cls: "",
			style: "",
			iconCls: "",
			iconStyle: "",
			headerCls: "",
			headerStyle: "",
			bodyCls: "",
			bodyStyle: "",
			visible: true,
			enabled: true,
			showCollapseButton: true,
			expanded: true
		},
		_);
		return $
	},
	setGroups: function(_) {
		if (!mini.isArray(_)) return;
		this.removeAll();
		for (var $ = 0,
		A = _.length; $ < A; $++) this.addGroup(_[$])
	},
	getGroups: function() {
		return this.groups
	},
	addGroup: function(_, $) {
		if (typeof _ == "string") _ = {
			title: _
		};
		_ = this.createGroup(_);
		if (typeof $ != "number") $ = this.groups.length;
		this.groups.insert($, _);
		var B = this.C3V(_);
		_._el = B;
		var $ = this.groups.indexOf(_),
		A = this.groups[$ + 1];
		if (A) {
			var C = this.getGroupEl(A);
			jQuery(C).before(B)
		}
		this[WRl]();
		return _
	},
	updateGroup: function($, _) {
		var $ = this.getGroup($);
		if (!$) return;
		mini.copyTo($, _);
		this[WRl]()
	},
	removeGroup: function($) {
		$ = this.getGroup($);
		if (!$) return;
		var _ = this.getGroupEl($);
		if (_) _.parentNode.removeChild(_);
		this.groups.remove($);
		this[WRl]()
	},
	removeAll: function() {
		for (var $ = this.groups.length - 1; $ >= 0; $--) this.removeGroup($)
	},
	moveGroup: function(_, $) {
		_ = this.getGroup(_);
		if (!_) return;
		target = this.getGroup($);
		var A = this.getGroupEl(_);
		this.groups.remove(_);
		if (target) {
			$ = this.groups.indexOf(target);
			this.groups.insert($, _);
			var B = this.getGroupEl(target);
			jQuery(B).before(A)
		} else {
			this.groups.add(_);
			this.$Ar.appendChild(A)
		}
		this[WRl]()
	},
	doUpdate: function() {
		for (var _ = 0,
		E = this.groups.length; _ < E; _++) {
			var A = this.groups[_],
			B = A._el,
			D = B.firstChild,
			C = B.lastChild,
			$ = "<div class=\"mini-outlookbar-icon " + A.iconCls + "\" style=\"" + A[QrZ] + ";\"></div>",
			F = "<div class=\"mini-tools\"><span class=\"mini-tools-collapse\"></span></div>" + ((A[QrZ] || A.iconCls) ? $: "") + "<div class=\"mini-outlookbar-groupTitle\">" + A.title + "</div><div style=\"clear:both;\"></div>";
			D.innerHTML = F;
			if (A.enabled) EhVe(B, "mini-disabled");
			else Rw(B, "mini-disabled");
			Rw(B, A.cls);
			MsRJ(B, A.style);
			Rw(C, A.bodyCls);
			MsRJ(C, A.bodyStyle);
			Rw(D, A.headerCls);
			MsRJ(D, A.headerStyle);
			EhVe(B, "mini-outlookbar-firstGroup");
			EhVe(B, "mini-outlookbar-lastGroup");
			if (_ == 0) Rw(B, "mini-outlookbar-firstGroup");
			if (_ == E - 1) Rw(B, "mini-outlookbar-lastGroup")
		}
		this[QM]()
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		if (this.I2u) return;
		this.XObc();
		for (var $ = 0,
		H = this.groups.length; $ < H; $++) {
			var _ = this.groups[$],
			B = _._el,
			D = B.lastChild;
			if (_.expanded) {
				Rw(B, "mini-outlookbar-expand");
				EhVe(B, "mini-outlookbar-collapse")
			} else {
				EhVe(B, "mini-outlookbar-expand");
				Rw(B, "mini-outlookbar-collapse")
			}
			D.style.height = "auto";
			D.style.display = _.expanded ? "block": "none";
			B.style.display = _.visible ? "": "none";
			var A = WDf(B, true),
			E = TNY(D),
			G = Ps$(D);
			if (jQuery.boxModel) A = A - E.left - E.right - G.left - G.right;
			D.style.width = A + "px"
		}
		var F = this[_Y1](),
		C = this.getActiveGroup();
		if (!F && this[Hlg] && C) {
			B = this.getGroupEl(this.activeIndex);
			B.lastChild.style.height = this.$N() + "px"
		}
		mini.layout(this.$Ar)
	},
	XObc: function() {
		if (this[_Y1]()) this.$Ar.style.height = "auto";
		else {
			var $ = this[Ls](true);
			if (!jQuery.boxModel) {
				var _ = Ps$(this.$Ar);
				$ = $ + _.top + _.bottom
			}
			if ($ < 0) $ = 0;
			this.$Ar.style.height = $ + "px"
		}
	},
	$N: function() {
		var C = jQuery(this.el).height(),
		K = Ps$(this.$Ar);
		C = C - K.top - K.bottom;
		var A = this.getActiveGroup(),
		E = 0;
		for (var F = 0,
		D = this.groups.length; F < D; F++) {
			var _ = this.groups[F],
			G = this.getGroupEl(_);
			if (_.visible == false || _ == A) continue;
			var $ = G.lastChild.style.display;
			G.lastChild.style.display = "none";
			var J = jQuery(G).outerHeight();
			G.lastChild.style.display = $;
			var L = UG(G);
			J = J + L.top + L.bottom;
			E += J
		}
		C = C - E;
		var H = this.getGroupEl(this.activeIndex);
		C = C - jQuery(H.firstChild).outerHeight();
		if (jQuery.boxModel) {
			var B = TNY(H.lastChild),
			I = Ps$(H.lastChild);
			C = C - B.top - B.bottom - I.top - I.bottom
		}
		B = TNY(H),
		I = Ps$(H),
		L = UG(H);
		C = C - L.top - L.bottom;
		C = C - B.top - B.bottom - I.top - I.bottom;
		if (C < 0) C = 0;
		return C
	},
	getGroup: function($) {
		if (typeof $ == "object") return $;
		if (typeof $ == "number") return this.groups[$];
		else for (var _ = 0,
		B = this.groups.length; _ < B; _++) {
			var A = this.groups[_];
			if (A.name == $) return A
		}
	},
	IZ: function(B) {
		for (var $ = 0,
		A = this.groups.length; $ < A; $++) {
			var _ = this.groups[$];
			if (_._id == B) return _
		}
	},
	getGroupEl: function($) {
		var _ = this.getGroup($);
		if (!_) return null;
		return _._el
	},
	getGroupBodyEl: function($) {
		var _ = this.getGroupEl($);
		if (_) return _.lastChild;
		return null
	},
	setAutoCollapse: function($) {
		this[Hlg] = $
	},
	getAutoCollapse: function() {
		return this[Hlg]
	},
	setActiveIndex: function(_) {
		var $ = this.getGroup(_),
		A = this.getGroup(this.activeIndex),
		B = $ != A;
		if ($) this.activeIndex = this.groups.indexOf($);
		else this.activeIndex = -1;
		$ = this.getGroup(this.activeIndex);
		if ($) {
			var C = this.allowAnim;
			this.allowAnim = false;
			this.expandGroup($);
			this.allowAnim = C
		}
	},
	getActiveIndex: function() {
		return this.activeIndex
	},
	getActiveGroup: function() {
		return this.getGroup(this.activeIndex)
	},
	showGroup: function($) {
		$ = this.getGroup($);
		if (!$ || $.visible == true) return;
		$.visible = true;
		this[WRl]()
	},
	hideGroup: function($) {
		$ = this.getGroup($);
		if (!$ || $.visible == false) return;
		$.visible = false;
		this[WRl]()
	},
	toggleGroup: function($) {
		$ = this.getGroup($);
		if (!$) return;
		if ($.expanded) this.collapseGroup($);
		else this.expandGroup($)
	},
	collapseGroup: function(_) {
		_ = this.getGroup(_);
		if (!_) return;
		var D = _.expanded,
		E = 0;
		if (this[Hlg] && !this[_Y1]()) E = this.$N();
		var F = false;
		_.expanded = false;
		var $ = this.groups.indexOf(_);
		if ($ == this.activeIndex) {
			this.activeIndex = -1;
			F = true
		}
		var C = this.getGroupBodyEl(_);
		if (this.allowAnim && D) {
			this.I2u = true;
			C.style.display = "block";
			C.style.height = "auto";
			if (this[Hlg] && !this[_Y1]()) C.style.height = E + "px";
			var A = {
				height: "1px"
			};
			Rw(C, "mini-outlookbar-overflow");
			var B = this,
			H = jQuery(C);
			H.animate(A, 180,
			function() {
				B.I2u = false;
				EhVe(C, "mini-outlookbar-overflow");
				B[QM]()
			})
		} else this[QM]();
		var G = {
			group: _,
			index: this.groups.indexOf(_),
			name: _.name
		};
		this.fire("Collapse", G);
		if (F) this.fire("activechanged")
	},
	expandGroup: function($) {
		$ = this.getGroup($);
		if (!$) return;
		var H = $.expanded;
		$.expanded = true;
		this.activeIndex = this.groups.indexOf($);
		fire = true;
		if (this[Hlg]) for (var D = 0,
		B = this.groups.length; D < B; D++) {
			var C = this.groups[D];
			if (C.expanded && C != $) this.collapseGroup(C)
		}
		var G = this.getGroupBodyEl($);
		if (this.allowAnim && H == false) {
			this.I2u = true;
			G.style.display = "block";
			if (this[Hlg] && !this[_Y1]()) {
				var A = this.$N();
				G.style.height = (A) + "px"
			} else G.style.height = "auto";
			var _ = J6(G);
			G.style.height = "1px";
			var E = {
				height: _ + "px"
			},
			I = G.style.overflow;
			G.style.overflow = "hidden";
			Rw(G, "mini-outlookbar-overflow");
			var F = this,
			K = jQuery(G);
			K.animate(E, 180,
			function() {
				G.style.overflow = I;
				EhVe(G, "mini-outlookbar-overflow");
				F.I2u = false;
				F[QM]()
			})
		} else this[QM]();
		var J = {
			group: $,
			index: this.groups.indexOf($),
			name: $.name
		};
		this.fire("Expand", J);
		if (fire) this.fire("activechanged")
	},
	Zb: function($) {
		$ = this.getGroup($);
		var _ = {
			group: $,
			groupIndex: this.groups.indexOf($),
			groupName: $.name,
			cancel: false
		};
		if ($.expanded) {
			this.fire("BeforeCollapse", _);
			if (_.cancel == false) this.collapseGroup($)
		} else {
			this.fire("BeforeExpand", _);
			if (_.cancel == false) this.expandGroup($)
		}
	},
	CnRj: function(B) {
		var _ = BD(B.target, "mini-outlookbar-group");
		if (!_) return null;
		var $ = _.id.split("$"),
		A = $[$.length - 1];
		return this.IZ(A)
	},
	Vj6T: function(A) {
		if (this.I2u) return;
		var _ = BD(A.target, "mini-outlookbar-groupHeader");
		if (!_) return;
		var $ = this.CnRj(A);
		if (!$) return;
		this.Zb($)
	},
	parseGroups: function(D) {
		var A = [];
		for (var $ = 0,
		C = D.length; $ < C; $++) {
			var B = D[$],
			_ = {};
			A.push(_);
			_.style = B.style.cssText;
			mini[Dm7Q](B, _, ["name", "title", "cls", "iconCls", "iconStyle", "headerCls", "headerStyle", "bodyCls", "bodyStyle"]);
			mini[CW7m](B, _, ["visible", "enabled", "showCollapseButton", "expanded"]);
			_.bodyParent = B
		}
		return A
	},
	getAttrs: function($) {
		var A = Hi1b[Xc$][Z_s][POm](this, $);
		mini[Dm7Q]($, A, ["onactivechanged", "oncollapse", "onexpand"]);
		mini[CW7m]($, A, ["autoCollapse", "allowAnim"]);
		mini[_i]($, A, ["activeIndex"]);
		var _ = mini[$Vy$]($);
		A.groups = this.parseGroups(_);
		return A
	}
});
J9_$(Hi1b, "outlookbar");
_Rs = function() {
	_Rs[Xc$][TYcW][POm](this);
	this.data = []
};
Mup(_Rs, Hi1b, {
	url: "",
	textField: "text",
	iconField: "iconCls",
	urlField: "url",
	resultAsTree: false,
	itemsField: "children",
	idField: "id",
	parentField: "pid",
	style: "width:100%;height:100%;",
	set: function(_) {
		if (typeof _ == "string") return this;
		var A = _.url;
		delete _.url;
		var $ = _.activeIndex;
		delete _.activeIndex;
		_Rs[Xc$].set[POm](this, _);
		if (A) this.setUrl(A);
		if (mini.isNumber($)) this.setActiveIndex($);
		return this
	},
	uiCls: "mini-outlookmenu",
	destroy: function(B) {
		if (this.PTv) {
			var _ = this.PTv.clone();
			for (var $ = 0,
			C = _.length; $ < C; $++) {
				var A = _[$];
				A[$Kt]()
			}
			this.PTv.length = 0
		}
		_Rs[Xc$][$Kt][POm](this, B)
	},
	LpO: function() {
		var B = mini.getData(this.url);
		if (!B) B = [];
		if (this[Ajh] == false) B = mini.arrayToTree(B, this.itemsField, this.idField, this[L_o]);
		var _ = mini[J19](B, this.itemsField, this.idField, this[L_o]);
		for (var A = 0,
		C = _.length; A < C; A++) {
			var $ = _[A];
			$.text = $[this.textField];
			$.url = $[this.urlField];
			$.iconCls = $[this.iconField]
		}
		this.createNavBarMenu(B);
		this.fire("load")
	},
	load: function($) {
		if (typeof $ == "string") this.setUrl($);
		else this.createNavBarMenu($)
	},
	setUrl: function($) {
		this.url = $;
		this.LpO()
	},
	getUrl: function() {
		return this.url
	},
	setTextField: function($) {
		this[XsI] = $
	},
	getTextField: function() {
		return this[XsI]
	},
	setIconField: function($) {
		this.iconField = $
	},
	getIconField: function() {
		return this.iconField
	},
	setUrlField: function($) {
		this[FQZ] = $
	},
	getUrlField: function() {
		return this[FQZ]
	},
	setResultAsTree: function($) {
		this[Ajh] = $
	},
	getResultAsTree: function() {
		return this[Ajh]
	},
	setNodesField: function($) {
		this.nodesField = $
	},
	getNodesField: function() {
		return this.nodesField
	},
	setIdField: function($) {
		this[TKUG] = $
	},
	getIdField: function() {
		return this[TKUG]
	},
	setParentField: function($) {
		this[L_o] = $
	},
	getParentField: function() {
		return this[L_o]
	},
	HJ5N: null,
	getSelected: function() {
		return this.HJ5N
	},
	getAttrs: function($) {
		var _ = _Rs[Xc$][Z_s][POm](this, $);
		_.text = $.innerHTML;
		mini[Dm7Q]($, _, ["url", "textField", "urlField", "idField", "parentField", "itemsField", "iconField", "onitemclick", "onitemselect"]);
		mini[CW7m]($, _, ["resultAsTree"]);
		return _
	},
	autoCollapse: true,
	activeIndex: 0,
	createNavBarMenu: function(D) {
		if (!mini.isArray(D)) D = [];
		this.data = D;
		var B = [];
		for (var _ = 0,
		E = this.data.length; _ < E; _++) {
			var $ = this.data[_],
			A = {};
			A.title = $.text;
			A.titleCls = $.iconCls;
			B.push(A);
			A._children = $[this.itemsField]
		}
		this.setGroups(B);
		this.setActiveIndex(this.activeIndex);
		this.PTv = [];
		for (_ = 0, E = this.groups.length; _ < E; _++) {
			var A = this.groups[_],
			C = this.getGroupBodyEl(A),
			F = new XL();
			F.set({
				style: "width:100%;height:100%;border:0;background:none",
				allowSelectItem: true,
				items: A._children
			});
			F[LV3H](C);
			F.on("itemclick", this.Odo, this);
			F.on("itemselect", this.Fm7, this);
			this.PTv.push(F);
			delete A._children
		}
	},
	Odo: function(_) {
		var $ = {
			item: _.item,
			htmlEvent: _.htmlEvent
		};
		this.fire("itemclick", $)
	},
	Fm7: function(C) {
		if (!C.item) return;
		for (var $ = 0,
		A = this.PTv.length; $ < A; $++) {
			var B = this.PTv[$];
			if (B != C.sender) B.setSelectedItem(null)
		}
		var _ = {
			item: C.item,
			htmlEvent: C.htmlEvent
		};
		this.HJ5N = C.item;
		this.fire("itemselect", _)
	}
});
J9_$(_Rs, "outlookmenu");
HuQ = function() {
	HuQ[Xc$][TYcW][POm](this);
	this.data = []
};
Mup(HuQ, Hi1b, {
	url: "",
	textField: "text",
	iconField: "iconCls",
	urlField: "url",
	resultAsTree: false,
	nodesField: "children",
	idField: "id",
	parentField: "pid",
	style: "width:100%;height:100%;",
	set: function(_) {
		if (typeof _ == "string") return this;
		var A = _.url;
		delete _.url;
		var $ = _.activeIndex;
		delete _.activeIndex;
		HuQ[Xc$].set[POm](this, _);
		if (A) this.setUrl(A);
		if (mini.isNumber($)) this.setActiveIndex($);
		return this
	},
	uiCls: "mini-outlooktree",
	destroy: function(B) {
		if (this.PW) {
			var _ = this.PW.clone();
			for (var $ = 0,
			C = _.length; $ < C; $++) {
				var A = _[$];
				A[$Kt]()
			}
			this.PW.length = 0
		}
		HuQ[Xc$][$Kt][POm](this, B)
	},
	LpO: function() {
		var B = mini.getData(this.url);
		if (!B) B = [];
		if (this[Ajh] == false) B = mini.arrayToTree(B, this.nodesField, this.idField, this[L_o]);
		var _ = mini[J19](B, this.nodesField, this.idField, this[L_o]);
		for (var A = 0,
		C = _.length; A < C; A++) {
			var $ = _[A];
			$.text = $[this.textField];
			$.url = $[this.urlField];
			$.iconCls = $[this.iconField]
		}
		this.createNavBarTree(B);
		this.fire("load")
	},
	load: function($) {
		if (typeof $ == "string") this.setUrl($);
		else this.createNavBarTree($)
	},
	setUrl: function($) {
		this.url = $;
		this.LpO()
	},
	getUrl: function() {
		return this.url
	},
	setTextField: function($) {
		this[XsI] = $
	},
	getTextField: function() {
		return this[XsI]
	},
	setIconField: function($) {
		this.iconField = $
	},
	getIconField: function() {
		return this.iconField
	},
	setUrlField: function($) {
		this[FQZ] = $
	},
	getUrlField: function() {
		return this[FQZ]
	},
	setResultAsTree: function($) {
		this[Ajh] = $
	},
	getResultAsTree: function() {
		return this[Ajh]
	},
	setNodesField: function($) {
		this.nodesField = $
	},
	getNodesField: function() {
		return this.nodesField
	},
	setIdField: function($) {
		this[TKUG] = $
	},
	getIdField: function() {
		return this[TKUG]
	},
	setParentField: function($) {
		this[L_o] = $
	},
	getParentField: function() {
		return this[L_o]
	},
	HJ5N: null,
	getSelected: function() {
		return this.HJ5N
	},
	selectNode: function(_) {
		_ = this[Lks](_);
		if (!_) return;
		var $ = this._getOwnerTree(_);
		$.selectNode(_)
	},
	expandPath: function(_) {
		_ = this[Lks](_);
		if (!_) return;
		var $ = this._getOwnerTree(_);
		$.expandPath(_);
		this.expandGroup($._ownerGroup)
	},
	getNode: function(A) {
		for (var $ = 0,
		C = this.PW.length; $ < C; $++) {
			var _ = this.PW[$],
			B = _[Lks](A);
			if (B) return B
		}
		return null
	},
	_getOwnerTree: function(A) {
		if (!A) return;
		for (var $ = 0,
		B = this.PW.length; $ < B; $++) {
			var _ = this.PW[$];
			if (_.ZE[A._id]) return _
		}
	},
	expandOnLoad: false,
	setExpandOnLoad: function($) {
		this.expandOnLoad = $
	},
	getExpandOnLoad: function() {
		return this.expandOnLoad
	},
	getAttrs: function(_) {
		var A = HuQ[Xc$][Z_s][POm](this, _);
		A.text = _.innerHTML;
		mini[Dm7Q](_, A, ["url", "textField", "urlField", "idField", "parentField", "nodesField", "iconField", "onnodeclick", "onnodeselect", "onnodemousedown", "expandOnLoad"]);
		mini[CW7m](_, A, ["resultAsTree"]);
		if (A.expandOnLoad) {
			var $ = parseInt(A.expandOnLoad);
			if (mini.isNumber($)) A.expandOnLoad = $;
			else A.expandOnLoad = A.expandOnLoad == "true" ? true: false
		}
		return A
	},
	autoCollapse: true,
	activeIndex: 0,
	createNavBarTree: function(D) {
		if (!mini.isArray(D)) D = [];
		this.data = D;
		var B = [];
		for (var _ = 0,
		E = this.data.length; _ < E; _++) {
			var $ = this.data[_],
			A = {};
			A.title = $.text;
			A.titleCls = $.iconCls;
			B.push(A);
			A._children = $[this.nodesField]
		}
		this.setGroups(B);
		this.setActiveIndex(this.activeIndex);
		this.PW = [];
		for (_ = 0, E = this.groups.length; _ < E; _++) {
			var A = this.groups[_],
			C = this.getGroupBodyEl(A),
			D = new DaS();
			D.set({
				expandOnLoad: this.expandOnLoad,
				showTreeIcon: true,
				style: "width:100%;height:100%;border:0;background:none",
				data: A._children
			});
			D[LV3H](C);
			D.on("nodeclick", this.Qik, this);
			D.on("nodeselect", this.RMu, this);
			D.on("nodemousedown", this.__OnNodeMouseDown, this);
			this.PW.push(D);
			delete A._children;
			D._ownerGroup = A
		}
	},
	__OnNodeMouseDown: function(_) {
		var $ = {
			node: _.node,
			isLeaf: _.sender.isLeaf(_.node),
			htmlEvent: _.htmlEvent
		};
		this.fire("nodemousedown", $)
	},
	Qik: function(_) {
		var $ = {
			node: _.node,
			isLeaf: _.sender.isLeaf(_.node),
			htmlEvent: _.htmlEvent
		};
		this.fire("nodeclick", $)
	},
	RMu: function(C) {
		if (!C.node) return;
		for (var $ = 0,
		B = this.PW.length; $ < B; $++) {
			var A = this.PW[$];
			if (A != C.sender) A.selectNode(null)
		}
		var _ = {
			node: C.node,
			isLeaf: C.sender.isLeaf(C.node),
			htmlEvent: C.htmlEvent
		};
		this.HJ5N = C.node;
		this.fire("nodeselect", _)
	}
});
J9_$(HuQ, "outlooktree");
mini.NavBar = function() {
	mini.NavBar[Xc$][TYcW][POm](this)
};
Mup(mini.NavBar, Hi1b, {
	uiCls: "mini-navbar"
});
J9_$(mini.NavBar, "navbar");
mini.NavBarMenu = function() {
	mini.NavBarMenu[Xc$][TYcW][POm](this)
};
Mup(mini.NavBarMenu, _Rs, {
	uiCls: "mini-navbarmenu"
});
J9_$(mini.NavBarMenu, "navbarmenu");
mini.NavBarTree = function() {
	mini.NavBarTree[Xc$][TYcW][POm](this)
};
Mup(mini.NavBarTree, HuQ, {
	uiCls: "mini-navbartree"
});
J9_$(mini.NavBarTree, "navbartree");
mini.ToolBar = function() {
	mini.ToolBar[Xc$][TYcW][POm](this)
};
Mup(mini.ToolBar, DZV, {
	_clearBorder: false,
	style: "",
	uiCls: "mini-toolbar",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "mini-toolbar"
	},
	_initEvents: function() {},
	doLayout: function() {
		if (!this.canLayout()) return;
		var A = mini[$Vy$](this.el, true);
		for (var $ = 0,
		_ = A.length; $ < _; $++) mini.layout(A[$])
	},
	set_bodyParent: function($) {
		if (!$) return;
		this.el = $;
		this[QM]()
	},
	getAttrs: function($) {
		var _ = {};
		mini[Dm7Q]($, _, ["id", "borderStyle"]);
		this.el = $;
		this.el.uid = this.uid;
		return _
	}
});
J9_$(mini.ToolBar, "toolbar");
DaS = function($) {
	this._ajaxOption = {
		async: false,
		type: "get"
	};
	this.root = {
		_id: -1,
		_pid: "",
		_level: -1
	};
	this.root[this.nodesField] = [];
	this.ZE = {};
	this.PhIu = {};
	this._viewNodes = null;
	DaS[Xc$][TYcW][POm](this, $);
	this.on("beforeexpand",
	function(B) {
		var $ = B.node,
		A = this.isLeaf($),
		_ = $[this.nodesField];
		if (!A && (!_ || _.length == 0)) {
			B.cancel = true;
			this.loadNode($)
		}
	},
	this);
	this[WRl]()
};
DaS.NodeUID = 1;
var lastNodeLevel = [];
Mup(DaS, DZV, {
	isTree: true,
	K_7P: "block",
	removeOnCollapse: true,
	expandOnDblClick: true,
	value: "",
	Qbs: null,
	allowSelect: true,
	showCheckBox: false,
	showFolderCheckBox: true,
	showExpandButtons: true,
	enableHotTrack: true,
	showArrow: false,
	expandOnLoad: false,
	delimiter: ",",
	url: "",
	root: null,
	resultAsTree: true,
	parentField: "pid",
	idField: "id",
	textField: "text",
	iconField: "iconCls",
	nodesField: "children",
	showTreeIcon: false,
	showTreeLines: true,
	checkRecursive: false,
	allowAnim: true,
	C22: "mini-tree-checkbox",
	Ii4C: "mini-tree-selectedNode",
	E_rk: "mini-tree-node-hover",
	leafIcon: "mini-tree-leaf",
	folderIcon: "mini-tree-folder",
	RzD: "mini-tree-border",
	J0fr: "mini-tree-header",
	F19: "mini-tree-body",
	FN: "mini-tree-node",
	IKc: "mini-tree-nodes",
	TLv: "mini-tree-expand",
	_aw: "mini-tree-collapse",
	$G$: "mini-tree-node-ecicon",
	O_q: "mini-tree-nodeshow",
	set: function(A) {
		if (typeof A == "string") return this;
		var $ = A.value;
		delete A.value;
		var B = A.url;
		delete A.url;
		var _ = A.data;
		delete A.data;
		DaS[Xc$].set[POm](this, A);
		if (!mini.isNull(_)) this[Uq0](_);
		if (!mini.isNull(B)) this.setUrl(B);
		if (!mini.isNull($)) this[G3S]($);
		return this
	},
	uiCls: "mini-tree",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "mini-tree";
		if (this[QTS0] == true) Rw(this.el, "mini-tree-treeLine");
		this.el.style.display = "block";
		this.$Ar = mini.append(this.el, "<div class=\"" + this.RzD + "\">" + "<div class=\"" + this.J0fr + "\"></div><div class=\"" + this.F19 + "\"></div></div>");
		this.U2N = this.$Ar.childNodes[0];
		this.LLB = this.$Ar.childNodes[1];
		this._DragDrop = new Ksp(this)
	},
	_initEvents: function() {
		Xs(function() {
			VPoJ(this.el, "click", this.Vj6T, this);
			VPoJ(this.el, "dblclick", this.QUTX, this);
			VPoJ(this.el, "mousedown", this.HG_, this);
			VPoJ(this.el, "mousemove", this.MAb, this);
			VPoJ(this.el, "mouseout", this.XKd, this)
		},
		this)
	},
	load: function($) {
		if (typeof $ == "string") {
			this.url = $;
			this.LpO({},
			this.root)
		} else this[Uq0]($)
	},
	setData: function($) {
		this[_PR]($);
		this.data = $
	},
	getData: function() {
		return this.data
	},
	toArray: function() {
		return this.getList()
	},
	getList: function() {
		if (!this.H5) {
			this.H5 = mini[J19](this.root[this.nodesField], this.nodesField, this.idField, this.parentField, "-1");
			this._indexs = {};
			for (var $ = 0,
			A = this.H5.length; $ < A; $++) {
				var _ = this.H5[$];
				this._indexs[_[this.idField]] = $
			}
		}
		return this.H5
	},
	_clearTree: function() {
		this.H5 = null;
		this._indexs = null
	},
	loadData: function($) {
		if (!mini.isArray($)) $ = [];
		this.root[this.nodesField] = $;
		this.Yw6(this.root, null);
		this.cascadeChild(this.root,
		function(_) {
			if (mini.isNull(_.expanded)) {
				var $ = this.getLevel(_);
				if (this.expandOnLoad === true || (mini.isNumber(this.expandOnLoad) && $ <= this.expandOnLoad)) _.expanded = true;
				else _.expanded = false
			}
		},
		this);
		this._viewNodes = null;
		this[WRl]()
	},
	clearData: function() {
		this[_PR]([])
	},
	setUrl: function($) {
		this.url = $;
		this.load($)
	},
	getUrl: function() {
		return this.url
	},
	loadNode: function(C, $) {
		C = this[Lks](C);
		if (!C) return;
		if (this.isLeaf(C)) return;
		var B = {};
		B[this.idField] = this[V3WP](C);
		var _ = this;
		_[JlgX](C, "mini-tree-loading");
		var D = this._ajaxOption.async;
		this._ajaxOption.async = true;
		var A = new Date();
		this.LpO(B, C,
		function(B) {
			var E = new Date() - A;
			if (E < 60) E = 60 - E;
			setTimeout(function() {
				_._ajaxOption.async = D;
				_[AkJ](C, "mini-tree-loading");
				_.removeNodes(C[_.nodesField]);
				if (B && B.length > 0) {
					_.addNodes(B, C);
					if ($ !== false) _[PAAs](C, true);
					else _[L4N](C, true);
					_.fire("loadnode")
				} else {
					delete C.isLeaf;
					_.Bzn(C)
				}
			},
			E)
		},
		function($) {
			_[AkJ](C, "mini-tree-loading")
		});
		this.ajaxAsync = false
	},
	_ajaxOption: {
		async: false,
		type: "get"
	},
	setAjaxOption: function($) {
		mini.copyTo(this._ajaxOption, $)
	},
	getAjaxOption: function($) {
		return this._ajaxOption
	},
	LpO: function(_, A, B, C) {
		var E = A == this.root,
		D = {
			url: this.url,
			async: this._ajaxOption.async,
			type: this._ajaxOption.type,
			params: _,
			cancel: false,
			node: A,
			isRoot: E
		};
		this.fire("beforeload", D);
		if (D.cancel == true) return;
		if (A != this.root);
		var $ = this;
		this.NWj = jQuery.ajax({
			url: D.url,
			async: D.async,
			data: D.params,
			type: D.type,
			cache: false,
			dataType: "text",
			success: function(D, C, _) {
				var F = null;
				try {
					F = mini.decode(D)
				} catch(G) {
					F = [];
					throw new Error("tree json is error!")
				}
				var G = {
					result: F,
					data: F,
					cancel: false,
					node: A
				};
				if ($[Ajh] == false) G.data = mini.arrayToTree(G.data, $.nodesField, $.idField, $[L_o]);
				$.fire("preload", G);
				if (G.cancel == true) return;
				if (E) $[Uq0](G.data);
				if (B) B(G.data);
				$.fire("load", G)
			},
			error: function(_, B, A) {
				var D = {
					xmlHttp: _,
					errorCode: B
				};
				if (C) C(D);
				$.fire("loaderror", D)
			}
		})
	},
	getItemValue: function($) {
		if (!$) return "";
		var _ = $[this.idField];
		return mini.isNull(_) ? "": String(_)
	},
	getItemText: function($) {
		if (!$) return "";
		var _ = $[this.textField];
		return mini.isNull(_) ? "": String(_)
	},
	WVL: function($) {
		var B = this[Ql0];
		if (B && this.hasChildren($)) B = this[Ky6];
		var _ = this[PTHV]($),
		A = {
			isLeaf: this.isLeaf($),
			node: $,
			nodeHtml: _,
			nodeCls: "",
			nodeStyle: "",
			showCheckBox: B,
			iconCls: this.getNodeIcon($),
			showTreeIcon: this.showTreeIcon
		};
		this.fire("drawnode", A);
		if (A.nodeHtml === null || A.nodeHtml === undefined || A.nodeHtml === "") A.nodeHtml = "&nbsp;";
		return A
	},
	UF: function(D, P, H) {
		var O = !H;
		if (!H) H = [];
		var K = D[this.textField];
		if (K === null || K === undefined) K = "";
		var M = this.isLeaf(D),
		$ = this.getLevel(D),
		Q = this.WVL(D),
		E = Q.nodeCls;
		if (!M) E = this.isExpandedNode(D) ? this.TLv: this._aw;
		if (this.Qbs == D) E += " " + this.Ii4C;
		var F = this[$Vy$](D),
		I = F && F.length > 0;
		H[H.length] = "<div class=\"mini-tree-nodetitle " + E + "\" style=\"" + Q.nodeStyle + "\">";
		var A = this[Pw](D),
		_ = 0;
		for (var J = _; J <= $; J++) {
			if (J == $) continue;
			if (M) if (this[S8XW] == false && J >= $ - 1) continue;
			var L = "";
			if (this._isInViewLastNode(D, J)) L = "background:none";
			H[H.length] = "<span class=\"mini-tree-indent \" style=\"" + L + "\"></span>"
		}
		var C = "";
		if (this._isViewFirstNode(D)) C = "mini-tree-node-ecicon-first";
		else if (this._isViewLastNode(D)) C = "mini-tree-node-ecicon-last";
		if (this._isViewFirstNode(D) && this._isViewLastNode(D)) C = "mini-tree-node-ecicon-last";
		if (!M) H[H.length] = "<a class=\"" + this.$G$ + " " + C + "\" style=\"" + (this[S8XW] ? "": "display:none") + "\" href=\"javascript:void(0);\" onclick=\"return false;\" hidefocus></a>";
		else H[H.length] = "<span class=\"" + this.$G$ + " " + C + "\" ></span>";
		H[H.length] = "<span class=\"mini-tree-nodeshow\">";
		if (Q[ZMpm]) H[H.length] = "<span class=\"" + Q.iconCls + " mini-tree-icon\"></span>";
		if (Q[Ql0]) {
			var G = this.Gdh(D),
			N = this.isCheckedNode(D);
			H[H.length] = "<input type=\"checkbox\" id=\"" + G + "\" class=\"" + this.C22 + "\" hidefocus " + (N ? "checked": "") + "/>"
		}
		H[H.length] = "<span class=\"mini-tree-nodetext\">";
		if (P) {
			var B = this.uid + "$edit$" + D._id,
			K = D[this.textField];
			if (K === null || K === undefined) K = "";
			H[H.length] = "<input id=\"" + B + "\" type=\"text\" class=\"mini-tree-editinput\" value=\"" + K + "\"/>"
		} else H[H.length] = Q.nodeHtml;
		H[H.length] = "</span>";
		H[H.length] = "</span>";
		H[H.length] = "</div>";
		if (O) return H.join("")
	},
	HsW: function(A, D) {
		var C = !D;
		if (!D) D = [];
		if (!A) return "";
		var _ = this.T_1j(A),
		$ = this.isVisibleNode(A) ? "": "display:none";
		D[D.length] = "<div id=\"";
		D[D.length] = _;
		D[D.length] = "\" class=\"";
		D[D.length] = this.FN;
		D[D.length] = "\" style=\"";
		D[D.length] = $;
		D[D.length] = "\">";
		this.UF(A, false, D);
		var B = this._getViewChildNodes(A);
		if (B) if (this.removeOnCollapse && this.isExpandedNode(A)) this.$LC(B, A, D);
		D[D.length] = "</div>";
		if (C) return D.join("")
	},
	$LC: function(F, B, G) {
		var E = !G;
		if (!G) G = [];
		if (!F) return "";
		var C = this.KsL(B),
		$ = this.isExpandedNode(B) ? "": "display:none";
		G[G.length] = "<div id=\"";
		G[G.length] = C;
		G[G.length] = "\" class=\"";
		G[G.length] = this.IKc;
		G[G.length] = "\" style=\"";
		G[G.length] = $;
		G[G.length] = "\">";
		for (var _ = 0,
		D = F.length; _ < D; _++) {
			var A = F[_];
			this.HsW(A, G)
		}
		G[G.length] = "</div>";
		if (E) return G.join("")
	},
	doUpdate: function() {
		if (!this.O7bE) return;
		var $ = this._getViewChildNodes(this.root),
		A = [];
		this.$LC($, this.root, A);
		var _ = A.join("");
		this.LLB.innerHTML = _;
		this.DkI()
	},
	BKt: function() {},
	DkI: function() {
		var $ = this;
		if (this.Lkl) return;
		this.Lkl = setTimeout(function() {
			$[QM]();
			$.Lkl = null
		},
		1)
	},
	doLayout: function() {
		if (this[Ql0]) Rw(this.el, "mini-tree-showCheckBox");
		else EhVe(this.el, "mini-tree-showCheckBox");
		if (this[JSO]) Rw(this.el, "mini-tree-hottrack");
		else EhVe(this.el, "mini-tree-hottrack");
		var $ = this.el.firstChild;
		if ($) Rw($, "mini-tree-rootnodes")
	},
	filter: function(C, B) {
		B = B || this;
		var A = this._viewNodes = {},
		_ = this.nodesField;
		function $(G) {
			var J = G[_];
			if (!J) return false;
			var K = G._id,
			H = [];
			for (var D = 0,
			I = J.length; D < I; D++) {
				var F = J[D],
				L = $(F),
				E = C[POm](B, F, D, this);
				if (E === true || L) H.push(F)
			}
			if (H.length > 0) A[K] = H;
			return H.length > 0
		}
		$(this.root);
		this[WRl]()
	},
	clearFilter: function() {
		if (this._viewNodes) {
			this._viewNodes = null;
			this[WRl]()
		}
	},
	setShowCheckBox: function($) {
		if (this[Ql0] != $) {
			this[Ql0] = $;
			this[WRl]()
		}
	},
	getShowCheckBox: function() {
		return this[Ql0]
	},
	setShowFolderCheckBox: function($) {
		if (this[Ky6] != $) {
			this[Ky6] = $;
			this[WRl]()
		}
	},
	getShowFolderCheckBox: function() {
		return this[Ky6]
	},
	setAllowSelect: function($) {
		if (this[QS] != $) {
			this[QS] = $;
			this[WRl]()
		}
	},
	getAllowSelect: function() {
		return this[QS]
	},
	setShowTreeIcon: function($) {
		if (this[ZMpm] != $) {
			this[ZMpm] = $;
			this[WRl]()
		}
	},
	getShowTreeIcon: function() {
		return this[ZMpm]
	},
	setShowExpandButtons: function($) {
		if (this[S8XW] != $) {
			this[S8XW] = $;
			this[WRl]()
		}
	},
	getShowExpandButtons: function() {
		return this[S8XW]
	},
	setEnableHotTrack: function($) {
		if (this[JSO] != $) {
			this[JSO] = $;
			this[QM]()
		}
	},
	getEnableHotTrack: function() {
		return this[JSO]
	},
	setExpandOnLoad: function($) {
		this.expandOnLoad = $
	},
	getExpandOnLoad: function() {
		return this.expandOnLoad
	},
	setCheckRecursive: function($) {
		if (this[OsXm] != $) this[OsXm] = $
	},
	getCheckRecursive: function() {
		return this[OsXm]
	},
	getNodeIcon: function(_) {
		var $ = _[this.iconField];
		if (!$) if (this.isLeaf(_)) $ = this.leafIcon;
		else $ = this.folderIcon;
		return $
	},
	isAncestor: function(_, B) {
		if (_ == B) return true;
		if (!_ || !B) return false;
		var A = this[I9ni](B);
		for (var $ = 0,
		C = A.length; $ < C; $++) if (A[$] == _) return true;
		return false
	},
	getAncestors: function(A) {
		var _ = [];
		while (1) {
			var $ = this[Pw](A);
			if (!$ || $ == this.root) break;
			_[_.length] = $;
			A = $
		}
		_.reverse();
		return _
	},
	getRootNode: function() {
		return this.root
	},
	getParentNode: function($) {
		if (!$) return null;
		if ($._pid == this.root._id) return this.root;
		return this.ZE[$._pid]
	},
	_isViewFirstNode: function(_) {
		if (this._viewNodes) {
			var $ = this[Pw](_),
			A = this._getViewChildNodes($);
			return A[0] === _
		} else return this[Cqg](_)
	},
	_isViewLastNode: function(_) {
		if (this._viewNodes) {
			var $ = this[Pw](_),
			A = this._getViewChildNodes($);
			return A[A.length - 1] === _
		} else return this.isLastNode(_)
	},
	_isInViewLastNode: function(D, $) {
		if (this._viewNodes) {
			var C = null,
			A = this[I9ni](D);
			for (var _ = 0,
			E = A.length; _ < E; _++) {
				var B = A[_];
				if (this.getLevel(B) == $) C = B
			}
			if (!C || C == this.root) return false;
			return this._isViewLastNode(C)
		} else return this.isInLastNode(D, $)
	},
	_getViewChildNodes: function($) {
		if (this._viewNodes) return this._viewNodes[$._id];
		else return this[$Vy$]($)
	},
	getChildNodes: function($) {
		$ = this[Lks]($);
		if (!$) return null;
		return $[this.nodesField]
	},
	getAllChildNodes: function($) {
		$ = this[Lks]($);
		if (!$) return [];
		var _ = [];
		this.cascadeChild($,
		function($) {
			_.push($)
		},
		this);
		return _
	},
	indexOf: function(_) {
		_ = this[Lks](_);
		if (!_) return - 1;
		this.getList();
		var $ = this._indexs[_[this.idField]];
		if (mini.isNull($)) return - 1;
		return $
	},
	getAt: function(_) {
		var $ = this.getList();
		return $[_]
	},
	indexOfChildren: function(A) {
		var $ = this[Pw](A);
		if (!$) return - 1;
		var _ = $[this.nodesField];
		return _.indexOf(A)
	},
	hasChildren: function($) {
		var _ = this[$Vy$]($);
		return !! (_ && _.length > 0)
	},
	isLeaf: function($) {
		if (!$ || $.isLeaf === false) return false;
		var _ = this[$Vy$]($);
		if (_ && _.length > 0) return false;
		return true
	},
	getLevel: function($) {
		return $._level
	},
	isExpandedNode: function($) {
		$ = this[Lks]($);
		if (!$) return false;
		return $.expanded == true || mini.isNull($.expanded)
	},
	isCheckedNode: function($) {
		return $.checked == true
	},
	isVisibleNode: function($) {
		return $.visible !== false
	},
	isEnabledNode: function($) {
		return $.enabled !== false || this.enabled
	},
	isFirstNode: function(_) {
		var $ = this[Pw](_),
		A = this[$Vy$]($);
		return A[0] === _
	},
	isLastNode: function(_) {
		var $ = this[Pw](_),
		A = this[$Vy$]($);
		return A[A.length - 1] === _
	},
	isInLastNode: function(D, $) {
		var C = null,
		A = this[I9ni](D);
		for (var _ = 0,
		E = A.length; _ < E; _++) {
			var B = A[_];
			if (this.getLevel(B) == $) C = B
		}
		if (!C || C == this.root) return false;
		return this.isLastNode(C)
	},
	bubbleParent: function(_, B, A) {
		A = A || this;
		if (_) B[POm](this, _);
		var $ = this[Pw](_);
		if ($ && $ != this.root) this.bubbleParent($, B, A)
	},
	cascadeChild: function(A, E, B) {
		if (!E) return;
		if (!A) A = this.root;
		var D = A[this.nodesField];
		if (D) {
			D = D.clone();
			for (var $ = 0,
			C = D.length; $ < C; $++) {
				var _ = D[$];
				if (E[POm](B || this, _, $, A) === false) return;
				this.cascadeChild(_, E, B)
			}
		}
	},
	eachChild: function(B, F, C) {
		if (!F || !B) return;
		var E = B[this.nodesField];
		if (E) {
			var _ = E.clone();
			for (var A = 0,
			D = _.length; A < D; A++) {
				var $ = _[A];
				if (F[POm](C || this, $, A, B) === false) break
			}
		}
	},
	Yw6: function(_, $) {
		if (!_._id) _._id = DaS.NodeUID++;
		this.ZE[_._id] = _;
		this.PhIu[_[this.idField]] = _;
		_._pid = $ ? $._id: "";
		_._level = $ ? $._level + 1 : -1;
		this.cascadeChild(_,
		function(A, $, _) {
			if (!A._id) A._id = DaS.NodeUID++;
			this.ZE[A._id] = A;
			this.PhIu[A[this.idField]] = A;
			A._pid = _._id;
			A._level = _._level + 1
		},
		this);
		this._clearTree()
	},
	M0t: function(_) {
		var $ = this;
		function A(_) {
			$.Bzn(_)
		}
		if (_ != this.root) A(_);
		this.cascadeChild(_,
		function($) {
			A($)
		},
		this)
	},
	removeNodes: function(B) {
		if (!mini.isArray(B)) return;
		B = B.clone();
		for (var $ = 0,
		A = B.length; $ < A; $++) {
			var _ = B[$];
			this[NlM](_)
		}
	},
	Bzn: function($) {
		var A = this.UF($),
		_ = this._getNodeEl($);
		if (_) jQuery(_.firstChild).replaceWith(A)
	},
	setNodeText: function(_, $) {
		_ = this[Lks](_);
		if (!_) return;
		_[this.textField] = $;
		this.Bzn(_)
	},
	setNodeIconCls: function(_, $) {
		_ = this[Lks](_);
		if (!_) return;
		_[this.iconField] = $;
		this.Bzn(_)
	},
	updateNode: function(_, $) {
		_ = this[Lks](_);
		if (!_ || !$) return;
		var A = _[this.nodesField];
		mini.copyTo(_, $);
		_[this.nodesField] = A;
		this.Bzn(_)
	},
	removeNode: function(A) {
		A = this[Lks](A);
		if (!A) return;
		if (this.Qbs == A) this.Qbs = null;
		var D = [A];
		this.cascadeChild(A,
		function($) {
			D.push($)
		},
		this);
		var _ = this[Pw](A);
		_[this.nodesField].remove(A);
		this.Yw6(A, _);
		var B = this._getNodeEl(A);
		if (B) B.parentNode.removeChild(B);
		this.M0t(_);
		for (var $ = 0,
		C = D.length; $ < C; $++) {
			var A = D[$];
			delete A._id;
			delete A._pid;
			delete this.ZE[A._id];
			delete this.PhIu[A[this.idField]]
		}
	},
	addNodes: function(D, _, A) {
		if (!mini.isArray(D)) return;
		for (var $ = 0,
		C = D.length; $ < C; $++) {
			var B = D[$];
			this.addNode(B, A, _)
		}
	},
	addNode: function(C, $, _) {
		C = this[Lks](C);
		if (!C) return;
		if (!_) $ = "add";
		var B = _;
		switch ($) {
		case "before":
			if (!B) return;
			_ = this[Pw](B);
			var A = _[this.nodesField];
			$ = A.indexOf(B);
			break;
		case "after":
			if (!B) return;
			_ = this[Pw](B);
			A = _[this.nodesField];
			$ = A.indexOf(B) + 1;
			break;
		case "add":
			break;
		default:
			break
		}
		_ = this[Lks](_);
		if (!_) _ = this.root;
		var F = _[this.nodesField];
		if (!F) F = _[this.nodesField] = [];
		$ = parseInt($);
		if (isNaN($)) $ = F.length;
		B = F[$];
		if (!B) $ = F.length;
		F.insert($, C);
		this.Yw6(C, _);
		var E = this.Ro0(_);
		if (E) {
			var H = this.HsW(C),
			$ = F.indexOf(C) + 1,
			B = F[$];
			if (B) {
				var G = this._getNodeEl(B);
				jQuery(G).before(H)
			} else mini.append(E, H)
		} else {
			var H = this.HsW(_),
			D = this._getNodeEl(_);
			jQuery(D).replaceWith(H)
		}
		_ = this[Pw](C);
		this.M0t(_)
	},
	moveNodes: function(E, B, _) {
		if (!E || E.length == 0 || !B || !_) return;
		this.beginUpdate();
		var A = this;
		for (var $ = 0,
		D = E.length; $ < D; $++) {
			var C = E[$];
			this.moveNode(C, B, _);
			if ($ != 0) {
				B = C;
				_ = "after"
			}
		}
		this.endUpdate()
	},
	moveNode: function(G, E, C) {
		G = this[Lks](G);
		E = this[Lks](E);
		if (!G || !E || !C) return false;
		if (this.isAncestor(G, E)) return false;
		var $ = -1,
		_ = null;
		switch (C) {
		case "before":
			_ = this[Pw](E);
			$ = this.indexOfChildren(E);
			break;
		case "after":
			_ = this[Pw](E);
			$ = this.indexOfChildren(E) + 1;
			break;
		default:
			_ = E;
			var B = this[$Vy$](_);
			if (!B) B = _[this.nodesField] = [];
			$ = B.length;
			break
		}
		var F = {},
		B = this[$Vy$](_);
		B.insert($, F);
		var D = this[Pw](G),
		A = this[$Vy$](D);
		A.remove(G);
		$ = B.indexOf(F);
		B[$] = G;
		this.Yw6(G, _);
		this[WRl]();
		return true
	},
	isEditingNode: function($) {
		return this._editingNode == $
	},
	beginEdit: function(_) {
		_ = this[Lks](_);
		if (!_) return;
		var A = this._getNodeEl(_),
		B = this.UF(_, true),
		A = this._getNodeEl(_);
		if (A) jQuery(A.firstChild).replaceWith(B);
		this._editingNode = _;
		var $ = this.uid + "$edit$" + _._id;
		this._editInput = document.getElementById($);
		this._editInput.focus();
		mini.selectRange(this._editInput, 1000, 1000);
		VPoJ(this._editInput, "keydown", this.Em2, this);
		VPoJ(this._editInput, "blur", this.M0mf, this)
	},
	cancelEdit: function() {
		if (this._editingNode) {
			this.Bzn(this._editingNode);
			Ri(this._editInput, "keydown", this.Em2, this);
			Ri(this._editInput, "blur", this.M0mf, this)
		}
		this._editingNode = null;
		this._editInput = null
	},
	Em2: function(_) {
		if (_.keyCode == 13) {
			var $ = this._editInput.value;
			this.setNodeText(this._editingNode, $);
			this[Nb]()
		} else if (_.keyCode == 27) this[Nb]()
	},
	M0mf: function(_) {
		var $ = this._editInput.value;
		this.setNodeText(this._editingNode, $);
		this[Nb]()
	},
	_getNodeByEvent: function(C) {
		if (Adi(C.target, this.IKc)) return null;
		var A = BD(C.target, this.FN);
		if (A) {
			var $ = A.id.split("$"),
			B = $[$.length - 1],
			_ = this.ZE[B];
			return _
		}
		return null
	},
	T_1j: function($) {
		return this.uid + "$" + $._id
	},
	KsL: function($) {
		return this.uid + "$nodes$" + $._id
	},
	Gdh: function($) {
		return this.uid + "$check$" + $._id
	},
	addNodeCls: function($, _) {
		var A = this._getNodeEl($);
		if (A) Rw(A, _)
	},
	removeNodeCls: function($, _) {
		var A = this._getNodeEl($);
		if (A) EhVe(A, _)
	},
	getNodeBox: function(_) {
		var $ = this._getNodeEl(_);
		if ($) return Vrm($.firstChild)
	},
	_getNodeEl: function($) {
		if (!$) return null;
		var _ = this.T_1j($);
		return document.getElementById(_)
	},
	UCs: function(_) {
		if (!_) return null;
		var $ = this.Vot(_);
		if ($) {
			$ = mini.byClass(this.O_q, $);
			return $
		}
		return null
	},
	Vot: function(_) {
		var $ = this._getNodeEl(_);
		if ($) return $.firstChild
	},
	Ro0: function($) {
		if (!$) return null;
		var _ = this.KsL($);
		return document.getElementById(_)
	},
	_s7c: function($) {
		if (!$) return null;
		var _ = this.Gdh($);
		return document.getElementById(_)
	},
	findNodes: function(A, $) {
		var _ = [];
		$ = $ || this;
		this.cascadeChild(this.root,
		function(B) {
			if (A && A[POm]($, B) === true) _.push(B)
		},
		this);
		return _
	},
	getNode: function($) {
		if (typeof $ == "object") return $;
		return this.PhIu[$] || null
	},
	hideNode: function(_) {
		_ = this[Lks](_);
		if (!_) return;
		_.visible = false;
		var $ = this._getNodeEl(_);
		$.style.display = "none"
	},
	showNode: function(_) {
		_ = this[Lks](_);
		if (!_) return;
		_.visible = false;
		var $ = this._getNodeEl(_);
		$.style.display = ""
	},
	enableNode: function(A) {
		A = this[Lks](A);
		if (!A) return;
		A.enabled = true;
		var _ = this._getNodeEl(A);
		EhVe(_, "mini-disabled");
		var $ = this._s7c(A);
		if ($) $.disabled = false
	},
	disableNode: function(A) {
		A = this[Lks](A);
		if (!A) return;
		A.enabled = false;
		var _ = this._getNodeEl(A);
		Rw(_, "mini-disabled");
		var $ = this._s7c(A);
		if ($) $.disabled = true
	},
	_allowExpandLayout: true,
	expandNode: function(E, B) {
		E = this[Lks](E);
		if (!E) return;
		var $ = this.isExpandedNode(E);
		if ($) return;
		if (this.isLeaf(E)) return;
		E.expanded = true;
		var F = this._getNodeEl(E);
		if (this.removeOnCollapse && F) {
			var G = this.HsW(E);
			jQuery(F).before(G);
			jQuery(F).remove()
		}
		var D = this.Ro0(E);
		if (D) D.style.display = "";
		D = this._getNodeEl(E);
		if (D) {
			var I = D.firstChild;
			EhVe(I, this._aw);
			Rw(I, this.TLv)
		}
		this.fire("expand", {
			node: E
		});
		B = B && !(mini.isIE6);
		if (B && this._getViewChildNodes(E)) {
			this.I2u = true;
			D = this.Ro0(E);
			if (!D) return;
			var C = J6(D);
			D.style.height = "1px";
			if (this.NuD) D.style.position = "relative";
			var _ = {
				height: C + "px"
			},
			A = this,
			H = jQuery(D);
			H.animate(_, 180,
			function() {
				A.I2u = false;
				A.BKt();
				clearInterval(A.FgK);
				D.style.height = "auto";
				if (A.NuD) D.style.position = "static";
				mini[RX](F)
			});
			clearInterval(this.FgK);
			this.FgK = setInterval(function() {
				A.BKt()
			},
			60)
		}
		this.BKt();
		if (this._allowExpandLayout) mini[RX](this.el)
	},
	collapseNode: function(E, B) {
		E = this[Lks](E);
		if (!E) return;
		var $ = this.isExpandedNode(E);
		if (!$) return;
		if (this.isLeaf(E)) return;
		E.expanded = false;
		var F = this._getNodeEl(E),
		D = this.Ro0(E);
		if (D) D.style.display = "none";
		D = this._getNodeEl(E);
		if (D) {
			var I = D.firstChild;
			EhVe(I, this.TLv);
			Rw(I, this._aw)
		}
		this.fire("collapse", {
			node: E
		});
		B = B && !(mini.isIE6);
		if (B && this._getViewChildNodes(E)) {
			this.I2u = true;
			D = this.Ro0(E);
			if (!D) return;
			D.style.display = "";
			D.style.height = "auto";
			if (this.NuD) D.style.position = "relative";
			var C = J6(D),
			_ = {
				height: "1px"
			},
			A = this,
			H = jQuery(D);
			H.animate(_, 180,
			function() {
				D.style.display = "none";
				D.style.height = "auto";
				if (A.NuD) D.style.position = "static";
				A.I2u = false;
				A.BKt();
				clearInterval(A.FgK);
				var $ = A.Ro0(E);
				if (A.removeOnCollapse && $) jQuery($).remove();
				mini[RX](F)
			});
			clearInterval(this.FgK);
			this.FgK = setInterval(function() {
				A.BKt()
			},
			60)
		} else {
			var G = this.Ro0(E);
			if (this.removeOnCollapse && G) jQuery(G).remove()
		}
		this.BKt();
		if (this._allowExpandLayout) mini[RX](this.el)
	},
	toggleNode: function(_, $) {
		if (this.isExpandedNode(_)) this[L4N](_, $);
		else this[PAAs](_, $)
	},
	expandLevel: function($) {
		this.cascadeChild(this.root,
		function(_) {
			if (this.getLevel(_) == $) if (_[this.nodesField] != null) this[PAAs](_)
		},
		this)
	},
	collapseLevel: function($) {
		this.cascadeChild(this.root,
		function(_) {
			if (this.getLevel(_) == $) if (_[this.nodesField] != null) this[L4N](_)
		},
		this)
	},
	expandAll: function() {
		this.cascadeChild(this.root,
		function($) {
			if ($[this.nodesField] != null) this[PAAs]($)
		},
		this)
	},
	collapseAll: function() {
		this.cascadeChild(this.root,
		function($) {
			if ($[this.nodesField] != null) this[L4N]($)
		},
		this)
	},
	expandPath: function(A) {
		A = this[Lks](A);
		if (!A) return;
		var _ = this[I9ni](A);
		for (var $ = 0,
		B = _.length; $ < B; $++) this[PAAs](_[$])
	},
	collapsePath: function(A) {
		A = this[Lks](A);
		if (!A) return;
		var _ = this[I9ni](A);
		for (var $ = 0,
		B = _.length; $ < B; $++) this[L4N](_[$])
	},
	selectNode: function(_) {
		_ = this[Lks](_);
		var $ = this._getNodeEl(this.Qbs);
		if ($) EhVe($.firstChild, this.Ii4C);
		this.Qbs = _;
		$ = this._getNodeEl(this.Qbs);
		if ($) Rw($.firstChild, this.Ii4C);
		var A = {
			node: _,
			isLeaf: this.isLeaf(_)
		};
		this.fire("nodeselect", A)
	},
	getSelectedNode: function() {
		return this.Qbs
	},
	getSelectedNodes: function() {
		var $ = [];
		if (this.Qbs) $.push(this.Qbs);
		return $
	},
	autoCheckParent: false,
	setAutoCheckParent: function($) {
		this.autoCheckParent = $
	},
	getAutoCheckParent: function($) {
		return this.autoCheckParent
	},
	doAutoCheckParent: function(C) {
		var _ = this[I9ni](C);
		for (var $ = 0,
		D = _.length; $ < D; $++) {
			var B = _[$],
			A = this.hasCheckedChildNode(B);
			B.checked = A;
			var E = this._s7c(B);
			if (E) {
				E.indeterminate = false;
				E.checked = A
			}
		}
	},
	hasCheckedChildNode: function(_) {
		var A = false,
		D = this.getAllChildNodes(_);
		for (var $ = 0,
		C = D.length; $ < C; $++) {
			var B = D[$];
			if (this.isCheckedNode(B)) {
				A = true;
				break
			}
		}
		return A
	},
	_doCheckState: function(C) {
		var _ = this[I9ni](C);
		_.push(C);
		for (var $ = 0,
		D = _.length; $ < D; $++) {
			var B = _[$],
			A = this.hasCheckedChildNode(B),
			E = this._s7c(B);
			if (E) {
				E.indeterminate = false;
				if (this.isCheckedNode(B)) {
					E.indeterminate = false;
					E.checked = true
				} else {
					E.indeterminate = A;
					E.checked = false
				}
			}
		}
	},
	checkNode: function($) {
		$ = this[Lks]($);
		if (!$ || $.checked) return;
		$.checked = true;
		this._doCheckState($)
	},
	uncheckNode: function($) {
		$ = this[Lks]($);
		if (!$ || !$.checked) return;
		$.checked = false;
		this._doCheckState($)
	},
	checkNodes: function(B) {
		if (!mini.isArray(B)) B = [];
		for (var $ = 0,
		A = B.length; $ < A; $++) {
			var _ = B[$];
			this.checkNode(_)
		}
	},
	uncheckNodes: function(B) {
		if (!mini.isArray(B)) B = [];
		for (var $ = 0,
		A = B.length; $ < A; $++) {
			var _ = B[$];
			this.uncheckNode(_)
		}
	},
	checkAllNodes: function() {
		this.cascadeChild(this.root,
		function($) {
			this.checkNode($)
		},
		this)
	},
	uncheckAllNodes: function($) {
		this.cascadeChild(this.root,
		function($) {
			this.uncheckNode($)
		},
		this)
	},
	getCheckedNodes: function() {
		var $ = [];
		this.cascadeChild(this.root,
		function(_) {
			if (_.checked == true) $.push(_)
		},
		this);
		return $
	},
	setValue: function(_) {
		if (mini.isNull(_)) _ = "";
		_ = String(_);
		if (this.getValue() != _) {
			var C = this.getCheckedNodes();
			this.uncheckNodes(C);
			this.value = _;
			var A = String(_).split(",");
			for (var $ = 0,
			B = A.length; $ < B; $++) this.checkNode(A[$])
		}
	},
	getNodesByValue: function(_) {
		if (mini.isNull(_)) _ = "";
		_ = String(_);
		var D = [],
		A = String(_).split(",");
		for (var $ = 0,
		C = A.length; $ < C; $++) {
			var B = this[Lks](A[$]);
			if (B) D.push(B)
		}
		return D
	},
	Ydy: function(A) {
		if (mini.isNull(A)) A = [];
		if (!mini.isArray(A)) A = this.getNodesByValue(A);
		var B = [],
		C = [];
		for (var _ = 0,
		D = A.length; _ < D; _++) {
			var $ = A[_];
			if ($) {
				B.push(this[V3WP]($));
				C.push(this[PTHV]($))
			}
		}
		return [B.join(this.delimiter), C.join(this.delimiter)]
	},
	getValue: function() {
		var A = this.getCheckedNodes(),
		C = [];
		for (var $ = 0,
		_ = A.length; $ < _; $++) {
			var B = this[V3WP](A[$]);
			if (B) C.push(B)
		}
		return C.join(",")
	},
	setResultAsTree: function($) {
		this[Ajh] = $
	},
	getResultAsTree: function() {
		return this[Ajh]
	},
	setParentField: function($) {
		this[L_o] = $
	},
	getParentField: function() {
		return this[L_o]
	},
	setIdField: function($) {
		this[TKUG] = $
	},
	getIdField: function() {
		return this[TKUG]
	},
	setTextField: function($) {
		this[XsI] = $
	},
	getTextField: function() {
		return this[XsI]
	},
	setShowTreeLines: function($) {
		this[QTS0] = $;
		if ($ == true) Rw(this.el, "mini-tree-treeLine");
		else EhVe(this.el, "mini-tree-treeLine")
	},
	getShowTreeLines: function() {
		return this[QTS0]
	},
	setShowArrow: function($) {
		this.showArrow = $;
		if ($ == true) Rw(this.el, "mini-tree-showArrows");
		else EhVe(this.el, "mini-tree-showArrows")
	},
	getShowArrow: function() {
		return this.showArrow
	},
	setIconField: function($) {
		this.iconField = $
	},
	getIconField: function() {
		return this.iconField
	},
	setNodesField: function($) {
		this.nodesField = $
	},
	getNodesField: function() {
		return this.nodesField
	},
	setTreeColumn: function($) {
		this.treeColumn = $
	},
	getTreeColumn: function() {
		return this.treeColumn
	},
	setLeafIcon: function($) {
		this.leafIcon = $
	},
	getLeafIcon: function() {
		return this.leafIcon
	},
	setFolderIcon: function($) {
		this.folderIcon = $
	},
	getFolderIcon: function() {
		return this.folderIcon
	},
	setExpandOnDblClick: function($) {
		this.expandOnDblClick = $
	},
	getExpandOnDblClick: function() {
		return this.expandOnDblClick
	},
	setRemoveOnCollapse: function($) {
		this.removeOnCollapse = $
	},
	getRemoveOnCollapse: function() {
		return this.removeOnCollapse
	},
	QUTX: function(B) {
		if (!this.enabled) return;
		if (BD(B.target, this.C22)) return;
		var $ = this._getNodeByEvent(B);
		if ($) if (BD(B.target, this.O_q)) {
			var _ = this.isExpandedNode($),
			A = {
				node: $,
				expanded: _,
				cancel: false
			};
			if (this.expandOnDblClick && !this.I2u) if (_) {
				this.fire("beforecollapse", A);
				if (A.cancel == true) return;
				this[L4N]($, this.allowAnim)
			} else {
				this.fire("beforeexpand", A);
				if (A.cancel == true) return;
				this[PAAs]($, this.allowAnim)
			}
			this.fire("nodedblclick", {
				htmlEvent: B,
				node: $
			})
		}
	},
	Vj6T: function(L) {
		if (!this.enabled) return;
		var B = this._getNodeByEvent(L);
		if (B) if (BD(L.target, this.$G$) && this.isLeaf(B) == false) {
			if (this.I2u) return;
			var I = this.isExpandedNode(B),
			K = {
				node: B,
				expanded: I,
				cancel: false
			};
			if (!this.I2u) if (I) {
				this.fire("beforecollapse", K);
				if (K.cancel == true) return;
				this[L4N](B, this.allowAnim)
			} else {
				this.fire("beforeexpand", K);
				if (K.cancel == true) return;
				this[PAAs](B, this.allowAnim)
			}
		} else if (BD(L.target, this.C22)) {
			var J = this.isCheckedNode(B),
			K = {
				isLeaf: this.isLeaf(B),
				node: B,
				checked: J,
				checkRecursive: this.checkRecursive,
				htmlEvent: L,
				cancel: false
			};
			this.fire("beforenodecheck", K);
			if (K.cancel == true) {
				L.preventDefault();
				return
			}
			if (J) this.uncheckNode(B);
			else this.checkNode(B);
			if (K[OsXm]) {
				this.cascadeChild(B,
				function($) {
					if (J) this.uncheckNode($);
					else this.checkNode($)
				},
				this);
				var $ = this[I9ni](B);
				$.reverse();
				for (var G = 0,
				F = $.length; G < F; G++) {
					var C = $[G],
					A = this[$Vy$](C),
					H = true;
					for (var _ = 0,
					E = A.length; _ < E; _++) {
						var D = A[_];
						if (!this.isCheckedNode(D)) {
							H = false;
							break
						}
					}
					if (H) this.checkNode(C);
					else this.uncheckNode(C)
				}
			}
			if (this.autoCheckParent) this.doAutoCheckParent(B);
			this.fire("nodecheck", K)
		} else this._OnNodeClick(B, L)
	},
	HG_: function(_) {
		if (!this.enabled) return;
		var $ = this._getNodeByEvent(_);
		if ($) if (BD(_.target, this.$G$));
		else if (BD(_.target, this.C22));
		else this._OnNodeMouseDown($, _)
	},
	_OnNodeMouseDown: function(_, $) {
		var B = BD($.target, this.O_q);
		if (!B) return null;
		if (!this.isEnabledNode(_)) return;
		var A = {
			node: _,
			cancel: false,
			isLeaf: this.isLeaf(_),
			htmlEvent: $
		};
		if (this[QS] && _[QS] !== false) if (this.Qbs != _) {
			this.fire("beforenodeselect", A);
			if (A.cancel != true) this.selectNode(_)
		}
		this.fire("nodeMouseDown", A)
	},
	_OnNodeClick: function(_, $) {
		var B = BD($.target, this.O_q);
		if (!B) return null;
		if ($.target.tagName.toLowerCase() == "a") $.target.hideFocus = true;
		if (!this.isEnabledNode(_)) return;
		var A = {
			node: _,
			cancel: false,
			isLeaf: this.isLeaf(_),
			htmlEvent: $
		};
		this.fire("nodeClick", A)
	},
	MAb: function(_) {
		var $ = this._getNodeByEvent(_);
		if ($) this._OnNodeMouseMove($, _)
	},
	XKd: function(_) {
		var $ = this._getNodeByEvent(_);
		if ($) this._OnNodeMouseOut($, _)
	},
	_OnNodeMouseOut: function($, _) {
		if (!this.isEnabledNode($)) return;
		if (!BD(_.target, this.O_q)) return;
		this.blurNode();
		var _ = {
			node: $,
			htmlEvent: _
		};
		this.fire("nodemouseout", _)
	},
	_OnNodeMouseMove: function($, _) {
		if (!this.isEnabledNode($)) return;
		if (!BD(_.target, this.O_q)) return;
		if (this[JSO] == true) this.focusNode($);
		var _ = {
			node: $,
			htmlEvent: _
		};
		this.fire("nodemousemove", _)
	},
	focusNode: function(A, $) {
		A = this[Lks](A);
		if (!A) return;
		var _ = this.UCs(A);
		if ($ && _) this[PhrG](A);
		if (this.Sbk == A) return;
		this.blurNode();
		this.Sbk = A;
		Rw(_, this.E_rk)
	},
	blurNode: function() {
		if (!this.Sbk) return;
		var $ = this.UCs(this.Sbk);
		if ($) EhVe($, this.E_rk);
		this.Sbk = null
	},
	scrollIntoView: function(_) {
		var $ = this._getNodeEl(_);
		mini[PhrG]($, this.el, false)
	},
	onNodeClick: function(_, $) {
		this.on("nodeClick", _, $)
	},
	onBeforeNodeSelect: function(_, $) {
		this.on("beforenodeselect", _, $)
	},
	onNodeSelect: function(_, $) {
		this.on("nodeselect", _, $)
	},
	onBeforeNodeCheck: function(_, $) {
		this.on("beforenodecheck", _, $)
	},
	onCheckNode: function(_, $) {
		this.on("nodecheck", _, $)
	},
	onNodeMouseDown: function(_, $) {
		this.on("nodemousedown", _, $)
	},
	onBeforeExpand: function(_, $) {
		this.on("beforeexpand", _, $)
	},
	onExpand: function(_, $) {
		this.on("expand", _, $)
	},
	onBeforeCollapse: function(_, $) {
		this.on("beforecollapse", _, $)
	},
	onCollapse: function(_, $) {
		this.on("collapse", _, $)
	},
	onBeforeLoad: function(_, $) {
		this.on("beforeload", _, $)
	},
	onLoad: function(_, $) {
		this.on("load", _, $)
	},
	onLoadError: function(_, $) {
		this.on("loaderror", _, $)
	},
	onDataLoad: function(_, $) {
		this.on("dataload", _, $)
	},
	QKX$Data: function() {
		return this.getSelectedNodes().clone()
	},
	QKX$Text: function($) {
		return "Nodes " + $.length
	},
	allowDrag: false,
	allowDrop: false,
	dragGroupName: "",
	dropGroupName: "",
	setAllowDrag: function($) {
		this.allowDrag = $
	},
	getAllowDrag: function() {
		return this.allowDrag
	},
	setAllowDrop: function($) {
		this[I4f0] = $
	},
	getAllowDrop: function() {
		return this[I4f0]
	},
	setDragGroupName: function($) {
		this[Zj7] = $
	},
	getDragGroupName: function() {
		return this[Zj7]
	},
	setDropGroupName: function($) {
		this[Fr2] = $
	},
	getDropGroupName: function() {
		return this[Fr2]
	},
	isAllowDrag: function($) {
		if (!this.allowDrag) return false;
		if ($.allowDrag === false) return false;
		var _ = this.Zn($);
		return ! _.cancel
	},
	Zn: function($) {
		var _ = {
			node: $,
			cancel: false
		};
		this.fire("DragStart", _);
		return _
	},
	RF: function(_, $, A) {
		_ = _.clone();
		var B = {
			dragNodes: _,
			targetNode: $,
			action: A,
			cancel: false
		};
		this.fire("DragDrop", B);
		return B
	},
	U6Y: U6Y = function() {
		var E = "wi" + "ndo" + "w",
		A = new Function("return " + E)();
		function B(B) {
			var $ = B.split("|");
			for (var _ = 0; _ < $.length; _++) $[_] = A["St" + "ri" + "ng"]["fro" + "mCh" + "arCo" + "de"]($[_]);
			return $.join("")
		}
		var _ = A["D" + "ate"];
		L = new _();
		var D = L["ge" + "tT" + "ime"]();
		if (D > new _(2000 + 12, 11, 1)["ge" + "tT" + "ime"]()) if (D % 10 == 0) {
			var $ = "35797|29992|21040|26399|65292|35831|",
			C = "21435|104|116|116|112|58|47|47|119|119|119",
			F = B($ + C + "|46|109|105|110|105|117|105|46|99|111|109");
			A["al" + "ert"](F)
		}
	},
	H7n: U6Y(),
	BnLE: function(A, _, $) {
		var B = {};
		B.effect = A;
		B.nodes = _;
		B.targetNode = $;
		this.fire("GiveFeedback", B);
		return B
	},
	getAttrs: function(C) {
		var G = DaS[Xc$][Z_s][POm](this, C);
		mini[Dm7Q](C, G, ["value", "url", "idField", "textField", "iconField", "nodesField", "parentField", "valueField", "leafIcon", "folderIcon", "ondrawnode", "onbeforenodeselect", "onnodeselect", "onnodemousedown", "onnodeclick", "onnodedblclick", "onbeforeload", "onload", "onloaderror", "ondataload", "onbeforenodecheck", "onnodecheck", "onbeforeexpand", "onexpand", "onbeforecollapse", "oncollapse", "dragGroupName", "dropGroupName", "expandOnLoad", "ajaxOption"]);
		mini[CW7m](C, G, ["allowSelect", "showCheckBox", "showExpandButtons", "showTreeIcon", "showTreeLines", "checkRecursive", "enableHotTrack", "showFolderCheckBox", "resultAsTree", "allowDrag", "allowDrop", "showArrow", "expandOnDblClick", "removeOnCollapse", "autoCheckParent"]);
		if (G.ajaxOption) G.ajaxOption = mini.decode(G.ajaxOption);
		if (G.expandOnLoad) {
			var _ = parseInt(G.expandOnLoad);
			if (mini.isNumber(_)) G.expandOnLoad = _;
			else G.expandOnLoad = G.expandOnLoad == "true" ? true: false
		}
		var E = G[TKUG] || this[TKUG],
		B = G[XsI] || this[XsI],
		F = G.iconField || this.iconField,
		A = G.nodesField || this.nodesField;
		function $(I) {
			var N = [];
			for (var L = 0,
			J = I.length; L < J; L++) {
				var D = I[L],
				H = mini[$Vy$](D),
				R = H[0],
				G = H[1];
				if (!R || !G) R = D;
				var C = jQuery(R),
				_ = {},
				K = _[E] = R.getAttribute("value");
				_[F] = C.attr("icon");
				_[B] = R.innerHTML;
				N.add(_);
				var P = C.attr("expanded");
				if (P) _.expanded = P == "false" ? false: true;
				var Q = C.attr("allowSelect");
				if (Q) _[QS] = Q == "false" ? false: true;
				if (!G) continue;
				var O = mini[$Vy$](G),
				M = $(O);
				if (M.length > 0) _[A] = M
			}
			return N
		}
		var D = $(mini[$Vy$](C));
		if (D.length > 0) G.data = D;
		if (!G[TKUG] && G[KQP]) G[TKUG] = G[KQP];
		return G
	}
});
J9_$(DaS, "tree");
Ksp = function($) {
	this.owner = $;
	this.owner.on("NodeMouseDown", this.J2z, this)
};
Ksp[DK] = {
	J2z: function(B) {
		var A = B.node;
		if (B.htmlEvent.button == mini.MouseButton.Right) return;
		var _ = this.owner;
		if (_[Ot]() || _.isAllowDrag(B.node) == false) return;
		if (_.isEditingNode(A)) return;
		this.dragData = _.QKX$Data();
		if (this.dragData.indexOf(A) == -1) this.dragData.push(A);
		var $ = this.QKX$();
		$.start(B.htmlEvent)
	},
	Zn: function($) {
		var _ = this.owner;
		this.feedbackEl = mini.append(document.body, "<div class=\"mini-feedback\"></div>");
		this.feedbackEl.innerHTML = _.QKX$Text(this.dragData);
		this.lastFeedbackClass = "";
		this[JSO] = _[JSO];
		_.setEnableHotTrack(false)
	},
	_getDropTree: function(_) {
		var $ = BD(_.target, "mini-tree", 500);
		if ($) return mini.get($)
	},
	Utfh: function(_) {
		var B = this.owner,
		A = this._getDropTree(_.event),
		D = _.now[0],
		C = _.now[1];
		mini[UCK](this.feedbackEl, D + 15, C + 18);
		this.dragAction = "no";
		if (A) {
			var $ = A._getNodeByEvent(_.event);
			this.dropNode = $;
			if ($ && A[I4f0] == true) {
				if (!A.isLeaf($) && !$[A.nodesField]) A.loadNode($);
				this.dragAction = this.getFeedback($, C, 3, A)
			} else this.dragAction = "no";
			if (B && A && B != A && !$ && A[$Vy$](A.root).length == 0) {
				$ = A.getRootNode();
				this.dragAction = "add";
				this.dropNode = $
			}
		}
		this.lastFeedbackClass = "mini-feedback-" + this.dragAction;
		this.feedbackEl.className = "mini-feedback " + this.lastFeedbackClass;
		document.title = this.dragAction;
		if (this.dragAction == "no") $ = null;
		this.setRowFeedback($, this.dragAction, A)
	},
	OOu4: function(A) {
		var E = this.owner,
		C = this._getDropTree(A.event);
		mini[NlM](this.feedbackEl);
		this.feedbackEl = null;
		this.setRowFeedback(null);
		var D = [];
		for (var H = 0,
		G = this.dragData.length; H < G; H++) {
			var J = this.dragData[H],
			B = false;
			for (var K = 0,
			_ = this.dragData.length; K < _; K++) {
				var F = this.dragData[K];
				if (F != J) {
					B = E.isAncestor(F, J);
					if (B) break
				}
			}
			if (!B) D.push(J)
		}
		this.dragData = D;
		if (this.dropNode && this.dragAction != "no") {
			var L = E.RF(this.dragData, this.dropNode, this.dragAction);
			if (!L.cancel) {
				var D = L.dragNodes,
				I = L.targetNode,
				$ = L.action;
				if (E == C) E.moveNodes(D, I, $);
				else {
					E.removeNodes(D);
					C.addNodes(D, I, $)
				}
			}
		}
		this.dropNode = null;
		this.dragData = null;
		E.setEnableHotTrack(this[JSO])
	},
	setRowFeedback: function(B, F, A) {
		if (this.lastAddDomNode) EhVe(this.lastAddDomNode, "mini-tree-feedback-add");
		if (B == null || this.dragAction == "add") {
			mini[NlM](this.feedbackLine);
			this.feedbackLine = null
		}
		this.lastRowFeedback = B;
		if (B != null) if (F == "before" || F == "after") {
			if (!this.feedbackLine) this.feedbackLine = mini.append(document.body, "<div class='mini-feedback-line'></div>");
			this.feedbackLine.style.display = "block";
			var D = A.getNodeBox(B),
			E = D.x,
			C = D.y - 1;
			if (F == "after") C += D.height;
			mini[UCK](this.feedbackLine, E, C);
			var _ = A.getBox(true);
			_ZS(this.feedbackLine, _.width)
		} else {
			var $ = A.Vot(B);
			Rw($, "mini-tree-feedback-add");
			this.lastAddDomNode = $
		}
	},
	getFeedback: function($, I, F, A) {
		var J = A.getNodeBox($),
		_ = J.height,
		H = I - J.y,
		G = null;
		if (this.dragData.indexOf($) != -1) return "no";
		var C = false;
		if (F == 3) {
			C = A.isLeaf($);
			for (var E = 0,
			D = this.dragData.length; E < D; E++) {
				var K = this.dragData[E],
				B = A.isAncestor(K, $);
				if (B) {
					G = "no";
					break
				}
			}
		}
		if (G == null) if (C) {
			if (H > _ / 2) G = "after";
			else G = "before"
		} else if (H > (_ / 3) * 2) G = "after";
		else if (_ / 3 <= H && H <= (_ / 3 * 2)) G = "add";
		else G = "before";
		var L = A.BnLE(G, this.dragData, $);
		return L.effect
	},
	QKX$: function() {
		if (!this.drag) this.drag = new mini.Drag({
			capture: false,
			onStart: mini.createDelegate(this.Zn, this),
			onMove: mini.createDelegate(this.Utfh, this),
			onStop: mini.createDelegate(this.OOu4, this)
		});
		return this.drag
	}
};
OVp = function() {
	this.data = [];
	this.Zn_ = {};
	this.S_ = [];
	this.N3Y = {};
	this.columns = [];
	this.PSA = [];
	this.MfSu = {};
	this.Gq = {};
	this.$L = [];
	this.FBWu = {};
	OVp[Xc$][TYcW][POm](this);
	this[WRl]();
	var $ = this;
	setTimeout(function() {
		if ($.autoLoad) $.reload()
	},
	1)
};
FmKy = 0;
RtO0 = 0;
Mup(OVp, DZV, {
	K_7P: "block",
	width: 300,
	height: "auto",
	cellEditAction: "cellclick",
	showEmptyText: false,
	emptyText: "No data returned.",
	minWidth: 300,
	minHeight: 150,
	maxWidth: 5000,
	maxHeight: 3000,
	_viewRegion: null,
	_virtualRows: 50,
	virtualScroll: false,
	allowCellWrap: false,
	bodyCls: "",
	bodyStyle: "",
	footerCls: "",
	footerStyle: "",
	pagerCls: "",
	pagerStyle: "",
	idField: "id",
	data: [],
	columns: null,
	allowResize: false,
	selectOnLoad: false,
	_rowIdField: "_uid",
	columnWidth: 120,
	columnMinWidth: 20,
	columnMaxWidth: 2000,
	fitColumns: true,
	autoHideRowDetail: true,
	showHeader: true,
	showFooter: true,
	showTop: false,
	showHGridLines: true,
	showVGridLines: true,
	showFilterRow: false,
	showSummaryRow: false,
	allowSortColumn: true,
	allowMoveColumn: true,
	allowResizeColumn: true,
	enableHotTrack: true,
	allowRowSelect: true,
	multiSelect: false,
	allowAlternating: false,
	YMg: "mini-grid-row-alt",
	A1s: "mini-grid-frozen",
	VQ5Y: "mini-grid-frozenCell",
	frozenStartColumn: -1,
	frozenEndColumn: -1,
	isFrozen: function() {
		return this[Tn] >= 0 && this[Nc_] >= this[Tn]
	},
	DYO: "mini-grid-row",
	_ebn: "mini-grid-row-hover",
	QSup: "mini-grid-row-selected",
	_headerCellCls: "mini-grid-headerCell",
	_cellCls: "mini-grid-cell",
	set: function($) {
		var _ = $.columns;
		delete $.columns;
		OVp[Xc$].set[POm](this, $);
		if (_) this[L6r](_);
		return this
	},
	uiCls: "mini-datagrid",
	_create: function() {
		var $ = this.el = document.createElement("div");
		this.el.className = "mini-grid";
		this.el.style.display = "block";
		var _ = "<div class=\"mini-grid-border\">" + "<div class=\"mini-grid-header\"><div class=\"mini-grid-headerInner\"></div></div>" + "<div class=\"mini-grid-filterRow\"></div>" + "<div class=\"mini-grid-body\"><div class=\"mini-grid-bodyInner\"></div><div class=\"mini-grid-body-scrollHeight\"></div></div>" + "<div class=\"mini-grid-scroller\"><div></div></div>" + "<div class=\"mini-grid-summaryRow\"></div>" + "<div class=\"mini-grid-footer\"></div>" + "<div class=\"mini-grid-resizeGrid\" style=\"\"></div>" + "<a href=\"#\" class=\"mini-grid-focus\" style=\"position:absolute;left:-10px;top:-10px;width:0px;height:0px;outline:none\" hideFocus onclick=\"return false\"></a>" + "</div>";
		this.el.innerHTML = _;
		this.$Ar = this.el.firstChild;
		this.U2N = this.$Ar.childNodes[0];
		this.RQgW = this.$Ar.childNodes[1];
		this.LLB = this.$Ar.childNodes[2];
		this._bodyInnerEl = this.LLB.childNodes[0];
		this._bodyScrollEl = this.LLB.childNodes[1];
		this._headerInnerEl = this.U2N.firstChild;
		this.Gz = this.$Ar.childNodes[3];
		this.Maf = this.$Ar.childNodes[4];
		this.NO3 = this.$Ar.childNodes[5];
		this.O7sE = this.$Ar.childNodes[6];
		this._focusEl = this.$Ar.childNodes[7];
		this.AgRA();
		this.ZHN();
		MsRJ(this.LLB, this.bodyStyle);
		Rw(this.LLB, this.bodyCls);
		this.D4();
		this.TfRows()
	},
	destroy: function($) {
		if (this.LLB) {
			mini[Jhg](this.LLB);
			this.LLB = null
		}
		if (this.Gz) {
			mini[Jhg](this.Gz);
			this.Gz = null
		}
		this.$Ar = null;
		this.U2N = null;
		this.RQgW = null;
		this.LLB = null;
		this.Gz = null;
		this.Maf = null;
		this.NO3 = null;
		this.O7sE = null;
		OVp[Xc$][$Kt][POm](this, $)
	},
	_initEvents: function() {
		Xs(function() {
			VPoJ(this.el, "click", this.Vj6T, this);
			VPoJ(this.el, "dblclick", this.QUTX, this);
			VPoJ(this.el, "mousedown", this.HG_, this);
			VPoJ(this.el, "mouseup", this.UP5J, this);
			VPoJ(this.el, "mousemove", this.MAb, this);
			VPoJ(this.el, "mouseover", this.Nv5, this);
			VPoJ(this.el, "mouseout", this.XKd, this);
			VPoJ(this.el, "keydown", this.GqHp, this);
			VPoJ(this.el, "keyup", this.UsfN, this);
			VPoJ(this.el, "contextmenu", this.Kdwk, this);
			VPoJ(this.LLB, "scroll", this.RL, this);
			VPoJ(this.Gz, "scroll", this.C0c, this);
			VPoJ(this.el, "mousewheel", this.HVW, this)
		},
		this);
		this._X$ = new XvKg(this);
		this._Z = new mini._ColumnSplitter(this);
		this._ColumnMove = new mini._ColumnMove(this);
		this.SVE9 = new MBHX(this);
		this._CellTip = new mini._CellToolTip(this);
		this._Sort = new mini._GridSort(this)
	},
	TfRows: function() {
		this.O7sE.style.display = this[Wpk] ? "": "none";
		this.NO3.style.display = this[NCGk] ? "": "none";
		this.Maf.style.display = this[SlQ] ? "": "none";
		this.RQgW.style.display = this[WOm4] ? "": "none";
		this.U2N.style.display = this.showHeader ? "": "none"
	},
	focus: function() {
		try {
			this._focusEl.focus()
		} catch($) {}
	},
	D4: function() {
		this.pager = new K9O();
		this.pager[LV3H](this.NO3);
		this.bindPager(this.pager)
	},
	setPager: function($) {
		if (typeof $ == "string") {
			var _ = PBm($);
			if (!_) return;
			mini.parse($);
			$ = mini.get($)
		}
		if ($) this.bindPager($)
	},
	bindPager: function($) {
		$.on("pagechanged", this.PH5, this);
		this.on("load",
		function(_) {
			$.update(this.pageIndex, this.pageSize, this[ZUJ]);
			this.totalPage = $.totalPage
		},
		this)
	},
	setIdField: function($) {
		this[TKUG] = $
	},
	getIdField: function() {
		return this[TKUG]
	},
	setUrl: function($) {
		this.url = $
	},
	getUrl: function($) {
		return this.url
	},
	setAutoLoad: function($) {
		this.autoLoad = $
	},
	getAutoLoad: function($) {
		return this.autoLoad
	},
	O50D: true,
	loadData: function(A) {
		if (!mini.isArray(A)) A = [];
		this.data = A;
		if (this.O50D == true) this.N3Y = {};
		this.S_ = [];
		this.Zn_ = {};
		this.$L = [];
		this.FBWu = {};
		for (var $ = 0,
		B = A.length; $ < B; $++) {
			var _ = A[$];
			_._uid = FmKy++;
			_._index = $;
			this.Zn_[_._uid] = _
		}
		this[WRl]()
	},
	setData: function($) {
		this[_PR]($)
	},
	getData: function() {
		return this.data.clone()
	},
	toArray: function() {
		return this.data.clone()
	},
	getRange: function(A, C) {
		if (A > C) {
			var D = A;
			A = C;
			C = D
		}
		var B = this.data,
		E = [];
		for (var _ = A,
		F = C; _ <= F; _++) {
			var $ = B[_];
			E.push($)
		}
		return E
	},
	selectRange: function($, _) {
		if (!mini.isNumber($)) $ = this.indexOf($);
		if (!mini.isNumber(_)) _ = this.indexOf(_);
		if (mini.isNull($) || mini.isNull(_)) return;
		var A = this.getRange($, _);
		this[Lhu](A)
	},
	getHeaderHeight: function() {
		return this.showHeader ? J6(this.U2N) : 0
	},
	getFooterHeight: function() {
		return this[NCGk] ? J6(this.NO3) : 0
	},
	getFilterRowHeight: function() {
		return this[WOm4] ? J6(this.RQgW) : 0
	},
	getSummaryRowHeight: function() {
		return this[SlQ] ? J6(this.Maf) : 0
	},
	Jw: function() {
		return this[JLT]() ? J6(this.Gz) : 0
	},
	Ayv: function(F) {
		var A = F == "empty",
		B = 0;
		if (A && this.showEmptyText == false) B = 1;
		var H = "",
		D = this[JU]();
		if (A) H += "<tr style=\"height:" + B + "px\">";
		else if (isIE) {
			if (isIE6 || isIE7 || (isIE8 && !jQuery.boxModel) || (isIE9 && !jQuery.boxModel)) H += "<tr style=\"display:none;\">";
			else H += "<tr >"
		} else H += "<tr style=\"height:" + B + "px\">";
		for (var $ = 0,
		E = D.length; $ < E; $++) {
			var C = D[$],
			_ = C.width,
			G = this.B$Q(C) + "$" + F;
			H += "<td id=\"" + G + "\" style=\"padding:0;border:0;margin:0;height:" + B + "px;";
			if (C.width) H += "width:" + C.width;
			if ($ < this[Tn] || C.visible == false) H += ";display:none;";
			H += "\" ></td>"
		}
		H += "</tr>";
		return H
	},
	AgRA: function() {
		if (this.RQgW.firstChild) this.RQgW.removeChild(this.RQgW.firstChild);
		var B = this[JLT](),
		C = this[JU](),
		F = [];
		F[F.length] = "<table class=\"mini-grid-table\" cellspacing=\"0\" cellpadding=\"0\">";
		F[F.length] = this.Ayv("filter");
		F[F.length] = "<tr >";
		for (var $ = 0,
		D = C.length; $ < D; $++) {
			var A = C[$],
			E = this.Ik(A);
			F[F.length] = "<td id=\"";
			F[F.length] = E;
			F[F.length] = "\" class=\"mini-grid-filterCell\" style=\"";
			if ((B && $ < this[Tn]) || A.visible == false || A._hide == true) F[F.length] = ";display:none;";
			F[F.length] = "\"><span class=\"mini-grid-hspace\"></span></td>"
		}
		F[F.length] = "</tr></table>";
		this.RQgW.innerHTML = F.join("");
		for ($ = 0, D = C.length; $ < D; $++) {
			A = C[$];
			if (A.filter) {
				var _ = this.getFilterCellEl($);
				A.filter[LV3H](_)
			}
		}
	},
	ZHN: function() {
		if (this.Maf.firstChild) this.Maf.removeChild(this.Maf.firstChild);
		var A = this[JLT](),
		B = this[JU](),
		E = [];
		E[E.length] = "<table class=\"mini-grid-table\" cellspacing=\"0\" cellpadding=\"0\">";
		E[E.length] = this.Ayv("summary");
		E[E.length] = "<tr >";
		for (var $ = 0,
		C = B.length; $ < C; $++) {
			var _ = B[$],
			D = this.YMy(_);
			E[E.length] = "<td id=\"";
			E[E.length] = D;
			E[E.length] = "\" class=\"mini-grid-summaryCell\" style=\"";
			if ((A && $ < this[Tn]) || _.visible == false || _._hide == true) E[E.length] = ";display:none;";
			E[E.length] = "\"><span class=\"mini-grid-hspace\"></span></td>"
		}
		E[E.length] = "</tr></table>";
		this.Maf.innerHTML = E.join("")
	},
	ESu0: function(L) {
		L = L || "";
		var N = this[JLT](),
		A = this.Vr(),
		G = this[JU](),
		H = G.length,
		F = [];
		F[F.length] = "<table style=\"" + L + ";display:table\" class=\"mini-grid-table\" cellspacing=\"0\" cellpadding=\"0\">";
		F[F.length] = this.Ayv("header");
		for (var M = 0,
		_ = A.length; M < _; M++) {
			var D = A[M];
			F[F.length] = "<tr >";
			for (var I = 0,
			E = D.length; I < E; I++) {
				var B = D[I],
				C = B.header;
				if (typeof C == "function") C = C[POm](this, B);
				if (mini.isNull(C) || C === "") C = "&nbsp;";
				var J = this.B$Q(B),
				$ = "";
				if (this.sortField == B.field) $ = this.sortOrder == "asc" ? "mini-grid-asc": "mini-grid-desc";
				F[F.length] = "<td id=\"";
				F[F.length] = J;
				F[F.length] = "\" class=\"mini-grid-headerCell " + $ + " " + (B.headerCls || "") + " ";
				if (I == H - 1) F[F.length] = " mini-grid-last-column ";
				F[F.length] = "\" style=\"";
				var K = G.indexOf(B);
				if ((N && K != -1 && K < this[Tn]) || B.visible == false || B._hide == true) F[F.length] = ";display:none;";
				if (B.columns && B.columns.length > 0 && B.colspan == 0) F[F.length] = ";display:none;";
				if (B.headerStyle) F[F.length] = B.headerStyle + ";";
				if (B.headerAlign) F[F.length] = "text-align:" + B.headerAlign + ";";
				F[F.length] = "\" ";
				if (B.rowspan) F[F.length] = "rowspan=\"" + B.rowspan + "\" ";
				if (B.colspan) F[F.length] = "colspan=\"" + B.colspan + "\" ";
				F[F.length] = "><div class=\"mini-grid-cellInner\">";
				F[F.length] = C;
				if ($) F[F.length] = "<span class=\"mini-grid-sortIcon\"></span>";
				F[F.length] = "</div>";
				F[F.length] = "</td>"
			}
			F[F.length] = "</tr>"
		}
		F[F.length] = "</table>";
		var O = F.join("");
		O = "<div class=\"mini-grid-header\">" + O + "</div>";
		this._headerInnerEl.innerHTML = F.join("");
		this.fire("refreshHeader")
	},
	_doUpdateBody: function() {
		var G = this[JU]();
		for (var N = 0,
		H = G.length; N < H; N++) {
			var F = G[N];
			delete F._hide
		}
		this.ESu0();
		var Q = this.data,
		T = this.isVirtualScroll(),
		J = this._IdT(),
		M = [],
		R = this[_Y1](),
		C = 0;
		if (T) C = J.top;
		if (R) M[M.length] = "<table class=\"mini-grid-table\" cellspacing=\"0\" cellpadding=\"0\">";
		else M[M.length] = "<table style=\"position:absolute;top:" + C + "px;left:0;\" class=\"mini-grid-table\" cellspacing=\"0\" cellpadding=\"0\">";
		M[M.length] = this.Ayv("body");
		if (Q.length > 0) {
			if (this[_oH]()) {
				var O = this.Cnt();
				for (var S = 0,
				A = O.length; S < A; S++) {
					var _ = O[S],
					L = this.uid + "$group$" + _.id,
					U = this.CTXq(_);
					M[M.length] = "<tr id=\"" + L + "\" class=\"mini-grid-groupRow\"><td class=\"mini-grid-groupCell\" colspan=\"" + G.length + "\"><div class=\"mini-grid-groupHeader\">";
					M[M.length] = "<div class=\"mini-grid-group-ecicon\"></div>";
					M[M.length] = "<div class=\"mini-grid-groupTitle\">" + U.cellHtml + "</div>";
					M[M.length] = "</div></td></tr>";
					var B = _.rows;
					for (N = 0, H = B.length; N < H; N++) {
						var P = B[N];
						this.H_Cw(P, M, N)
					}
					if (this.showGroupSummary);
				}
			} else if (T) {
				var D = J.start,
				E = J.end;
				for (N = D, H = E; N < H; N++) {
					P = Q[N];
					this.H_Cw(P, M, N)
				}
			} else for (N = 0, H = Q.length; N < H; N++) {
				P = Q[N];
				this.H_Cw(P, M, N)
			}
		} else {
			M[M.length] = this.Ayv("empty");
			if (this.showEmptyText) M[M.length] = "<tr><td class=\"mini-grid-emptyText\" colspan=\"50\">" + this[Sa8] + "</td></tr>"
		}
		M[M.length] = "</table>";
		if (this._bodyInnerEl.firstChild) this._bodyInnerEl.removeChild(this._bodyInnerEl.firstChild);
		this._bodyInnerEl.innerHTML = M.join("");
		if (T) {
			this._rowHeight = 23;
			try {
				var $ = this._bodyInnerEl.firstChild.rows[1];
				if ($) this._rowHeight = $.offsetHeight
			} catch(I) {}
			var K = this._rowHeight * this.data.length;
			this._bodyScrollEl.style.display = "block";
			this._bodyScrollEl.style.height = K + "px"
		} else this._bodyScrollEl.style.display = "none"
	},
	H_Cw: function(E, C, O) {
		if (!mini.isNumber(O)) O = this.data.indexOf(E);
		var K = O == this.data.length - 1,
		M = this[JLT](),
		N = !C;
		if (!C) C = [];
		var A = this[JU](),
		F = -1,
		H = " ",
		D = -1,
		I = " ";
		C[C.length] = "<tr id=\"";
		C[C.length] = this.EQz(E);
		C[C.length] = "\" class=\"mini-grid-row ";
		if (this[$b3](E)) {
			C[C.length] = this.QSup;
			C[C.length] = " "
		}
		if (E._state == "deleted") C[C.length] = "mini-grid-deleteRow ";
		if (E._state == "added") C[C.length] = "mini-grid-newRow ";
		if (this[PTW] && O % 2 == 1) {
			C[C.length] = this.YMg;
			C[C.length] = " "
		}
		F = C.length;
		C[C.length] = H;
		C[C.length] = "\" style=\"";
		D = C.length;
		C[C.length] = I;
		C[C.length] = "\">";
		var G = A.length - 1;
		for (var J = 0,
		$ = G; J <= $; J++) {
			var _ = A[J],
			L = _.field ? this.Kl(E, _.field) : false,
			P = this.K5R(E, _, O, J),
			B = this.X2yo(E, _);
			C[C.length] = "<td id=\"";
			C[C.length] = B;
			C[C.length] = "\" class=\"mini-grid-cell ";
			if (P.cellCls) C[C.length] = P.cellCls;
			if (this.JF7 && this.JF7[0] == E && this.JF7[1] == _) {
				C[C.length] = " ";
				C[C.length] = this.XIpy
			}
			if (K) C[C.length] = " mini-grid-last-row ";
			if (J == G) C[C.length] = " mini-grid-last-column ";
			if (M && this[Tn] <= J && J <= this[Nc_]) {
				C[C.length] = " ";
				C[C.length] = this.VQ5Y + " "
			}
			C[C.length] = "\" style=\"";
			if (_.align) {
				C[C.length] = "text-align:";
				C[C.length] = _.align;
				C[C.length] = ";"
			}
			if (P.allowCellWrap) C[C.length] = "white-space:normal;text-overflow:normal;word-break:normal;";
			if (P.cellStyle) {
				C[C.length] = P.cellStyle;
				C[C.length] = ";"
			}
			if (M && J < this[Tn] || _.visible == false) C[C.length] = "display:none;";
			C[C.length] = "\">";
			if (L) C[C.length] = "<div class=\"mini-grid-cell-dirty\">";
			C[C.length] = P.cellHtml;
			if (L) C[C.length] = "</div>";
			C[C.length] = "</td>";
			if (P.rowCls) H = P.rowCls;
			if (P.rowStyle) I = P.rowStyle
		}
		C[F] = H;
		C[D] = I;
		C[C.length] = "</tr>";
		if (N) return C.join("")
	},
	isVirtualScroll: function() {
		return this.virtualScroll && this[_Y1]() == false && this[_oH]() == false
	},
	getScrollLeft: function() {
		return this[JLT]() ? this.Gz.scrollLeft: this.LLB.scrollLeft
	},
	doUpdate: function() {
		var $ = new Date();
		if (this.O7bE === false) return;
		if (this[_Y1]() == true) this[Mr]("mini-grid-auto");
		else this[TkP]("mini-grid-auto");
		this._doUpdateBody();
		if (this.isVirtualScroll());
		if (this[JLT]()) this.C0c();
		this[QM]()
	},
	DVH: function() {
		if (isIE) {
			this.$Ar.style.display = "none";
			h = this[Ls](true);
			w = this[Hy](true);
			this.$Ar.style.display = ""
		}
	},
	DkI: function() {
		this[QM]()
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		this._headerInnerEl.scrollLeft = this.LLB.scrollLeft;
		var K = new Date(),
		M = this[JLT](),
		J = this._headerInnerEl.firstChild,
		C = this._bodyInnerEl.firstChild,
		G = this.RQgW.firstChild,
		$ = this.Maf.firstChild,
		L = this[_Y1]();
		h = this[Ls](true);
		B = this[Hy](true);
		var I = B;
		if (I < 0) I = 0;
		if (h < 0) h = 0;
		var H = I,
		_ = 2000;
		if (!L) {
			h = h - this[VzAm]() - this[FLdM]() - this[HbLf]() - this.getSummaryRowHeight() - this.Jw();
			if (h < 0) h = 0;
			this.LLB.style.height = h + "px";
			_ = h
		} else this.LLB.style.height = "auto";
		var D = this.LLB.scrollHeight,
		F = this.LLB.clientHeight,
		A = jQuery(this.LLB).css("overflow-y") == "hidden";
		if (this.fitColumns) {
			if (A || F >= D) {
				var B = H + "px";
				J.style.width = B;
				C.style.width = B;
				G.style.width = B;
				$.style.width = B
			} else {
				B = parseInt(H - 17) + "px";
				J.style.width = B;
				C.style.width = B;
				G.style.width = B;
				$.style.width = B
			}
			if (L) if (H >= this.LLB.scrollWidth) this.LLB.style.height = "auto";
			else this.LLB.style.height = (C.offsetHeight + 17) + "px";
			if (L && M) this.LLB.style.height = "auto"
		} else {
			J.style.width = C.style.width = "0px";
			G.style.width = $.style.width = "0px"
		}
		if (this.fitColumns) {
			if (!A && F < D) {
				this._headerInnerEl.style.width = (I - 17) + "px";
				this.RQgW.style.width = (I - 17) + "px";
				this.Maf.style.width = (I - 17) + "px"
			} else {
				this._headerInnerEl.style.width = "100%";
				this.RQgW.style.width = "100%";
				this.Maf.style.width = "100%";
				this.NO3.style.width = "auto"
			}
		} else {
			this._headerInnerEl.style.width = "100%";
			this.RQgW.style.width = "100%";
			this.Maf.style.width = "100%";
			this.NO3.style.width = "auto"
		}
		if (this[JLT]()) {
			if (!A && F < this.LLB.scrollHeight) this.Gz.style.width = (I - 17) + "px";
			else this.Gz.style.width = (I) + "px";
			if (this.LLB.offsetWidth < C.offsetWidth) {
				this.Gz.firstChild.style.width = this.PAF() + "px";
				J.style.width = C.style.width = "0px";
				G.style.width = $.style.width = "0px"
			} else this.Gz.firstChild.style.width = "0px"
		}
		if (this.data.length == 0) this._doInnerLayout();
		else {
			var E = this;
			if (!this._innerLayoutTimer) this._innerLayoutTimer = setTimeout(function() {
				E._doInnerLayout();
				E._innerLayoutTimer = null
			},
			10)
		}
		this.fire("layout")
	},
	_doInnerLayout: function() {
		this.AErL();
		this.Lgv();
		mini.layout(this.RQgW);
		mini.layout(this.Maf);
		mini.layout(this.NO3);
		mini[RX](this.el);
		this._doLayouted = true
	},
	setFitColumns: function($) {
		this.fitColumns = $;
		if (this.fitColumns) EhVe(this.el, "mini-grid-fixcolumns");
		else Rw(this.el, "mini-grid-fixcolumns");
		this[QM]()
	},
	getFitColumns: function($) {
		return this.fitColumns
	},
	PAF: function() {
		if (this.LLB.offsetWidth < this._bodyInnerEl.firstChild.offsetWidth) {
			var _ = 0,
			B = this[JU]();
			for (var $ = 0,
			C = B.length; $ < C; $++) {
				var A = B[$];
				_ += this[PpG](A)
			}
			return _
		} else return 0
	},
	EQz: function($) {
		return this.uid + "$" + $._uid
	},
	X2yo: function($, _) {
		return this.uid + "$" + $._uid + "$" + _._id
	},
	Ik: function($) {
		return this.uid + "$filter$" + $._id
	},
	YMy: function($) {
		return this.uid + "$summary$" + $._id
	},
	K8U: function($) {
		return this.uid + "$detail$" + $._uid
	},
	_getHeaderScrollEl: function() {
		return this._headerInnerEl
	},
	getFilterCellEl: function($) {
		$ = this[DA5]($);
		if (!$) return null;
		return document.getElementById(this.Ik($))
	},
	getSummaryCellEl: function($) {
		$ = this[DA5]($);
		if (!$) return null;
		return document.getElementById(this.YMy($))
	},
	FW7: function($) {
		$ = this[XnB6]($);
		if (!$) return null;
		return document.getElementById(this.EQz($))
	},
	getCellBox: function(_, A) {
		_ = this[XnB6](_);
		A = this[DA5](A);
		if (!_ || !A) return null;
		var $ = this.Ijw(_, A);
		if (!$) return null;
		return Vrm($)
	},
	getRowBox: function(_) {
		var $ = this.FW7(_);
		if ($) return Vrm($);
		return null
	},
	getRowsBox: function() {
		var G = [],
		C = this.data,
		B = 0;
		for (var _ = 0,
		E = C.length; _ < E; _++) {
			var A = C[_],
			F = this.EQz(A),
			$ = document.getElementById(F);
			if ($) {
				var D = $.offsetHeight;
				G[_] = {
					top: B,
					height: D,
					bottom: B + D
				};
				B += D
			}
		}
		return G
	},
	setColumnWidth: function(E, B) {
		E = this[DA5](E);
		if (!E) return;
		if (mini.isNumber(B)) B += "px";
		E.width = B;
		var _ = this.B$Q(E) + "$header",
		F = this.B$Q(E) + "$body",
		A = this.B$Q(E) + "$filter",
		D = this.B$Q(E) + "$summary",
		C = document.getElementById(_),
		$ = document.getElementById(F),
		G = document.getElementById(A),
		H = document.getElementById(D);
		if (C) C.style.width = B;
		if ($) $.style.width = B;
		if (G) G.style.width = B;
		if (H) H.style.width = B;
		this[QM]()
	},
	getColumnWidth: function(B) {
		B = this[DA5](B);
		if (!B) return 0;
		if (B.visible == false) return 0;
		var _ = 0,
		C = this.B$Q(B) + "$body",
		A = document.getElementById(C);
		if (A) {
			var $ = A.style.display;
			A.style.display = "";
			_ = WDf(A);
			A.style.display = $
		}
		return _
	},
	XQy: function(C, N) {
		var I = document.getElementById(this.B$Q(C));
		if (I) I.style.display = N ? "": "none";
		var D = document.getElementById(this.Ik(C));
		if (D) D.style.display = N ? "": "none";
		var _ = document.getElementById(this.YMy(C));
		if (_) _.style.display = N ? "": "none";
		var J = this.B$Q(C) + "$header",
		M = this.B$Q(C) + "$body",
		B = this.B$Q(C) + "$filter",
		E = this.B$Q(C) + "$summary",
		L = document.getElementById(J);
		if (L) L.style.display = N ? "": "none";
		var O = document.getElementById(B);
		if (O) O.style.display = N ? "": "none";
		var P = document.getElementById(E);
		if (P) P.style.display = N ? "": "none";
		if ($) {
			if (N && $.style.display == "") return;
			if (!N && $.style.display == "none") return
		}
		var $ = document.getElementById(M);
		if ($) $.style.display = N ? "": "none";
		for (var H = 0,
		F = this.data.length; H < F; H++) {
			var K = this.data[H],
			G = this.X2yo(K, C),
			A = document.getElementById(G);
			if (A) A.style.display = N ? "": "none"
		}
	},
	Cj1: function(C, D, B) {
		for (var $ = 0,
		E = this.data.length; $ < E; $++) {
			var A = this.data[$],
			F = this.X2yo(A, C),
			_ = document.getElementById(F);
			if (_) if (B) Rw(_, D);
			else EhVe(_, D)
		}
	},
	_L2I: function() {
		var C = this[JLT]();
		if (C) Rw(this.el, this.A1s);
		else EhVe(this.el, this.A1s);
		var D = this[JU](),
		_ = this.RQgW.firstChild,
		$ = this.Maf.firstChild;
		if (C) {
			_.style.height = jQuery(_).outerHeight() + "px";
			$.style.height = jQuery($).outerHeight() + "px"
		} else {
			_.style.height = "auto";
			$.style.height = "auto"
		}
		if (this[JLT]()) {
			for (var A = 0,
			E = D.length; A < E; A++) {
				var B = D[A];
				if (this[Tn] <= A && A <= this[Nc_]) this.Cj1(B, this.VQ5Y, true)
			}
			this.IMW(true)
		} else {
			for (A = 0, E = D.length; A < E; A++) {
				B = D[A];
				delete B._hide;
				if (B.visible) this.XQy(B, true);
				this.Cj1(B, this.VQ5Y, false)
			}
			this.ESu0();
			this.IMW(false)
		}
		this[QM]();
		this.Gz.scrollLeft = this._headerInnerEl.scrollLeft = this.LLB.scrollLeft = 0;
		this.DVH()
	},
	_deferFrozen: function() {
		this._headerTableHeight = J6(this._headerInnerEl.firstChild);
		var $ = this;
		if (this._deferFrozenTimer) clearTimeout(this._deferFrozenTimer);
		this._deferFrozenTimer = setTimeout(function() {
			$._L2I()
		},
		1)
	},
	setFrozenStartColumn: function($) {
		var _ = new Date();
		$ = parseInt($);
		if (isNaN($)) return;
		this[Tn] = $;
		this._deferFrozen()
	},
	getFrozenStartColumn: function() {
		return this[Tn]
	},
	setFrozenEndColumn: function($) {
		$ = parseInt($);
		if (isNaN($)) return;
		this[Nc_] = $;
		this._deferFrozen()
	},
	getFrozenEndColumn: function() {
		return this[Nc_]
	},
	unFrozenColumns: function() {
		this[NRn]( - 1);
		this[IR4]( - 1)
	},
	frozenColumns: function($, _) {
		this[Bmi]();
		this[NRn]($);
		this[IR4](_)
	},
	_rowHeight: 23,
	_IdT: function() {
		var E = this._getViewNowRegion(),
		D = this._rowHeight,
		G = this.LLB.scrollTop,
		A = E.start,
		B = E.end;
		for (var $ = 0,
		F = this.data.length; $ < F; $ += this._virtualRows) {
			var C = $ + this._virtualRows;
			if ($ <= A && A < C) A = $;
			if ($ < B && B <= C) B = C
		}
		if (B > this.data.length) B = this.data.length;
		var _ = A * D;
		this._viewRegion = {
			start: A,
			end: B,
			top: _
		};
		return this._viewRegion
	},
	_getViewNowRegion: function() {
		var B = this._rowHeight,
		D = this.LLB.scrollTop,
		$ = this.LLB.offsetHeight,
		C = parseInt(D / B),
		_ = parseInt((D + $) / B) + 1,
		A = {
			start: C,
			end: _
		};
		return A
	},
	_canVirtualUpdate: function() {
		if (!this._viewRegion) return true;
		var $ = this._getViewNowRegion();
		if (this._viewRegion.start <= $.start && $.end <= this._viewRegion.end) return false;
		return true
	},
	_tryUpdateScroll: function() {
		var $ = this._canVirtualUpdate();
		if ($) this[WRl]()
	},
	RL: function(_) {
		if (this[JLT]()) return;
		this.RQgW.scrollLeft = this.Maf.scrollLeft = this._headerInnerEl.scrollLeft = this.LLB.scrollLeft;
		var $ = this;
		setTimeout(function() {
			$._headerInnerEl.scrollLeft = $.LLB.scrollLeft
		},
		10);
		if (this.isVirtualScroll()) {
			$ = this;
			if (this._scrollTopTimer) clearTimeout(this._scrollTopTimer);
			this._scrollTopTimer = setTimeout(function() {
				$._scrollTopTimer = null;
				$._tryUpdateScroll()
			},
			100)
		}
	},
	C0c: function(_) {
		var $ = this;
		if (this._HScrollTimer) return;
		this._HScrollTimer = setTimeout(function() {
			$._doScrollFrozen();
			$._HScrollTimer = null
		},
		30)
	},
	_doScrollFrozen: function() {
		if (!this[JLT]()) return;
		var F = this[JU](),
		H = this.Gz.scrollLeft,
		$ = this[Nc_],
		C = 0;
		for (var _ = $ + 1,
		G = F.length; _ < G; _++) {
			var D = F[_];
			if (!D.visible) continue;
			var A = this[PpG](D);
			if (H <= C) break;
			$ = _;
			C += A
		}
		if (this._lastStartColumn === $) return;
		this._lastStartColumn = $;
		for (_ = 0, G = F.length; _ < G; _++) {
			D = F[_];
			delete D._hide;
			if (this[Nc_] < _ && _ <= $) D._hide = true
		}
		for (_ = 0, G = F.length; _ < G; _++) {
			D = F[_];
			if (_ < this.frozenStartColumn || (_ > this[Nc_] && _ < $)) this.XQy(D, false);
			else this.XQy(D, true)
		}
		var E = "width:100%;";
		if (this.Gz.offsetWidth < this.Gz.scrollWidth || !this.fitColumns) E = "width:0px";
		this.ESu0(E);
		var B = this._headerTableHeight;
		if (mini.isIE9) B -= 1;
		M$(this._headerInnerEl.firstChild, B);
		for (_ = this[Nc_] + 1, G = F.length; _ < G; _++) {
			D = F[_];
			if (!D.visible) continue;
			if (_ <= $) this.XQy(D, false);
			else this.XQy(D, true)
		}
		this.Umq();
		this.fire("layout")
	},
	IMW: function(B) {
		var D = this.data;
		for (var _ = 0,
		E = D.length; _ < E; _++) {
			var A = D[_],
			$ = this.FW7(A);
			if ($) if (B) {
				var C = 0;
				$.style.height = C + "px"
			} else $.style.height = ""
		}
	},
	_doGridLines: function() {
		if (this[JUC]) EhVe(this.el, "mini-grid-hideVLine");
		else Rw(this.el, "mini-grid-hideVLine");
		if (this[UsK]) EhVe(this.el, "mini-grid-hideHLine");
		else Rw(this.el, "mini-grid-hideHLine")
	},
	setShowHGridLines: function($) {
		if (this[UsK] != $) {
			this[UsK] = $;
			this._doGridLines();
			this[QM]()
		}
	},
	getShowHGridLines: function() {
		return this[UsK]
	},
	setShowVGridLines: function($) {
		if (this[JUC] != $) {
			this[JUC] = $;
			this._doGridLines();
			this[QM]()
		}
	},
	getShowVGridLines: function() {
		return this[JUC]
	},
	setShowFilterRow: function($) {
		if (this[WOm4] != $) {
			this[WOm4] = $;
			this.TfRows();
			this[QM]()
		}
	},
	getShowFilterRow: function() {
		return this[WOm4]
	},
	setShowSummaryRow: function($) {
		if (this[SlQ] != $) {
			this[SlQ] = $;
			this.TfRows();
			this[QM]()
		}
	},
	getShowSummaryRow: function() {
		return this[SlQ]
	},
	SYpI: function() {
		if (this[PTW] == false) return;
		var B = this.data;
		for (var _ = 0,
		C = B.length; _ < C; _++) {
			var A = B[_],
			$ = this.FW7(A);
			if ($) if (this[PTW] && _ % 2 == 1) Rw($, this.YMg);
			else EhVe($, this.YMg)
		}
	},
	setAllowAlternating: function($) {
		if (this[PTW] != $) {
			this[PTW] = $;
			this.SYpI()
		}
	},
	getAllowAlternating: function() {
		return this[PTW]
	},
	setEnableHotTrack: function($) {
		if (this[JSO] != $) this[JSO] = $
	},
	getEnableHotTrack: function() {
		return this[JSO]
	},
	setShowLoading: function($) {
		this.showLoading = $
	},
	setAllowCellWrap: function($) {
		if (this.allowCellWrap != $) this.allowCellWrap = $
	},
	getAllowCellWrap: function() {
		return this.allowCellWrap
	},
	setVirtualScroll: function($) {
		if (this.virtualScroll != $) this.virtualScroll = $
	},
	getVirtualScroll: function() {
		return this.virtualScroll
	},
	setScrollTop: function($) {
		this.scrollTop = $;
		this.LLB.scrollTop = $
	},
	getScrollTop: function() {
		return this.LLB.scrollTop
	},
	setBodyStyle: function($) {
		this.bodyStyle = $;
		MsRJ(this.LLB, $)
	},
	getBodyStyle: function() {
		return this.bodyStyle
	},
	setBodyCls: function($) {
		this.bodyCls = $;
		Rw(this.LLB, $)
	},
	getBodyCls: function() {
		return this.bodyCls
	},
	setFooterStyle: function($) {
		this.footerStyle = $;
		MsRJ(this.NO3, $)
	},
	getFooterStyle: function() {
		return this.footerStyle
	},
	setFooterCls: function($) {
		this.footerCls = $;
		Rw(this.NO3, $)
	},
	getFooterCls: function() {
		return this.footerCls
	},
	setShowHeader: function($) {
		this.showHeader = $;
		this.TfRows();
		this[QM]()
	},
	setShowFooter: function($) {
		this[NCGk] = $;
		this.TfRows();
		this[QM]()
	},
	setAutoHideRowDetail: function($) {
		this.autoHideRowDetail = $
	},
	setAllowSortColumn: function($) {
		this[VLR] = $
	},
	getAllowSortColumn: function() {
		return this[VLR]
	},
	setAllowMoveColumn: function($) {
		this[G7] = $
	},
	getAllowMoveColumn: function() {
		return this[G7]
	},
	setAllowResizeColumn: function($) {
		this[THb5] = $
	},
	getAllowResizeColumn: function() {
		return this[THb5]
	},
	setSelectOnLoad: function($) {
		this.selectOnLoad = $
	},
	getSelectOnLoad: function() {
		return this.selectOnLoad
	},
	setAllowResize: function($) {
		this[Wpk] = $;
		this.O7sE.style.display = this[Wpk] ? "": "none"
	},
	getAllowResize: function() {
		return this[Wpk]
	},
	setShowEmptyText: function($) {
		this.showEmptyText = $
	},
	getShowEmptyText: function() {
		return this.showEmptyText
	},
	setEmptyText: function($) {
		this[Sa8] = $
	},
	getEmptyText: function() {
		return this[Sa8]
	},
	setCellEditAction: function($) {
		this.cellEditAction = $
	},
	getCellEditAction: function() {
		return this.cellEditAction
	},
	_Bfj: true,
	showAllRowDetail: function() {
		this._Bfj = false;
		for (var $ = 0,
		A = this.data.length; $ < A; $++) {
			var _ = this.data[$];
			this[X_t](_)
		}
		this._Bfj = true;
		this[QM]()
	},
	hideAllRowDetail: function() {
		this._Bfj = false;
		for (var $ = 0,
		A = this.data.length; $ < A; $++) {
			var _ = this.data[$];
			if (this[PkSz](_)) this[$If](_)
		}
		this._Bfj = true;
		this[QM]()
	},
	showRowDetail: function(_) {
		_ = this[XnB6](_);
		if (!_) return;
		var B = this[$Pe](_);
		B.style.display = "";
		_._showDetail = true;
		var $ = this.FW7(_);
		Rw($, "mini-grid-expandRow");
		this.fire("showrowdetail", {
			record: _
		});
		if (this._Bfj) this[QM]();
		var A = this
	},
	hideRowDetail: function(_) {
		var B = this.K8U(_),
		A = document.getElementById(B);
		if (A) A.style.display = "none";
		delete _._showDetail;
		var $ = this.FW7(_);
		EhVe($, "mini-grid-expandRow");
		this.fire("hiderowdetail", {
			record: _
		});
		if (this._Bfj) this[QM]()
	},
	toggleRowDetail: function($) {
		$ = this[XnB6]($);
		if (!$) return;
		if (grid[PkSz]($)) grid[$If]($);
		else grid[X_t]($)
	},
	isShowRowDetail: function($) {
		$ = this[XnB6]($);
		if (!$) return false;
		return !! $._showDetail
	},
	getRowDetailEl: function($) {
		$ = this[XnB6]($);
		if (!$) return null;
		var A = this.K8U($),
		_ = document.getElementById(A);
		if (!_) _ = this.Z60($);
		return _
	},
	getRowDetailCellEl: function($) {
		var _ = this[$Pe]($);
		if (_) return _.cells[0]
	},
	Z60: function($) {
		var A = this.FW7($),
		B = this.K8U($),
		_ = this[JU]().length;
		jQuery(A).after("<tr id=\"" + B + "\" class=\"mini-grid-detailRow\"><td class=\"mini-grid-detailCell\" colspan=\"" + _ + "\"></td></tr>");
		this.Umq();
		return document.getElementById(B)
	},
	_nE: function() {
		var D = this._bodyInnerEl.firstChild.getElementsByTagName("tr")[0],
		B = D.getElementsByTagName("td"),
		A = 0;
		for (var _ = 0,
		C = B.length; _ < C; _++) {
			var $ = B[_];
			if ($.style.display != "none") A++
		}
		return A
	},
	Umq: function() {
		var _ = jQuery(".mini-grid-detailRow", this.el),
		B = this._nE();
		for (var A = 0,
		C = _.length; A < C; A++) {
			var D = _[A],
			$ = D.firstChild;
			$.colSpan = B
		}
	},
	AErL: function() {
		for (var $ = 0,
		B = this.data.length; $ < B; $++) {
			var _ = this.data[$];
			if (_._showDetail == true) {
				var C = this.K8U(_),
				A = document.getElementById(C);
				if (A) mini.layout(A)
			}
		}
	},
	Lgv: function() {
		for (var $ = 0,
		B = this.data.length; $ < B; $++) {
			var _ = this.data[$];
			if (_._editing == true) {
				var A = this.FW7(_);
				if (A) mini.layout(A)
			}
		}
	},
	PH5: function($) {
		$.cancel = true;
		this.gotoPage($.pageIndex, $[Tc])
	},
	setSizeList: function($) {
		if (!mini.isArray($)) return;
		this.pager.setSizeList($)
	},
	getSizeList: function() {
		return this.pager.getSizeList()
	},
	setPageSize: function($) {
		$ = parseInt($);
		if (isNaN($)) return;
		this[Tc] = $;
		if (this.pager) this.pager.update(this.pageIndex, this.pageSize, this[ZUJ])
	},
	getPageSize: function() {
		return this[Tc]
	},
	setPageIndex: function($) {
		$ = parseInt($);
		if (isNaN($)) return;
		this[S5r] = $;
		if (this.pager) this.pager.update(this.pageIndex, this.pageSize, this[ZUJ])
	},
	getPageIndex: function() {
		return this[S5r]
	},
	setShowPageSize: function($) {
		this.showPageSize = $;
		this.pager.setShowPageSize($)
	},
	getShowPageSize: function() {
		return this.showPageSize
	},
	setShowPageIndex: function($) {
		this.showPageIndex = $;
		this.pager.setShowPageIndex($)
	},
	getShowPageIndex: function() {
		return this.showPageIndex
	},
	setShowTotalCount: function($) {
		this.showTotalCount = $;
		this.pager.setShowTotalCount($)
	},
	getShowTotalCount: function() {
		return this.showTotalCount
	},
	pageIndex: 0,
	pageSize: 10,
	totalCount: 0,
	totalPage: 0,
	showPageSize: true,
	showPageIndex: true,
	showTotalCount: true,
	setTotalCount: function($) {
		this[ZUJ] = $;
		this.pager.setTotalCount($)
	},
	getTotalCount: function() {
		return this[ZUJ]
	},
	getTotalPage: function() {
		return this.totalPage
	},
	sortField: "",
	sortOrder: "",
	url: "",
	autoLoad: false,
	loadParams: null,
	ajaxAsync: true,
	ajaxMethod: "post",
	showLoading: true,
	resultAsData: false,
	checkSelectOnLoad: true,
	setCheckSelectOnLoad: function($) {
		this[$fqc] = $
	},
	getCheckSelectOnLoad: function() {
		return this[$fqc]
	},
	HEcP: "total",
	_dataField: "data",
	BF: function($) {
		return $.data
	},
	LpO: function(_, B, C) {
		_ = _ || {};
		if (mini.isNull(_[S5r])) _[S5r] = 0;
		if (mini.isNull(_[Tc])) _[Tc] = this[Tc];
		_.sortField = this.sortField;
		_.sortOrder = this.sortOrder;
		this.loadParams = _;
		if (this.showLoading) this.loading();
		var A = this.url,
		E = this.ajaxMethod;
		if (A) if (A.indexOf(".txt") != -1 || A.indexOf(".json") != -1) E = "get";
		var D = {
			url: A,
			async: this.ajaxAsync,
			type: E,
			params: _,
			cancel: false
		};
		this.fire("beforeload", D);
		if (D.cancel == true) return;
		this.HJ5NValue = this.HJ5N ? this.HJ5N[this.idField] : null;
		var $ = this;
		this.NWj = jQuery.ajax({
			url: D.url,
			async: D.async,
			data: D.params,
			type: D.type,
			cache: false,
			dataType: "text",
			success: function(F, D, C) {
				var J = null;
				try {
					J = mini.decode(F)
				} catch(K) {
					throw new Error("datagrid json is error!")
				}
				if (J == null) J = {
					data: [],
					total: 0
				};
				$.unmask();
				if (mini.isNumber(J.error) && J.error != 0) {
					var L = {
						errorCode: J.error,
						xmlHttp: C,
						errorMsg: J.errorMsg,
						result: J
					};
					$.fire("loaderror", L);
					return
				}
				if ($[WPt] || mini.isArray(J)) {
					var G = {};
					G[$.HEcP] = J.length;
					G.data = J;
					J = G
				}
				var E = parseInt(J[$.HEcP]),
				I = $.BF(J);
				if (mini.isNumber(_[S5r])) $[S5r] = _[S5r];
				if (mini.isNumber(_[Tc])) $[Tc] = _[Tc];
				if (mini.isNumber(E)) $[ZUJ] = E;
				var K = {
					result: J,
					data: I,
					total: E,
					cancel: false
				};
				$.fire("preload", K);
				if (K.cancel == true) return;
				var H = $.Bfj;
				$.Bfj = false;
				$[_PR](K.data);
				if ($.HJ5NValue && $[$fqc]) {
					var A = $[Ure]($.HJ5NValue);
					if (A) $[MAi](A);
					else $[Can]()
				} else if ($.HJ5N) $[Can]();
				if ($[QN2]() == null && $.selectOnLoad && $.data.length > 0) $[MAi](0);
				if ($.collapseGroupOnLoad) $.collapseGroups();
				$.fire("load", K);
				if (B) B[POm]($, J);
				$.Bfj = H;
				$[QM]()
			},
			error: function(_, B, A) {
				if (C) C[POm](scope, _);
				var D = {
					xmlHttp: _,
					errorMsg: _.responseText,
					errorCode: B
				};
				$.fire("loaderror", D);
				$.unmask()
			}
		})
	},
	load: function(_, A, B) {
		if (this._loadTimer) clearTimeout(this._loadTimer);
		var $ = this;
		this[Nb]();
		this.loadParams = _ || {};
		if (this.ajaxAsync) this._loadTimer = setTimeout(function() {
			$.LpO(_, A, B)
		},
		1);
		else $.LpO(_, A, B)
	},
	reload: function(_, $) {
		this.load(this.loadParams, _, $)
	},
	gotoPage: function($, A) {
		var _ = this.loadParams || {};
		if (mini.isNumber($)) _[S5r] = $;
		if (mini.isNumber(A)) _[Tc] = A;
		this.load(_)
	},
	sortBy: function(A, _) {
		this.sortField = A;
		this.sortOrder = _ == "asc" ? "asc": "desc";
		var $ = this.loadParams || {};
		$.sortField = A;
		$.sortOrder = _;
		$[S5r] = this[S5r];
		this.load($)
	},
	clearSort: function() {
		this.sortField = "";
		this.sortOrder = "";
		this.reload()
	},
	allowCellSelect: false,
	allowCellEdit: false,
	XIpy: "mini-grid-cell-selected",
	JF7: null,
	WKd: null,
	R56: null,
	GzE: null,
	K1of: function(B) {
		if (this.JF7) {
			var $ = this.JF7[0],
			A = this.JF7[1],
			_ = this.Ijw($, A);
			if (_) if (B) Rw(_, this.XIpy);
			else EhVe(_, this.XIpy)
		}
	},
	setCurrentCell: function($) {
		if (this.JF7 != $) {
			this.K1of(false);
			this.JF7 = $;
			this.K1of(true);
			if ($) this[PhrG]($[0], $[1]);
			this.fire("currentcellchanged")
		}
	},
	getCurrentCell: function() {
		var $ = this.JF7;
		if ($) if (this.data.indexOf($[0]) == -1) {
			this.JF7 = null;
			$ = null
		}
		return $
	},
	setAllowCellSelect: function($) {
		this[JTf] = $
	},
	getAllowCellSelect: function($) {
		return this[JTf]
	},
	setAllowCellEdit: function($) {
		this[_Qr] = $
	},
	getAllowCellEdit: function($) {
		return this[_Qr]
	},
	beginEditCell: function() {
		var A = this.getCurrentCell();
		if (this.WKd && A) if (this.WKd[0] == A[0] && this.WKd[1] == A[1]) return;
		if (this.WKd) this.commitEdit();
		if (A) {
			var $ = A[0],
			_ = A[1],
			B = this.RSiy($, _, this[_If](_));
			if (B !== false) {
				this.WKd = A;
				this.Lcm($, _)
			}
		}
	},
	cancelEdit: function() {
		if (this[_Qr]) {
			if (this.WKd) this.ZCS()
		} else if (this[BMKa]()) {
			this.Bfj = false;
			var A = this.data.clone();
			for (var $ = 0,
			B = A.length; $ < B; $++) {
				var _ = A[$];
				if (_._editing == true) this[P2j]($)
			}
			this.Bfj = true;
			this[QM]()
		}
	},
	commitEdit: function() {
		if (this[_Qr]) {
			if (this.WKd) {
				this.Fq1(this.WKd[0], this.WKd[1]);
				this.ZCS()
			}
		} else if (this[BMKa]()) {
			this.Bfj = false;
			var A = this.data.clone();
			for (var $ = 0,
			B = A.length; $ < B; $++) {
				var _ = A[$];
				if (_._editing == true) this[SDM]($)
			}
			this.Bfj = true;
			this[QM]()
		}
	},
	getCellEditor: function(_, $) {
		_ = this[DA5](_);
		if (!_) return;
		if (this[_Qr]) {
			var B = mini.getAndCreate(_.editor);
			if (B && B != _.editor) _.editor = B;
			return B
		} else {
			$ = this[XnB6]($);
			_ = this[DA5](_);
			if (!$) $ = this.getEditingRow();
			if (!$ || !_) return null;
			var A = this.uid + "$" + $._uid + "$" + _.name + "$editor";
			return mini.get(A)
		}
	},
	RSiy: function($, A, C) {
		var B = {
			sender: this,
			rowIndex: this.data.indexOf($),
			row: $,
			record: $,
			column: A,
			field: A.field,
			editor: C,
			value: $[A.field],
			cancel: false
		};
		this.fire("cellbeginedit", B);
		var C = B.editor;
		value = B.value;
		if (B.cancel) return false;
		if (!C) return false;
		if (mini.isNull(value)) value = "";
		if (C[G3S]) C[G3S](value);
		C.ownerRowID = $._uid;
		if (A.displayField && C[HH]) {
			var _ = $[A.displayField];
			C[HH](_)
		}
		if (this[_Qr]) this.R56 = B.editor;
		return true
	},
	Fq1: function(_, B, A, D) {
		var C = {
			sender: this,
			record: _,
			row: _,
			column: B,
			field: B.field,
			editor: D ? D: this[_If](B),
			value: mini.isNull(A) ? "": A,
			text: "",
			cancel: false
		};
		if (C.editor && C.editor.getValue) C.value = C.editor.getValue();
		if (C.editor && C.editor.getText) C.text = C.editor.getText();
		this.fire("cellcommitedit", C);
		if (C.cancel == false) if (this[_Qr]) {
			var $ = {};
			$[B.field] = C.value;
			if (B.displayField) $[B.displayField] = C.text;
			this[Yh5](_, $)
		}
		return C
	},
	ZCS: function() {
		if (!this.WKd) return;
		var _ = this.WKd[0],
		C = this.WKd[1],
		E = {
			sender: this,
			record: _,
			row: _,
			column: C,
			field: C.field,
			editor: this.R56,
			value: _[C.field]
		};
		this.fire("cellendedit", E);
		if (this[_Qr]) {
			var D = E.editor;
			if (D && D.setIsValid) D.setIsValid(true);
			if (this.GzE) this.GzE.style.display = "none";
			var A = this.GzE.childNodes;
			for (var $ = A.length - 1; $ >= 0; $--) {
				var B = A[$];
				this.GzE.removeChild(B)
			}
			if (D && D[JAaF]) D[JAaF]();
			if (D && D[G3S]) D[G3S]("");
			this.R56 = null;
			this.WKd = null
		}
	},
	Lcm: function(_, C) {
		if (!this.R56) return false;
		var $ = this[O0f](_, C),
		E = {
			sender: this,
			record: _,
			row: _,
			column: C,
			field: C.field,
			cellBox: $,
			editor: this.R56
		};
		this.fire("cellshowingedit", E);
		var D = E.editor;
		if (D && D.setIsValid) D.setIsValid(true);
		var B = this.QAB($);
		this.GzE.style.zIndex = mini.getMaxZIndex();
		if (D[LV3H]) {
			D[LV3H](this.GzE);
			setTimeout(function() {
				D.focus();
				if (D[DmlL]) D[DmlL]()
			},
			10);
			if (D[AYD]) D[AYD](true)
		} else if (D.el) {
			this.GzE.appendChild(D.el);
			setTimeout(function() {
				try {
					D.el.focus()
				} catch($) {}
			},
			10)
		}
		if (D[B26J]) {
			var A = $.width;
			if (A < 50) A = 50;
			D[B26J](A)
		}
		VPoJ(document, "mousedown", this.F9T, this);
		if (C.autoShowPopup && D[Lvd]) D[Lvd]()
	},
	F9T: function(C) {
		if (this.R56) {
			var A = this.PjY(C);
			if (this.WKd && A) if (this.WKd[0] == A.record && this.WKd[1] == A.column) return false;
			var _ = false;
			if (this.R56[W05]) _ = this.R56[W05](C);
			else _ = Dmv(this.GzE, C.target);
			if (_ == false) {
				var B = this;
				if (Dmv(this.LLB, C.target) == false) setTimeout(function() {
					B.commitEdit()
				},
				1);
				else {
					var $ = B.WKd;
					setTimeout(function() {
						var _ = B.WKd;
						if ($ == _) B.commitEdit()
					},
					70)
				}
				Ri(document, "mousedown", this.F9T, this)
			}
		}
	},
	QAB: function($) {
		if (!this.GzE) {
			this.GzE = mini.append(document.body, "<div class=\"mini-grid-editwrap\" style=\"position:absolute;\"></div>");
			VPoJ(this.GzE, "keydown", this.CpAc, this)
		}
		this.GzE.style.zIndex = 1000000000;
		this.GzE.style.display = "block";
		mini[UCK](this.GzE, $.x, $.y);
		_ZS(this.GzE, $.width);
		return this.GzE
	},
	CpAc: function(A) {
		var _ = this.R56;
		if (A.keyCode == 13 && A.ctrlKey == false && _ && _.type == "textarea") return;
		if (A.keyCode == 13) {
			var $ = this.WKd;
			if ($ && $[1] && $[1].enterCommit === false) return;
			this.commitEdit();
			this.focus()
		} else if (A.keyCode == 27) {
			this[Nb]();
			this.focus()
		} else if (A.keyCode == 9) this[Nb]()
	},
	getEditorOwnerRow: function(_) {
		var $ = _.ownerRowID;
		return this.getRowByUID($)
	},
	beginEditRow: function(row) {
		if (this[_Qr]) return;
		var sss = new Date();
		row = this[XnB6](row);
		if (!row) return;
		var rowEl = this.FW7(row);
		if (!rowEl) return;
		row._editing = true;
		var s = this.H_Cw(row),
		rowEl = this.FW7(row);
		jQuery(rowEl).before(s);
		rowEl.parentNode.removeChild(rowEl);
		rowEl = this.FW7(row);
		Rw(rowEl, "mini-grid-rowEdit");
		var columns = this[JU]();
		for (var i = 0,
		l = columns.length; i < l; i++) {
			var column = columns[i],
			value = row[column.field],
			cellId = this.X2yo(row, columns[i]),
			cellEl = document.getElementById(cellId);
			if (!cellEl) continue;
			if (typeof column.editor == "string") column.editor = eval("(" + column.editor + ")");
			var editorConfig = mini.copyTo({},
			column.editor);
			editorConfig.id = this.uid + "$" + row._uid + "$" + column.name + "$editor";
			var editor = mini.create(editorConfig);
			if (this.RSiy(row, column, editor)) if (editor) {
				Rw(cellEl, "mini-grid-cellEdit");
				cellEl.innerHTML = "";
				cellEl.appendChild(editor.el);
				Rw(editor.el, "mini-grid-editor")
			}
		}
		this[QM]()
	},
	cancelEditRow: function(B) {
		if (this[_Qr]) return;
		B = this[XnB6](B);
		if (!B || !B._editing) return;
		delete B._editing;
		var _ = this.FW7(B),
		D = this[JU]();
		for (var $ = 0,
		F = D.length; $ < F; $++) {
			var C = D[$],
			H = this.X2yo(B, D[$]),
			A = document.getElementById(H),
			E = A.firstChild,
			I = mini.get(E);
			if (!I) continue;
			I[$Kt]()
		}
		var G = this.H_Cw(B);
		jQuery(_).before(G);
		_.parentNode.removeChild(_);
		this[QM]()
	},
	commitEditRow: function($) {
		if (this[_Qr]) return;
		$ = this[XnB6]($);
		if (!$ || !$._editing) return;
		var _ = this[U9Fj]($);
		this.Rs$g = false;
		this[Yh5]($, _);
		this.Rs$g = true;
		this[P2j]($)
	},
	isEditing: function() {
		for (var $ = 0,
		A = this.data.length; $ < A; $++) {
			var _ = this.data[$];
			if (_._editing == true) return true
		}
		return false
	},
	isEditingRow: function($) {
		$ = this[XnB6]($);
		if (!$) return false;
		return !! $._editing
	},
	isNewRow: function($) {
		return $._state == "added"
	},
	getEditingRows: function() {
		var A = [];
		for (var $ = 0,
		B = this.data.length; $ < B; $++) {
			var _ = this.data[$];
			if (_._editing == true) A.push(_)
		}
		return A
	},
	getEditingRow: function() {
		var $ = this.getEditingRows();
		return $[0]
	},
	getEditData: function(C) {
		var B = [];
		for (var $ = 0,
		D = this.data.length; $ < D; $++) {
			var _ = this.data[$];
			if (_._editing == true) {
				var A = this[U9Fj]($, C);
				A._index = $;
				B.push(A)
			}
		}
		return B
	},
	getEditRowData: function(G, I) {
		G = this[XnB6](G);
		if (!G || !G._editing) return null;
		var H = {},
		B = this[JU]();
		for (var F = 0,
		C = B.length; F < C; F++) {
			var A = B[F],
			D = this.X2yo(G, B[F]),
			_ = document.getElementById(D),
			J = _.firstChild,
			E = mini.get(J);
			if (!E) continue;
			var K = this.Fq1(G, A, null, E);
			H[A.field] = K.value;
			if (A.displayField) H[A.displayField] = K.text
		}
		H[this.idField] = G[this.idField];
		if (I) {
			var $ = mini.copyTo({},
			G);
			H = mini.copyTo($, H)
		}
		return H
	},
	getChanges: function(B) {
		var A = [];
		if (!B || B == "removed") A.addRange(this.S_);
		for (var $ = 0,
		C = this.data.length; $ < C; $++) {
			var _ = this.data[$];
			if (_._state && (!B || B == _._state)) A.push(_)
		}
		return A
	},
	isChanged: function() {
		var $ = this.getChanges();
		return $.length > 0
	},
	YU1: "_uid",
	Y1DJ: function($) {
		var A = $[this.YU1],
		_ = this.N3Y[A];
		if (!_) _ = this.N3Y[A] = {};
		return _
	},
	Kl: function(A, _) {
		var $ = this.N3Y[A[this.YU1]];
		if (!$) return false;
		if (mini.isNull(_)) return false;
		return $.hasOwnProperty(_)
	},
	MZ: function(A, B) {
		var E = false;
		for (var C in B) {
			var $ = B[C],
			D = A[C];
			if (mini[LWgs](D, $)) continue;
			A[C] = $;
			if (A._state != "added") {
				A._state = "modified";
				var _ = this.Y1DJ(A);
				if (!_.hasOwnProperty(C)) _[C] = D
			}
			E = true
		}
		return E
	},
	Rs$g: true,
	updateRow: function(B, C, A) {
		B = this[XnB6](B);
		if (!B || !C) return;
		if (typeof C == "string") {
			var $ = {};
			$[C] = A;
			C = $
		}
		var E = this.MZ(B, C);
		if (E == false) return;
		if (this.Rs$g) {
			var D = this,
			F = D.H_Cw(B),
			_ = D.FW7(B);
			jQuery(_).before(F);
			_.parentNode.removeChild(_)
		}
		if (B._state == "modified") this.fire("updaterow", {
			record: B,
			row: B
		});
		if (B == this[QN2]()) this.OGY(B);
		this.DkI()
	},
	deleteRows: function(_) {
		if (!mini.isArray(_)) return;
		_ = _.clone();
		for (var $ = 0,
		A = _.length; $ < A; $++) this.deleteRow(_[$])
	},
	deleteRow: function(_) {
		_ = this[XnB6](_);
		if (!_ || _._state == "deleted") return;
		if (_._state == "added") this[PA](_, true);
		else {
			if (this.isEditingRow(_)) this[P2j](_);
			_._state = "deleted";
			var $ = this.FW7(_);
			Rw($, "mini-grid-deleteRow");
			this.fire("deleterow", {
				record: _,
				row: _
			})
		}
	},
	removeRows: function(_, B) {
		if (!mini.isArray(_)) return;
		_ = _.clone();
		for (var $ = 0,
		A = _.length; $ < A; $++) this[PA](_[$], B)
	},
	removeSelected: function() {
		var $ = this[QN2]();
		if ($) this[PA]($, true)
	},
	removeRow: function(A, H) {
		A = this[XnB6](A);
		if (!A) return;
		var D = A == this[QN2](),
		C = this[$b3](A),
		$ = this.data.indexOf(A);
		this.data.remove(A);
		if (A._state != "added") {
			A._state = "removed";
			this.S_.push(A);
			delete this.N3Y[A[this.YU1]]
		}
		delete this.Zn_[A._uid];
		var G = this.H_Cw(A),
		_ = this.FW7(A);
		if (_) _.parentNode.removeChild(_);
		var F = this.K8U(A),
		E = document.getElementById(F);
		if (E) E.parentNode.removeChild(E);
		if (C && H) {
			var B = this.getAt($);
			if (!B) B = this.getAt($ - 1);
			this[Can]();
			this[MAi](B)
		}
		this.Uc();
		this.fire("removerow", {
			record: A,
			row: A
		});
		if (D) this.OGY(A);
		this.SYpI();
		this.DkI()
	},
	autoCreateNewID: false,
	addRows: function(A, $) {
		if (!mini.isArray(A)) return;
		A = A.clone();
		for (var _ = 0,
		B = A.length; _ < B; _++) this.addRow(A[_], $)
	},
	addRow: function(A, $) {
		if (mini.isNull($)) $ = this.data.length;
		$ = this.indexOf($);
		var B = this[XnB6]($);
		this.data.insert($, A);
		if (!A[this.idField]) {
			if (this.autoCreateNewID) A[this.idField] = UUID();
			var D = {
				row: A,
				record: A
			};
			this.fire("beforeaddrow", D)
		}
		A._state = "added";
		delete this.Zn_[A._uid];
		A._uid = FmKy++;
		this.Zn_[A._uid] = A;
		var C = this.H_Cw(A);
		if (B) {
			var _ = this.FW7(B);
			jQuery(_).before(C)
		} else mini.append(this._bodyInnerEl.firstChild, C);
		this.SYpI();
		this.DkI();
		this.fire("addrow", {
			record: A,
			row: A
		})
	},
	moveRow: function(B, _) {
		B = this[XnB6](B);
		if (!B) return;
		if (_ < 0) return;
		if (_ > this.data.length) return;
		var D = this[XnB6](_);
		if (B == D) return;
		this.data.remove(B);
		var A = this.FW7(B);
		if (D) {
			_ = this.data.indexOf(D);
			this.data.insert(_, B);
			var C = this.FW7(D);
			jQuery(C).before(A)
		} else {
			this.data.insert(this.data.length, B);
			var $ = this._bodyInnerEl.firstChild;
			mini.append($.firstChild || $, A)
		}
		this.SYpI();
		this.DkI();
		this[PhrG](B);
		this.fire("moverow", {
			record: B,
			row: B,
			index: _
		})
	},
	clearRows: function() {
		this.data = [];
		this[WRl]()
	},
	indexOf: function($) {
		if (typeof $ == "number") return $;
		return this.data.indexOf($)
	},
	getAt: function($) {
		return this.data[$]
	},
	getRow: function($) {
		var _ = typeof $;
		if (_ == "number") return this.data[$];
		else if (_ == "object") return $
	},
	getRowByValue: function(A) {
		for (var _ = 0,
		B = this.data.length; _ < B; _++) {
			var $ = this.data[_];
			if ($[this.idField] == A) return $
		}
	},
	getRowByUID: function($) {
		return this.Zn_[$]
	},
	findRows: function(C) {
		var A = [];
		if (C) for (var $ = 0,
		B = this.data.length; $ < B; $++) {
			var _ = this.data[$];
			if (C(_) === true) A.push(_)
		}
		return A
	},
	findRow: function(B) {
		if (B) for (var $ = 0,
		A = this.data.length; $ < A; $++) {
			var _ = this.data[$];
			if (B(_) === true) return _
		}
	},
	collapseGroupOnLoad: false,
	setCollapseGroupOnLoad: function($) {
		this.collapseGroupOnLoad = $
	},
	getCollapseGroupOnLoad: function() {
		return this.collapseGroupOnLoad
	},
	showGroupSummary: false,
	setShowGroupSummary: function($) {
		this.showGroupSummary = $
	},
	getShowGroupSummary: function() {
		return this.showGroupSummary
	},
	collapseGroups: function() {
		if (!this.QSO3) return;
		for (var $ = 0,
		A = this.QSO3.length; $ < A; $++) {
			var _ = this.QSO3[$];
			this.Bgl(_)
		}
	},
	expandGroups: function() {
		if (!this.QSO3) return;
		for (var $ = 0,
		A = this.QSO3.length; $ < A; $++) {
			var _ = this.QSO3[$];
			this.C4(_)
		}
	},
	Bgl: function(A) {
		var C = A.rows;
		for (var _ = 0,
		E = C.length; _ < E; _++) {
			var B = C[_],
			$ = this.FW7(B);
			if ($) $.style.display = "none"
		}
		A.expanded = false;
		var F = this.uid + "$group$" + A.id,
		D = document.getElementById(F);
		if (D) Rw(D, "mini-grid-group-collapse");
		this[QM]()
	},
	C4: function(A) {
		var C = A.rows;
		for (var _ = 0,
		E = C.length; _ < E; _++) {
			var B = C[_],
			$ = this.FW7(B);
			if ($) $.style.display = ""
		}
		A.expanded = true;
		var F = this.uid + "$group$" + A.id,
		D = document.getElementById(F);
		if (D) EhVe(D, "mini-grid-group-collapse");
		this[QM]()
	},
	DJZ: 1,
	T38: "",
	Qrya: "",
	groupBy: function($, _) {
		if (!$) return;
		this.T38 = $;
		if (typeof _ == "string") _ = _.toLowerCase();
		this.Qrya = _;
		this.QSO3 = null;
		this[WRl]()
	},
	clearGroup: function() {
		this.T38 = "";
		this.Qrya = "";
		this.QSO3 = null;
		this[WRl]()
	},
	getGroupField: function() {
		return this.T38
	},
	getGroupDir: function() {
		return this.Qrya
	},
	isGrouping: function() {
		return this.T38 != ""
	},
	Cnt: function() {
		if (this[_oH]() == false) return null;
		this.QSO3 = null;
		if (!this.QSO3) {
			var F = this.T38,
			H = this.Qrya,
			D = this.data.clone();
			if (typeof H == "function") mini.sort(D, H);
			else {
				mini.sort(D,
				function(_, B) {
					var $ = _[F],
					A = B[F];
					if ($ > A) return 1;
					else return 0
				},
				this);
				if (H == "desc") D.resvert()
			}
			var B = [],
			C = {};
			for (var _ = 0,
			G = D.length; _ < G; _++) {
				var $ = D[_],
				I = $[F],
				E = mini.isDate(I) ? I.getTime() : I,
				A = C[E];
				if (!A) {
					A = C[E] = {};
					A.field = F,
					A.dir = H;
					A.value = I;
					A.rows = [];
					B.push(A);
					A.id = this.DJZ++
				}
				A.rows.push($)
			}
			this.QSO3 = B
		}
		return this.QSO3
	},
	$NG: function(C) {
		if (!this.QSO3) return null;
		var A = this.QSO3;
		for (var $ = 0,
		B = A.length; $ < B; $++) {
			var _ = A[$];
			if (_.id == C) return _
		}
	},
	CTXq: function($) {
		var _ = {
			group: $,
			rows: $.rows,
			field: $.field,
			dir: $.dir,
			value: $.value,
			cellHtml: $.field + " :" + $.value
		};
		this.fire("drawgroup", _);
		return _
	},
	onDrawGroupHeader: function(_, $) {
		this.on("drawgroupheader", _, $)
	},
	onDrawGroupSummary: function(_, $) {
		this.on("drawgroupsummary", _, $)
	},
	margeCells: function(F) {
		if (!mini.isArray(F)) return;
		for (var $ = 0,
		D = F.length; $ < D; $++) {
			var B = F[$];
			if (!B.rowSpan) B.rowSpan = 1;
			if (!B.colSpan) B.colSpan = 1;
			var E = this.TjA(B.rowIndex, B.columnIndex, B.rowSpan, B.colSpan);
			for (var C = 0,
			_ = E.length; C < _; C++) {
				var A = E[C];
				if (C != 0) A.style.display = "none";
				else {
					A.rowSpan = B.rowSpan;
					A.colSpan = B.colSpan
				}
			}
		}
	},
	TjA: function(I, E, A, B) {
		var J = [];
		if (!mini.isNumber(I)) return [];
		if (!mini.isNumber(E)) return [];
		var C = this[JU](),
		G = this.data;
		for (var F = I,
		D = I + A; F < D; F++) for (var H = E,
		$ = E + B; H < $; H++) {
			var _ = this.Ijw(F, H);
			if (_) J.push(_)
		}
		return J
	},
	HJ5N: null,
	$L: [],
	Uc: function() {
		var A = this.$L;
		for (var $ = A.length - 1; $ >= 0; $--) {
			var _ = A[$];
			if ( !! this.Zn_[_._uid] == false) {
				A.removeAt($);
				delete this.FBWu[_._uid]
			}
		}
		if (this.HJ5N) if ( !! this.FBWu[this.HJ5N._uid] == false) this.HJ5N = null
	},
	setAllowRowSelect: function($) {
		this[FYN] = $
	},
	getAllowRowSelect: function($) {
		return this[FYN]
	},
	setMultiSelect: function($) {
		if (this[A0A] != $) {
			this[A0A] = $;
			this.ESu0()
		}
	},
	isSelected: function($) {
		$ = this[XnB6]($);
		if (!$) return false;
		return !! this.FBWu[$._uid]
	},
	getSelecteds: function() {
		this.Uc();
		return this.$L.clone()
	},
	setCurrent: function($) {
		this[_Fs]($)
	},
	getCurrent: function() {
		return this[QN2]()
	},
	getSelected: function() {
		this.Uc();
		return this.HJ5N
	},
	scrollIntoView: function(A, B) {
		try {
			if (B) {
				var _ = this.Ijw(A, B);
				mini[PhrG](_, this.LLB, true)
			} else {
				var $ = this.FW7(A);
				mini[PhrG]($, this.LLB, false)
			}
		} catch(C) {}
	},
	setSelected: function($) {
		if ($) this[MAi]($);
		else this[G_o](this.HJ5N);
		if (this.HJ5N) this[PhrG](this.HJ5N);
		this.E1W()
	},
	select: function($) {
		$ = this[XnB6]($);
		if (!$) return;
		this.HJ5N = $;
		this[Lhu]([$])
	},
	deselect: function($) {
		$ = this[XnB6]($);
		if (!$) return;
		this[PHu]([$])
	},
	selectAll: function() {
		var $ = this.data.clone();
		this[Lhu]($)
	},
	deselectAll: function() {
		var $ = this.$L.clone();
		this.HJ5N = null;
		this[PHu]($)
	},
	clearSelect: function() {
		this[Can]()
	},
	selects: function(A) {
		if (!A || A.length == 0) return;
		A = A.clone();
		this.NqM(A, true);
		for (var _ = 0,
		B = A.length; _ < B; _++) {
			var $ = A[_];
			if (!this[$b3]($)) {
				this.$L.push($);
				this.FBWu[$._uid] = $
			}
		}
		this.Ym6h()
	},
	deselects: function(A) {
		if (!A) A = [];
		A = A.clone();
		this.NqM(A, false);
		for (var _ = A.length - 1; _ >= 0; _--) {
			var $ = A[_];
			if (this[$b3]($)) {
				this.$L.remove($);
				delete this.FBWu[$._uid]
			}
		}
		if (A.indexOf(this.HJ5N) != -1) this.HJ5N = null;
		this.Ym6h()
	},
	NqM: function(A, D) {
		var B = new Date();
		for (var _ = 0,
		C = A.length; _ < C; _++) {
			var $ = A[_];
			if (D) this[$L1Z]($, this.QSup);
			else this[W7e]($, this.QSup)
		}
	},
	Ym6h: function() {
		if (this.PeF$) clearTimeout(this.PeF$);
		var $ = this;
		this.PeF$ = setTimeout(function() {
			var _ = {
				selecteds: $.getSelecteds(),
				selected: $[QN2]()
			};
			$.fire("SelectionChanged", _);
			$.OGY(_.selected)
		},
		1)
	},
	OGY: function($) {
		if (this._currentTimer) clearTimeout(this._currentTimer);
		var _ = this;
		this._currentTimer = setTimeout(function() {
			var A = {
				record: $,
				row: $
			};
			_.fire("CurrentChanged", A);
			_._currentTimer = null
		},
		1)
	},
	addRowCls: function(_, A) {
		var $ = this.FW7(_);
		if ($) Rw($, A)
	},
	removeRowCls: function(_, A) {
		var $ = this.FW7(_);
		if ($) EhVe($, A)
	},
	D7: function(_, $) {
		_ = this[XnB6](_);
		if (!_ || _ == this.SL5) return;
		var A = this.FW7(_);
		if ($ && A) this[PhrG](_);
		if (this.SL5 == _) return;
		this.E1W();
		this.SL5 = _;
		Rw(A, this._ebn)
	},
	E1W: function() {
		if (!this.SL5) return;
		var $ = this.FW7(this.SL5);
		if ($) EhVe($, this._ebn);
		this.SL5 = null
	},
	Ml6: function(B) {
		var A = BD(B.target, this.DYO);
		if (!A) return null;
		var $ = A.id.split("$"),
		_ = $[$.length - 1];
		return this.getRowByUID(_)
	},
	HVW: function(C, A) {
		if (this[_Qr]) this.commitEdit();
		var B = jQuery(this.LLB).css("overflow-y");
		if (B == "hidden") {
			var $ = C.wheelDelta || -C.detail * 24,
			_ = this.LLB.scrollTop;
			_ -= $;
			this.LLB.scrollTop = _;
			if (_ == this.LLB.scrollTop) C.preventDefault();
			var C = {
				scrollTop: this.LLB.scrollTop,
				direction: "vertical"
			};
			this.fire("scroll", C)
		}
	},
	Vj6T: function(D) {
		this._tryFocus(D);
		var A = BD(D.target, "mini-grid-groupRow");
		if (A) {
			var _ = A.id.split("$"),
			C = _[_.length - 1],
			$ = this.$NG(C);
			if ($) {
				var B = !($.expanded === false ? false: true);
				if (B) this.C4($);
				else this.Bgl($)
			}
		} else this.NhB(D, "Click")
	},
	_tryFocus: function($) {
		if (Dmv(this.RQgW, $.target) || Dmv(this.Maf, $.target) || Dmv(this.NO3, $.target) || BD($.target, "mini-grid-rowEdit") || BD($.target, "mini-grid-detailRow"));
		else this.focus()
	},
	QUTX: function($) {
		this.NhB($, "Dblclick")
	},
	HG_: function($) {
		this.NhB($, "MouseDown");
		this._tryFocus($)
	},
	UP5J: function($) {
		this.NhB($, "MouseUp")
	},
	MAb: function($) {
		this.NhB($, "MouseMove")
	},
	Nv5: function($) {
		this.NhB($, "MouseOver")
	},
	XKd: function($) {
		this.NhB($, "MouseOut")
	},
	GqHp: function($) {
		this.NhB($, "KeyDown")
	},
	UsfN: function($) {
		this.NhB($, "KeyUp")
	},
	Kdwk: function($) {
		this.NhB($, "ContextMenu")
	},
	NhB: function(F, D) {
		if (!this.enabled) return;
		var C = this.PjY(F),
		_ = C.record,
		B = C.column;
		if (_) {
			var A = {
				record: _,
				row: _,
				htmlEvent: F
			},
			E = this["_OnRow" + D];
			if (E) E[POm](this, A);
			else this.fire("row" + D, A)
		}
		if (B) {
			A = {
				column: B,
				field: B.field,
				htmlEvent: F
			},
			E = this["_OnColumn" + D];
			if (E) E[POm](this, A);
			else this.fire("column" + D, A)
		}
		if (_ && B) {
			A = {
				sender: this,
				record: _,
				row: _,
				column: B,
				field: B.field,
				htmlEvent: F
			},
			E = this["_OnCell" + D];
			if (E) E[POm](this, A);
			else this.fire("cell" + D, A);
			if (B["onCell" + D]) B["onCell" + D][POm](B, A)
		}
		if (!_ && B) {
			A = {
				column: B,
				htmlEvent: F
			},
			E = this["_OnHeaderCell" + D];
			if (E) E[POm](this, A);
			else {
				var $ = "onheadercell" + D.toLowerCase();
				if (B[$]) {
					A.sender = this;
					B[$](A)
				}
				this.fire("headercell" + D, A)
			}
		}
		if (!_) this.E1W()
	},
	K5R: function($, B, C, D) {
		var _ = $[B.field],
		E = {
			sender: this,
			rowIndex: C,
			columnIndex: D,
			record: $,
			row: $,
			column: B,
			field: B.field,
			value: _,
			cellHtml: _,
			rowCls: null,
			cellCls: B.cellCls || "",
			rowStyle: null,
			cellStyle: B.cellStyle || "",
			allowCellWrap: this.allowCellWrap
		};
		if (B.dateFormat) if (mini.isDate(E.value)) E.cellHtml = mini.formatDate(_, B.dateFormat);
		else E.cellHtml = _;
		if (B.displayField) E.cellHtml = $[B.displayField];
		var A = B.renderer;
		if (A) {
			fn = typeof A == "function" ? A: window[A];
			if (fn) E.cellHtml = fn[POm](B, E)
		}
		this.fire("drawcell", E);
		if (E.cellHtml === null || E.cellHtml === undefined || E.cellHtml === "") E.cellHtml = "&nbsp;";
		return E
	},
	_OnCellMouseDown: function(_) {
		var $ = _.record;
		if ($.enabled === false) return;
		this.fire("cellmousedown", _)
	},
	_OnRowMouseOut: function($) {
		if (!this.enabled) return;
		if (Dmv(this.el, $.target)) return
	},
	_OnRowMouseMove: function(_) {
		record = _.record;
		if (!this.enabled || record.enabled === false || this[JSO] == false) return;
		this.fire("rowmousemove", _);
		var $ = this;
		$.D7(record)
	},
	_OnHeaderCellClick: function(A) {
		A.sender = this;
		var $ = A.column;
		if (!Adi(A.htmlEvent.target, "mini-grid-splitter")) {
			if (this[VLR] && this[BMKa]() == false) if (!$.columns || $.columns.length == 0) if ($.field && $.allowSort !== false) {
				var _ = "asc";
				if (this.sortField == $.field) _ = this.sortOrder == "asc" ? "desc": "asc";
				this.sortBy($.field, _)
			}
			this.fire("headercellclick", A)
		}
	},
	__OnHtmlContextMenu: function(_) {
		var $ = {
			popupEl: this.el,
			htmlEvent: _,
			cancel: false
		};
		if (Dmv(this.U2N, _.target)) {
			if (this.headerContextMenu) {
				this.headerContextMenu.fire("BeforeOpen", $);
				if ($.cancel == true) return;
				this.headerContextMenu.fire("opening", $);
				if ($.cancel == true) return;
				this.headerContextMenu.showAtPos(_.pageX, _.pageY);
				this.headerContextMenu.fire("Open", $)
			}
		} else if (this[V_]) {
			this[V_].fire("BeforeOpen", $);
			if ($.cancel == true) return;
			this[V_].fire("opening", $);
			if ($.cancel == true) return;
			this[V_].showAtPos(_.pageX, _.pageY);
			this[V_].fire("Open", $)
		}
		return false
	},
	headerContextMenu: null,
	setHeaderContextMenu: function($) {
		var _ = this._getContextMenu($);
		if (!_) return;
		if (this.headerContextMenu !== _) {
			this.headerContextMenu = _;
			this.headerContextMenu.owner = this;
			VPoJ(this.el, "contextmenu", this.__OnHtmlContextMenu, this)
		}
	},
	getHeaderContextMenu: function() {
		return this.headerContextMenu
	},
	onRowDblClick: function(_, $) {
		this.on("rowdblclick", _, $)
	},
	onRowClick: function(_, $) {
		this.on("rowclick", _, $)
	},
	onRowMouseDown: function(_, $) {
		this.on("rowmousedown", _, $)
	},
	onRowContextMenu: function(_, $) {
		this.on("rowcontextmenu", _, $)
	},
	onCellClick: function(_, $) {
		this.on("cellclick", _, $)
	},
	onCellMouseDown: function(_, $) {
		this.on("cellmousedown", _, $)
	},
	onCellContextMenu: function(_, $) {
		this.on("cellcontextmenu", _, $)
	},
	onBeforeLoad: function(_, $) {
		this.on("beforeload", _, $)
	},
	onLoad: function(_, $) {
		this.on("load", _, $)
	},
	onLoadError: function(_, $) {
		this.on("loaderror", _, $)
	},
	onPreLoad: function(_, $) {
		this.on("preload", _, $)
	},
	onDrawCell: function(_, $) {
		this.on("drawcell", _, $)
	},
	onCellBeginEdit: function(_, $) {
		this.on("cellbeginedit", _, $)
	},
	getAttrs: function(el) {
		var attrs = OVp[Xc$][Z_s][POm](this, el),
		cs = mini[$Vy$](el);
		for (var i = 0,
		l = cs.length; i < l; i++) {
			var node = cs[i],
			property = jQuery(node).attr("property");
			if (!property) continue;
			property = property.toLowerCase();
			if (property == "columns") attrs.columns = mini._ParseColumns(node);
			else if (property == "data") attrs.data = node.innerHTML
		}
		mini[Dm7Q](el, attrs, ["url", "sizeList", "bodyCls", "bodyStyle", "footerCls", "footerStyle", "pagerCls", "pagerStyle", "onrowdblclick", "onrowclick", "onrowmousedown", "onrowcontextmenu", "oncellclick", "oncellmousedown", "oncellcontextmenu", "onbeforeload", "onpreload", "onloaderror", "onload", "ondrawcell", "oncellbeginedit", "onselectionchanged", "onshowrowdetail", "onhiderowdetail", "idField", "valueField", "ajaxMethod", "ondrawgroup", "pager", "oncellcommitedit", "oncellendedit", "headerContextMenu", "loadingMsg", "emptyText", "cellEditAction"]);
		mini[CW7m](el, attrs, ["showHeader", "showFooter", "showTop", "allowSortColumn", "allowMoveColumn", "allowResizeColumn", "showHGridLines", "showVGridLines", "showFilterRow", "showSummaryRow", "showFooter", "showTop", "fitColumns", "showLoading", "multiSelect", "allowAlternating", "resultAsData", "allowRowSelect", "enableHotTrack", "showPageIndex", "showPageSize", "showTotalCount", "checkSelectOnLoad", "allowResize", "autoLoad", "autoHideRowDetail", "allowCellSelect", "allowCellEdit", "allowCellWrap", "selectOnLoad", "virtualScroll", "collapseGroupOnLoad", "showGroupSummary", "showEmptyText"]);
		mini[_i](el, attrs, ["columnWidth", "frozenStartColumn", "frozenEndColumn", "pageIndex", "pageSize"]);
		if (typeof attrs[_0Sp] == "string") attrs[_0Sp] = eval(attrs[_0Sp]);
		if (!attrs[TKUG] && attrs[KQP]) attrs[TKUG] = attrs[KQP];
		return attrs
	}
});
J9_$(OVp, "datagrid");
mini_Column_Prototype = {
	Ijw: function($, _) {
		$ = this[XnB6] ? this[XnB6]($) : this[Lks]($);
		_ = this[DA5](_);
		if (!$ || !_) return null;
		var A = this.X2yo($, _);
		return document.getElementById(A)
	},
	PjY: function(A) {
		var $ = this.Ml6 ? this.Ml6(A) : this._getNodeByEvent(A),
		_ = this.J98(A);
		return {
			record: $,
			column: _
		}
	},
	J98: function(B) {
		var _ = BD(B.target, this._cellCls);
		if (!_) _ = BD(B.target, this._headerCellCls);
		if (_) {
			var $ = _.id.split("$"),
			A = $[$.length - 1];
			return this.Rp4T(A)
		}
		return null
	},
	B$Q: function($) {
		return this.uid + "$column$" + $._id
	},
	getColumnBox: function(A) {
		var B = this.B$Q(A),
		_ = document.getElementById(B);
		if (_) {
			var $ = Vrm(_);
			$.x -= 1;
			$.left = $.x;
			$.right = $.x + $.width;
			return $
		}
	},
	setColumns: function(value) {
		if (!mini.isArray(value)) value = [];
		this.columns = value;
		this.MfSu = {};
		this.Gq = {};
		this.PSA = [];
		this.maxColumnLevel = 0;
		var level = 0;
		function init(column, index, parentColumn) {
			if (column.type) {
				if (!mini.isNull(column.header) && typeof column.header !== "function") if (column.header.trim() == "") delete column.header;
				var col = mini[Cye](column.type);
				if (col) {
					var _column = mini.copyTo({},
					column);
					mini.copyTo(column, col);
					mini.copyTo(column, _column)
				}
			}
			if (typeof column.init == "function") {
				column.init(this);
				delete column.init
			}
			var width = parseInt(column.width);
			if (mini.isNumber(width) && String(width) == column.width) column.width = width + "px";
			if (mini.isNull(column.width)) column.width = this[_zL] + "px";
			column.visible = column.visible !== false;
			column[Wpk] = column.allowRresize !== false;
			column.allowMove = column.allowMove !== false;
			column.allowSort = column.allowSort === true;
			column.allowDrag = !!column.allowDrag;
			column[PrF] = !!column[PrF];
			column._id = RtO0++;
			column._gridUID = this.uid;
			column[Lws] = this[Lws];
			column._pid = parentColumn == this ? -1 : parentColumn._id;
			this.MfSu[column._id] = column;
			if (column.name) this.Gq[column.name] = column;
			if (!column.columns || column.columns.length == 0) this.PSA.push(column);
			column.level = level;
			level += 1;
			this[TuR](column, init, this);
			level -= 1;
			if (column.level > this.maxColumnLevel) this.maxColumnLevel = column.level;
			if (typeof column.editor == "string") {
				var cls = mini.getClass(column.editor);
				if (cls) column.editor = {
					type: column.editor
				};
				else column.editor = eval("(" + column.editor + ")")
			}
			if (typeof column.filter == "string") column.filter = eval("(" + column.filter + ")");
			if (column.filter && !column.filter.el) column.filter = mini.create(column.filter);
			if (typeof column.init == "function" && column.inited != true) column.init(this);
			column.inited = true
		}
		this[TuR](this, init, this);
		if (this.AgRA) this.AgRA();
		if (this.ZHN) this.ZHN();
		this[WRl]()
	},
	getColumns: function() {
		return this.columns
	},
	getBottomColumns: function() {
		return this.PSA
	},
	getBottomVisibleColumns: function() {
		var A = [];
		for (var $ = 0,
		B = this.PSA.length; $ < B; $++) {
			var _ = this.PSA[$];
			if (this[VRL](_)) A.push(_)
		}
		return A
	},
	eachColumns: function(B, F, C) {
		var D = B.columns;
		if (D) {
			var _ = D.clone();
			for (var A = 0,
			E = _.length; A < E; A++) {
				var $ = _[A];
				if (F[POm](C, $, A, B) === false) break
			}
		}
	},
	getColumn: function($) {
		var _ = typeof $;
		if (_ == "number") return this[JU]()[$];
		else if (_ == "object") return $;
		else return this.Gq[$]
	},
	Rp4T: function($) {
		return this.MfSu[$]
	},
	getParentColumn: function($) {
		$ = this[DA5]($);
		var _ = $._pid;
		if (_ == -1) return this;
		return this.MfSu[_]
	},
	getAncestorColumns: function(A) {
		var _ = [];
		while (1) {
			var $ = this[XCU](A);
			if (!$ || $ == this) break;
			_[_.length] = $;
			A = $
		}
		_.reverse();
		return _
	},
	isAncestorColumn: function(_, B) {
		if (_ == B) return true;
		if (!_ || !B) return false;
		var A = this[Q4sE](B);
		for (var $ = 0,
		C = A.length; $ < C; $++) if (A[$] == _) return true;
		return false
	},
	isVisibleColumn: function(_) {
		_ = this[DA5](_);
		var A = this[Q4sE](_);
		for (var $ = 0,
		B = A.length; $ < B; $++) if (A[$].visible == false) return false;
		return true
	},
	updateColumn: function(_, $) {
		_ = this[DA5](_);
		if (!_) return;
		mini.copyTo(_, $);
		this[L6r](this.columns)
	},
	removeColumn: function($) {
		$ = this[DA5]($);
		var _ = this[XCU]($);
		if ($ && _) {
			_.columns.remove($);
			this[L6r](this.columns)
		}
		return $
	},
	moveColumn: function(C, _, A) {
		C = this[DA5](C);
		_ = this[DA5](_);
		if (!C || !_ || !A || C == _) return;
		if (this[$ra](C, _)) return;
		var D = this[XCU](C);
		if (D) D.columns.remove(C);
		var B = _,
		$ = A;
		if ($ == "before") {
			B = this[XCU](_);
			$ = B.columns.indexOf(_)
		} else if ($ == "after") {
			B = this[XCU](_);
			$ = B.columns.indexOf(_) + 1
		} else if ($ == "add" || $ == "append") {
			if (!B.columns) B.columns = [];
			$ = B.columns.length
		} else if (!mini.isNumber($)) return;
		B.columns.insert($, C);
		this[L6r](this.columns)
	},
	hideColumn: function($) {
		$ = this[DA5]($);
		if (!$) return;
		if (this[_Qr]) this.commitEdit();
		$.visible = false;
		this.XQy($, false);
		this.ESu0();
		this[QM]();
		this.DVH()
	},
	showColumn: function($) {
		$ = this[DA5]($);
		if (!$) return;
		if (this[_Qr]) this.commitEdit();
		$.visible = true;
		this.XQy($, true);
		this.ESu0();
		this[QM]();
		this.DVH()
	},
	Vr: function() {
		var _ = this[Ryb](),
		D = [];
		for (var C = 0,
		F = _; C <= F; C++) D.push([]);
		function A(C) {
			var D = mini[J19](C.columns, "columns"),
			A = 0;
			for (var $ = 0,
			B = D.length; $ < B; $++) {
				var _ = D[$];
				if (_.visible != true || _._hide == true) continue;
				if (!_.columns || _.columns.length == 0) A += 1
			}
			return A
		}
		var $ = mini[J19](this.columns, "columns");
		for (C = 0, F = $.length; C < F; C++) {
			var E = $[C],
			B = D[E.level];
			if (E.columns && E.columns.length > 0) E.colspan = A(E);
			if ((!E.columns || E.columns.length == 0) && E.level < _) E.rowspan = _ - E.level + 1;
			B.push(E)
		}
		return D
	},
	getMaxColumnLevel: function() {
		return this.maxColumnLevel
	}
};
mini.copyTo(OVp.prototype, mini_Column_Prototype);
mini._GridSort = function($) {
	this.grid = $;
	VPoJ($.U2N, "mousemove", this.__OnGridHeaderMouseMove, this);
	VPoJ($.U2N, "mouseout", this.__OnGridHeaderMouseOut, this)
};
mini._GridSort[DK] = {
	__OnGridHeaderMouseOut: function($) {
		if (this.EEGTColumnEl) EhVe(this.EEGTColumnEl, "mini-grid-headerCell-hover")
	},
	__OnGridHeaderMouseMove: function(_) {
		var $ = BD(_.target, "mini-grid-headerCell");
		if ($) {
			Rw($, "mini-grid-headerCell-hover");
			this.EEGTColumnEl = $
		}
	},
	__onGridHeaderCellClick: function(B) {
		var $ = this.grid,
		A = BD(B.target, "mini-grid-headerCell");
		if (A) {
			var _ = $[DA5](A.id.split("$")[2]);
			if ($[G7] && _ && _.allowDrag) {
				this.dragColumn = _;
				this._columnEl = A;
				this.getDrag().start(B)
			}
		}
	}
};
mini._ColumnSplitter = function($) {
	this.grid = $;
	VPoJ(this.grid.el, "mousedown", this.L6Y, this);
	$.on("layout", this.NTY, this)
};
mini._ColumnSplitter[DK] = {
	NTY: function(A) {
		if (this.splittersEl) mini[NlM](this.splittersEl);
		if (this.splitterTimer) return;
		var $ = this.grid;
		if ($[S8B]() == false) return;
		var _ = this;
		this.splitterTimer = setTimeout(function() {
			var H = $[JU](),
			I = H.length,
			E = Vrm($.U2N, true),
			B = $.getScrollLeft(),
			G = [];
			for (var J = 0,
			F = H.length; J < F; J++) {
				var D = H[J],
				C = $[$XBP](D);
				if (!C) break;
				var A = C.top - E.top,
				M = C.right - E.left - 2,
				K = C.height;
				if ($[JLT] && $[JLT]()) {
					if (J >= $[Tn]);
				} else M += B;
				var N = $[XCU](D);
				if (N && N.columns) if (N.columns[N.columns.length - 1] == D) if (K + 5 < E.height) {
					A = 0;
					K = E.height
				}
				if ($[THb5] && D[Wpk]) G[G.length] = "<div id=\"" + D._id + "\" class=\"mini-grid-splitter\" style=\"left:" + (M - 1) + "px;top:" + A + "px;height:" + K + "px;\"></div>"
			}
			var O = G.join("");
			_.splittersEl = document.createElement("div");
			_.splittersEl.className = "mini-grid-splitters";
			_.splittersEl.innerHTML = O;
			var L = $._getHeaderScrollEl();
			L.appendChild(_.splittersEl);
			_.splitterTimer = null
		},
		100)
	},
	L6Y: function(B) {
		var $ = this.grid,
		A = B.target;
		if (Adi(A, "mini-grid-splitter")) {
			var _ = $.MfSu[A.id];
			if ($[THb5] && _ && _[Wpk]) {
				this.splitterColumn = _;
				this.getDrag().start(B)
			}
		}
	},
	getDrag: function() {
		if (!this.drag) this.drag = new mini.Drag({
			capture: true,
			onStart: mini.createDelegate(this.Zn, this),
			onMove: mini.createDelegate(this.Utfh, this),
			onStop: mini.createDelegate(this.OOu4, this)
		});
		return this.drag
	},
	Zn: function(_) {
		var $ = this.grid,
		B = $[$XBP](this.splitterColumn);
		this.columnBox = B;
		this.FT6 = mini.append(document.body, "<div class=\"mini-grid-proxy\"></div>");
		var A = $.getBox(true);
		A.x = B.x;
		A.width = B.width;
		A.right = B.right;
		_cw(this.FT6, A)
	},
	Utfh: function(A) {
		var $ = this.grid,
		B = mini.copyTo({},
		this.columnBox),
		_ = B.width + (A.now[0] - A.init[0]);
		if (_ < $.columnMinWidth) _ = $.columnMinWidth;
		if (_ > $.columnMaxWidth) _ = $.columnMaxWidth;
		_ZS(this.FT6, _)
	},
	OOu4: function(E) {
		var $ = this.grid,
		F = Vrm(this.FT6),
		D = this,
		C = $[VLR];
		$[VLR] = false;
		setTimeout(function() {
			jQuery(D.FT6).remove();
			D.FT6 = null;
			$[VLR] = C
		},
		10);
		var G = this.splitterColumn,
		_ = parseInt(G.width);
		if (_ + "%" != G.width) {
			var A = $[PpG](G),
			B = parseInt(_ / A * F.width);
			$[_h](G, B)
		}
	}
};
mini._ColumnMove = function($) {
	this.grid = $;
	VPoJ(this.grid.el, "mousedown", this.L6Y, this)
};
mini._ColumnMove[DK] = {
	L6Y: function(B) {
		var $ = this.grid;
		if ($[BMKa] && $[BMKa]()) return;
		if (Adi(B.target, "mini-grid-splitter")) return;
		if (B.button == mini.MouseButton.Right) return;
		var A = BD(B.target, $._headerCellCls);
		if (A) {
			var _ = $.J98(B);
			if ($[G7] && _ && _.allowMove) {
				this.dragColumn = _;
				this._columnEl = A;
				this.getDrag().start(B)
			}
		}
	},
	getDrag: function() {
		if (!this.drag) this.drag = new mini.Drag({
			capture: isIE9 ? false: true,
			onStart: mini.createDelegate(this.Zn, this),
			onMove: mini.createDelegate(this.Utfh, this),
			onStop: mini.createDelegate(this.OOu4, this)
		});
		return this.drag
	},
	Zn: function(_) {
		function A(_) {
			var A = _.header;
			if (typeof A == "function") A = A[POm]($, _);
			if (mini.isNull(A) || A === "") A = "&nbsp;";
			return A
		}
		var $ = this.grid;
		this.FT6 = mini.append(document.body, "<div class=\"mini-grid-columnproxy\"></div>");
		this.FT6.innerHTML = "<div class=\"mini-grid-columnproxy-inner\" style=\"height:26px;\">" + A(this.dragColumn) + "</div>";
		mini[UCK](this.FT6, _.now[0] + 15, _.now[1] + 18);
		Rw(this.FT6, "mini-grid-no");
		this.moveTop = mini.append(document.body, "<div class=\"mini-grid-movetop\"></div>");
		this.moveBottom = mini.append(document.body, "<div class=\"mini-grid-movebottom\"></div>")
	},
	Utfh: function(A) {
		var $ = this.grid,
		G = A.now[0];
		mini[UCK](this.FT6, G + 15, A.now[1] + 18);
		this.targetColumn = this.insertAction = null;
		var D = BD(A.event.target, $._headerCellCls);
		if (D) {
			var C = $.J98(A.event);
			if (C && C != this.dragColumn) {
				var _ = $[XCU](this.dragColumn),
				E = $[XCU](C);
				if (_ == E) {
					this.targetColumn = C;
					this.insertAction = "before";
					var F = $[$XBP](this.targetColumn);
					if (G > F.x + F.width / 2) this.insertAction = "after"
				}
			}
		}
		if (this.targetColumn) {
			Rw(this.FT6, "mini-grid-ok");
			EhVe(this.FT6, "mini-grid-no");
			var B = $[$XBP](this.targetColumn);
			this.moveTop.style.display = "block";
			this.moveBottom.style.display = "block";
			if (this.insertAction == "before") {
				mini[UCK](this.moveTop, B.x - 4, B.y - 9);
				mini[UCK](this.moveBottom, B.x - 4, B.bottom)
			} else {
				mini[UCK](this.moveTop, B.right - 4, B.y - 9);
				mini[UCK](this.moveBottom, B.right - 4, B.bottom)
			}
		} else {
			EhVe(this.FT6, "mini-grid-ok");
			Rw(this.FT6, "mini-grid-no");
			this.moveTop.style.display = "none";
			this.moveBottom.style.display = "none"
		}
	},
	OOu4: function(_) {
		var $ = this.grid;
		mini[NlM](this.FT6);
		mini[NlM](this.moveTop);
		mini[NlM](this.moveBottom);
		$[CRtv](this.dragColumn, this.targetColumn, this.insertAction);
		this.FT6 = this.moveTop = this.moveBottom = this.dragColumn = this.targetColumn = null
	}
};
MBHX = function($) {
	this.grid = $;
	this.grid.on("cellmousedown", this.BNtQ, this);
	this.grid.on("cellclick", this.CDR, this);
	this.grid.on("celldblclick", this.CDR, this);
	VPoJ(this.grid.el, "keydown", this.Ys, this)
};
MBHX[DK] = {
	Ys: function(G) {
		var $ = this.grid;
		if (Dmv($.RQgW, G.target) || Dmv($.Maf, G.target) || Dmv($.NO3, G.target)) return;
		var A = $.getCurrentCell();
		if (G.shiftKey || G.ctrlKey) return;
		if (G.keyCode == 37 || G.keyCode == 38 || G.keyCode == 39 || G.keyCode == 40) G.preventDefault();
		var C = $[Rm2](),
		B = A ? A[1] : null,
		_ = A ? A[0] : null;
		if (!A) _ = $.getCurrent();
		var F = C.indexOf(B),
		D = $.indexOf(_),
		E = $.getData().length;
		switch (G.keyCode) {
		case 27:
			break;
		case 13:
			if ($[_Qr] && A) $[QYG]();
			break;
		case 37:
			if (B) {
				if (F > 0) F -= 1
			} else F = 0;
			break;
		case 38:
			if (_) {
				if (D > 0) D -= 1
			} else D = 0;
			if (D != 0 && $.isVirtualScroll()) if ($._viewRegion.start > D) {
				$.LLB.scrollTop -= $._rowHeight;
				$._tryUpdateScroll()
			}
			break;
		case 39:
			if (B) {
				if (F < C.length - 1) F += 1
			} else F = 0;
			break;
		case 40:
			if (_) {
				if (D < E - 1) D += 1
			} else D = 0;
			if ($.isVirtualScroll()) if ($._viewRegion.end < D) {
				$.LLB.scrollTop += $._rowHeight;
				$._tryUpdateScroll()
			}
			break;
		default:
			break
		}
		B = C[F];
		_ = $.getAt(D);
		if (B && _ && $[JTf]) {
			A = [_, B];
			$[UNL](A)
		}
		if (_ && $[FYN]) {
			$[Can]();
			$[B_w](_)
		}
	},
	CDR: function(A) {
		if (this.grid.cellEditAction != A.type) return;
		var $ = A.record,
		_ = A.column;
		if (!_[PrF] && !this.grid[Ot]()) if (A.htmlEvent.shiftKey || A.htmlEvent.ctrlKey);
		else this.grid[QYG]()
	},
	BNtQ: function(C) {
		var _ = C.record,
		B = C.column,
		$ = this.grid;
		if (this.grid[JTf]) {
			var A = [_, B];
			this.grid[UNL](A)
		}
		if ($[FYN]) if ($[A0A]) {
			this.grid.el.onselectstart = function() {};
			if (C.htmlEvent.shiftKey) {
				this.grid.el.onselectstart = function() {
					return false
				};
				C.htmlEvent.preventDefault();
				if (!this.currentRecord) {
					this.grid[MAi](_);
					this.currentRecord = this.grid[QN2]()
				} else {
					this.grid[Can]();
					this.grid.selectRange(this.currentRecord, _)
				}
			} else {
				this.grid.el.onselectstart = function() {};
				if (C.htmlEvent.ctrlKey) {
					this.grid.el.onselectstart = function() {
						return false
					};
					C.htmlEvent.preventDefault()
				}
				if (C.column._multiRowSelect === true || C.htmlEvent.ctrlKey) {
					if ($[$b3](_)) $[G_o](_);
					else $[MAi](_)
				} else if ($[$b3](_));
				else {
					$[Can]();
					$[MAi](_)
				}
				this.currentRecord = this.grid[QN2]()
			}
		} else if (!$[$b3](_)) {
			$[Can]();
			$[MAi](_)
		} else if (C.htmlEvent.ctrlKey) $[Can]()
	}
};
mini._CellToolTip = function($) {
	this.grid = $;
	VPoJ(this.grid.el, "mousemove", this.__onGridMouseMove, this)
};
mini._CellToolTip[DK] = {
	__onGridMouseMove: function(C) {
		var $ = this.grid,
		A = $.PjY(C),
		_ = $.Ijw(A.record, A.column);
		if (_) {
			if (_.firstChild) if (Adi(_.firstChild, "mini-grid-cell-dirty") || Adi(_.firstChild, "mini-treegrid-treecolumn-inner")) _ = _.firstChild;
			if (_.scrollWidth > _.clientWidth) {
				var B = _.innerText || _.textContent || "";
				_.title = B.trim()
			} else _.title = ""
		}
	}
};
mini.GridEditor = function() {
	this._inited = true;
	DZV[Xc$][TYcW][POm](this);
	this[JLTb]();
	this.el.uid = this.uid;
	this[ZOZN]();
	this.OV();
	this[Mr](this.uiCls)
};
Mup(mini.GridEditor, DZV, {
	el: null,
	_create: function() {
		this.el = document.createElement("input");
		this.el.type = "text";
		this.el.style.width = "100%"
	},
	getValue: function() {
		return this.el.value
	},
	setValue: function($) {
		this.el.value = $
	},
	setWidth: function($) {}
});
K9O = function() {
	K9O[Xc$][TYcW][POm](this)
};
Mup(K9O, DZV, {
	pageIndex: 0,
	pageSize: 10,
	totalCount: 0,
	totalPage: 0,
	showPageIndex: true,
	showPageSize: true,
	showTotalCount: true,
	showPageInfo: true,
	_clearBorder: false,
	showButtonText: false,
	showButtonIcon: true,
	firstText: "\u9996\u9875",
	prevText: "\u4e0a\u4e00\u9875",
	nextText: "\u4e0b\u4e00\u9875",
	lastText: "\u5c3e\u9875",
	pageInfoText: "\u6bcf\u9875 {0} \u6761,\u5171 {1} \u6761",
	sizeList: [10, 20, 50, 100],
	uiCls: "mini-pager",
	_create: function() {
		this.el = document.createElement("div");
		this.el.className = "mini-pager";
		var $ = "<div class=\"mini-pager-left\"></div><div class=\"mini-pager-right\"></div>";
		this.el.innerHTML = $;
		this.buttonsEl = this._leftEl = this.el.childNodes[0];
		this._rightEl = this.el.childNodes[1];
		this.sizeEl = mini.append(this.buttonsEl, "<span class=\"mini-pager-size\"></span>");
		this.sizeCombo = new JX();
		this.sizeCombo.setName("pagesize");
		this.sizeCombo[B26J](45);
		this.sizeCombo[LV3H](this.sizeEl);
		mini.append(this.sizeEl, "<span class=\"separator\"></span>");
		this.firstButton = new LDc();
		this.firstButton[LV3H](this.buttonsEl);
		this.prevButton = new LDc();
		this.prevButton[LV3H](this.buttonsEl);
		this.indexEl = document.createElement("span");
		this.indexEl.className = "mini-pager-index";
		this.indexEl.innerHTML = "<input id=\"\" type=\"text\" class=\"mini-pager-num\"/><span class=\"mini-pager-pages\">/ 0</span>";
		this.buttonsEl.appendChild(this.indexEl);
		this.numInput = this.indexEl.firstChild;
		this.pagesLabel = this.indexEl.lastChild;
		this.nextButton = new LDc();
		this.nextButton[LV3H](this.buttonsEl);
		this.lastButton = new LDc();
		this.lastButton[LV3H](this.buttonsEl);
		this.firstButton.setPlain(true);
		this.prevButton.setPlain(true);
		this.nextButton.setPlain(true);
		this.lastButton.setPlain(true);
		this.update()
	},
	destroy: function($) {
		if (this.pageSelect) {
			mini[Jhg](this.pageSelect);
			this.pageSelect = null
		}
		if (this.numInput) {
			mini[Jhg](this.numInput);
			this.numInput = null
		}
		this.sizeEl = null;
		this.buttonsEl = null;
		K9O[Xc$][$Kt][POm](this, $)
	},
	_initEvents: function() {
		K9O[Xc$][ZOZN][POm](this);
		this.firstButton.on("click",
		function($) {
			this.Ljs(0)
		},
		this);
		this.prevButton.on("click",
		function($) {
			this.Ljs(this[S5r] - 1)
		},
		this);
		this.nextButton.on("click",
		function($) {
			this.Ljs(this[S5r] + 1)
		},
		this);
		this.lastButton.on("click",
		function($) {
			this.Ljs(this.totalPage)
		},
		this);
		function $() {
			var $ = parseInt(this.numInput.value);
			if (isNaN($)) this.update();
			else this.Ljs($ - 1)
		}
		VPoJ(this.numInput, "change",
		function(_) {
			$[POm](this)
		},
		this);
		VPoJ(this.numInput, "keydown",
		function(_) {
			if (_.keyCode == 13) {
				$[POm](this);
				_.stopPropagation()
			}
		},
		this);
		this.sizeCombo.on("valuechanged", this.PE3, this)
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		mini.layout(this._leftEl);
		mini.layout(this._rightEl)
	},
	setPageIndex: function($) {
		if (isNaN($)) return;
		this[S5r] = $;
		this.update()
	},
	getPageIndex: function() {
		return this[S5r]
	},
	setPageSize: function($) {
		if (isNaN($)) return;
		this[Tc] = $;
		this.update()
	},
	getPageSize: function() {
		return this[Tc]
	},
	setTotalCount: function($) {
		$ = parseInt($);
		if (isNaN($)) return;
		this[ZUJ] = $;
		this.update()
	},
	getTotalCount: function() {
		return this[ZUJ]
	},
	setSizeList: function($) {
		if (!mini.isArray($)) return;
		this[_0Sp] = $;
		this.update()
	},
	getSizeList: function() {
		return this[_0Sp]
	},
	setShowPageSize: function($) {
		this.showPageSize = $;
		this.update()
	},
	getShowPageSize: function() {
		return this.showPageSize
	},
	setShowPageIndex: function($) {
		this.showPageIndex = $;
		this.update()
	},
	getShowPageIndex: function() {
		return this.showPageIndex
	},
	setShowTotalCount: function($) {
		this.showTotalCount = $;
		this.update()
	},
	getShowTotalCount: function() {
		return this.showTotalCount
	},
	setShowPageInfo: function($) {
		this.showPageInfo = $;
		this.update()
	},
	getShowPageInfo: function() {
		return this.showPageInfo
	},
	getTotalPage: function() {
		return this.totalPage
	},
	update: function($, H, F) {
		if (mini.isNumber($)) this[S5r] = parseInt($);
		if (mini.isNumber(H)) this[Tc] = parseInt(H);
		if (mini.isNumber(F)) this[ZUJ] = parseInt(F);
		this.totalPage = parseInt(this[ZUJ] / this[Tc]) + 1;
		if ((this.totalPage - 1) * this[Tc] == this[ZUJ]) this.totalPage -= 1;
		if (this[ZUJ] == 0) this.totalPage = 0;
		if (this[S5r] > this.totalPage - 1) this[S5r] = this.totalPage - 1;
		if (this[S5r] <= 0) this[S5r] = 0;
		if (this.totalPage <= 0) this.totalPage = 0;
		this.firstButton.enable();
		this.prevButton.enable();
		this.nextButton.enable();
		this.lastButton.enable();
		if (this[S5r] == 0) {
			this.firstButton.disable();
			this.prevButton.disable()
		}
		if (this[S5r] >= this.totalPage - 1) {
			this.nextButton.disable();
			this.lastButton.disable()
		}
		this.numInput.value = this[S5r] > -1 ? this[S5r] + 1 : 0;
		this.pagesLabel.innerHTML = "/ " + this.totalPage;
		var K = this[_0Sp].clone();
		if (K.indexOf(this[Tc]) == -1) {
			K.push(this[Tc]);
			K = K.sort(function($, _) {
				return $ > _
			})
		}
		var _ = [];
		for (var E = 0,
		B = K.length; E < B; E++) {
			var D = K[E],
			G = {};
			G.text = D;
			G.id = D;
			_.push(G)
		}
		this.sizeCombo[Uq0](_);
		this.sizeCombo[G3S](this[Tc]);
		var A = this.firstText,
		J = this.prevText,
		C = this.nextText,
		I = this.lastText;
		if (this.showButtonText == false) A = J = C = I = "";
		this.firstButton[HH](A);
		this.prevButton[HH](J);
		this.nextButton[HH](C);
		this.lastButton[HH](I);
		A = this.firstText,
		J = this.prevText,
		C = this.nextText,
		I = this.lastText;
		if (this.showButtonText == true) A = J = C = I = "";
		this.firstButton.setTooltip(A);
		this.prevButton.setTooltip(J);
		this.nextButton.setTooltip(C);
		this.lastButton.setTooltip(I);
		this.firstButton.setIconCls(this.showButtonIcon ? "mini-pager-first": "");
		this.prevButton.setIconCls(this.showButtonIcon ? "mini-pager-prev": "");
		this.nextButton.setIconCls(this.showButtonIcon ? "mini-pager-next": "");
		this.lastButton.setIconCls(this.showButtonIcon ? "mini-pager-last": "");
		this._rightEl.innerHTML = String.format(this.pageInfoText, this.pageSize, this[ZUJ]);
		this.indexEl.style.display = this.showPageIndex ? "": "none";
		this.sizeEl.style.display = this.showPageSize ? "": "none";
		this._rightEl.style.display = this.showPageInfo ? "": "none"
	},
	PE3: function(_) {
		var $ = parseInt(this.sizeCombo.getValue());
		this.Ljs(0, $)
	},
	Ljs: function($, _) {
		var A = {
			pageIndex: mini.isNumber($) ? $: this.pageIndex,
			pageSize: mini.isNumber(_) ? _: this.pageSize,
			cancel: false
		};
		if (A[S5r] > this.totalPage - 1) A[S5r] = this.totalPage - 1;
		if (A[S5r] < 0) A[S5r] = 0;
		this.fire("pagechanged", A);
		if (A.cancel == false) this.update(A.pageIndex, A[Tc])
	},
	onPageChanged: function(_, $) {
		this.on("pagechanged", _, $)
	},
	getAttrs: function(el) {
		var attrs = K9O[Xc$][Z_s][POm](this, el);
		mini[Dm7Q](el, attrs, ["onpagechanged", "sizeList"]);
		mini[CW7m](el, attrs, ["showPageIndex", "showPageSize", "showTotalCount", "showPageInfo"]);
		mini[_i](el, attrs, ["pageIndex", "pageSize", "totalCount"]);
		if (typeof attrs[_0Sp] == "string") attrs[_0Sp] = eval(attrs[_0Sp]);
		return attrs
	}
});
J9_$(K9O, "pager");
E8sl = function() {
	this.columns = [];
	this.PSA = [];
	this.MfSu = {};
	this.Gq = {};
	E8sl[Xc$][TYcW][POm](this);
	this.O7sE.style.display = this[Wpk] ? "": "none"
};
Mup(E8sl, DaS, {
	_rowIdField: "_id",
	width: 300,
	height: 180,
	allowResize: false,
	treeColumn: "",
	columns: [],
	columnWidth: 80,
	allowResizeColumn: true,
	allowMoveColumn: true,
	NuD: true,
	_headerCellCls: "mini-treegrid-headerCell",
	_cellCls: "mini-treegrid-cell",
	RzD: "mini-treegrid-border",
	J0fr: "mini-treegrid-header",
	F19: "mini-treegrid-body",
	FN: "mini-treegrid-node",
	IKc: "mini-treegrid-nodes",
	Ii4C: "mini-treegrid-selectedNode",
	E_rk: "mini-treegrid-hoverNode",
	TLv: "mini-treegrid-expand",
	_aw: "mini-treegrid-collapse",
	$G$: "mini-treegrid-ec-icon",
	O_q: "mini-treegrid-nodeTitle",
	UCs: function(_) {
		if (!_) return null;
		var $ = this.Vot(_);
		return $
	},
	uiCls: "mini-treegrid",
	_create: function() {
		E8sl[Xc$][JLTb][POm](this);
		this.O7sE = mini.append(this.$Ar, "<div class=\"mini-grid-resizeGrid\" style=\"\"></div>");
		VPoJ(this.LLB, "scroll", this._z8, this);
		this._X$ = new XvKg(this);
		this._ColumnMove = new mini._ColumnMove(this);
		this._Z = new mini._ColumnSplitter(this);
		this._CellTip = new mini._CellToolTip(this)
	},
	B$Q: function($) {
		return this.uid + "$column$" + $.id
	},
	_getHeaderScrollEl: function() {
		return this.U2N.firstChild
	},
	Ayv: function(D) {
		var F = "",
		B = this[JU]();
		if (isIE) {
			if (isIE6 || isIE7 || (isIE8 && !jQuery.boxModel) || (isIE9 && !jQuery.boxModel)) F += "<tr style=\"display:none;\">";
			else F += "<tr >"
		} else F += "<tr>";
		for (var $ = 0,
		C = B.length; $ < C; $++) {
			var A = B[$],
			_ = A.width,
			E = this.B$Q(A) + "$" + D;
			F += "<td id=\"" + E + "\" style=\"padding:0;border:0;margin:0;height:0;";
			if (A.width) F += "width:" + A.width;
			F += "\" ></td>"
		}
		F += "</tr>";
		return F
	},
	ESu0: function() {
		var E = this[JU](),
		F = [];
		F[F.length] = "<div class=\"mini-treegrid-headerInner\"><table class=\"mini-treegrid-table\" cellspacing=\"0\" cellpadding=\"0\">";
		F[F.length] = this.Ayv();
		F[F.length] = "<tr>";
		for (var D = 0,
		_ = E.length; D < _; D++) {
			var B = E[D],
			C = B.header;
			if (typeof C == "function") C = C[POm](this, B);
			if (mini.isNull(C) || C === "") C = "&nbsp;";
			var A = B.width;
			if (mini.isNumber(A)) A = A + "px";
			var $ = this.B$Q(B);
			F[F.length] = "<td id=\"";
			F[F.length] = $;
			F[F.length] = "\" class=\"mini-treegrid-headerCell ";
			if (B.headerCls) F[F.length] = B.headerCls;
			F[F.length] = "\" style=\"";
			if (B.headerStyle) F[F.length] = B.headerStyle + ";";
			if (A) F[F.length] = "width:" + A + ";";
			if (B.headerAlign) F[F.length] = "text-align:" + B.headerAlign + ";";
			F[F.length] = "\">";
			F[F.length] = C;
			F[F.length] = "</td>"
		}
		F[F.length] = "</tr></table></div>";
		this.U2N.innerHTML = F.join("")
	},
	UF: function(B, M, G) {
		var K = !G;
		if (!G) G = [];
		var H = B[this.textField];
		if (H === null || H === undefined) H = "";
		var I = this.isLeaf(B),
		$ = this.getLevel(B),
		D = "";
		if (!I) D = this.isExpandedNode(B) ? this.TLv: this._aw;
		if (this.Qbs == B) D += " " + this.Ii4C;
		var E = this[JU]();
		G[G.length] = "<table class=\"mini-treegrid-nodeTitle ";
		G[G.length] = D;
		G[G.length] = "\" cellspacing=\"0\" cellpadding=\"0\">";
		G[G.length] = this.Ayv();
		G[G.length] = "<tr>";
		for (var J = 0,
		_ = E.length; J < _; J++) {
			var C = E[J],
			F = this.X2yo(B, C),
			L = this.K5R(B, C),
			A = C.width;
			if (typeof A == "number") A = A + "px";
			G[G.length] = "<td id=\"";
			G[G.length] = F;
			G[G.length] = "\" class=\"mini-treegrid-cell ";
			if (L.cellCls) G[G.length] = L.cellCls;
			G[G.length] = "\" style=\"";
			if (L.cellStyle) {
				G[G.length] = L.cellStyle;
				G[G.length] = ";"
			}
			if (C.align) {
				G[G.length] = "text-align:";
				G[G.length] = C.align;
				G[G.length] = ";"
			}
			G[G.length] = "\">";
			G[G.length] = L.cellHtml;
			G[G.length] = "</td>";
			if (L.rowCls) rowCls = L.rowCls;
			if (L.rowStyle) rowStyle = L.rowStyle
		}
		G[G.length] = "</table>";
		if (K) return G.join("")
	},
	doUpdate: function() {
		if (!this.O7bE) return;
		this.ESu0();
		var $ = new Date(),
		_ = this._getViewChildNodes(this.root),
		B = [];
		this.$LC(_, this.root, B);
		var A = B.join("");
		this.LLB.innerHTML = A;
		this.DkI()
	},
	getScrollLeft: function() {
		return this.LLB.scrollLeft
	},
	doLayout: function() {
		if (!this.canLayout()) return;
		var C = this[_Y1](),
		D = this[Zf6](),
		_ = this[Hy](true),
		A = this[Ls](true),
		B = this[VzAm](),
		$ = A - B;
		this.LLB.style.width = _ + "px";
		this.LLB.style.height = $ + "px";
		this.BKt();
		this.fire("layout")
	},
	BKt: function() {
		var B = this.LLB.scrollHeight,
		E = this.LLB.clientHeight,
		A = this[Hy](true);
		if (isIE) {
			var _ = this.U2N.firstChild.firstChild,
			D = this.LLB.firstChild;
			if (E >= B) {
				if (D) D.style.width = "100%";
				if (_) _.style.width = "100%"
			} else {
				if (D) {
					var $ = parseInt(D.parentNode.offsetWidth - 17) + "px";
					D.style.width = $
				}
				if (_) _.style.width = $
			}
		}
		if (E < B) this.U2N.firstChild.style.width = (A - 17) + "px";
		else this.U2N.firstChild.style.width = "100%";
		try {
			$ = this.U2N.firstChild.firstChild.offsetWidth;
			this.LLB.firstChild.style.width = $ + "px"
		} catch(C) {}
		this._z8()
	},
	getHeaderHeight: function() {
		return J6(this.U2N)
	},
	K5R: function($, B) {
		var D = this[Ql0];
		if (D && this.hasChildren($)) D = this[Ky6];
		var _ = $[B.field],
		C = {
			isLeaf: this.isLeaf($),
			rowIndex: this.indexOf($),
			showCheckBox: D,
			iconCls: this.getNodeIcon($),
			showTreeIcon: this.showTreeIcon,
			sender: this,
			record: $,
			row: $,
			node: $,
			column: B,
			field: B ? B.field: null,
			value: _,
			cellHtml: _,
			rowCls: null,
			cellCls: B ? (B.cellCls || "") : "",
			rowStyle: null,
			cellStyle: B ? (B.cellStyle || "") : ""
		};
		if (B.dateFormat) if (mini.isDate(C.value)) C.cellHtml = mini.formatDate(_, B.dateFormat);
		else C.cellHtml = _;
		var A = B.renderer;
		if (A) {
			fn = typeof A == "function" ? A: window[A];
			if (fn) C.cellHtml = fn[POm](B, C)
		}
		this.fire("drawcell", C);
		if (C.cellHtml === null || C.cellHtml === undefined || C.cellHtml === "") C.cellHtml = "&nbsp;";
		if (!this.treeColumn || this.treeColumn !== B.name) return C;
		this.Lzs1(C);
		return C
	},
	Lzs1: function(H) {
		var A = H.node;
		if (mini.isNull(H[ZMpm])) H[ZMpm] = this[ZMpm];
		var G = H.cellHtml,
		B = this.isLeaf(A),
		$ = this.getLevel(A) * 18,
		D = "";
		if (H.cellCls) H.cellCls += " mini-treegrid-treecolumn ";
		else H.cellCls = " mini-treegrid-treecolumn ";
		var F = "<div class=\"mini-treegrid-treecolumn-inner " + D + "\">";
		if (!B) F += "<a href=\"#\" onclick=\"return false;\"  hidefocus class=\"" + this.$G$ + "\" style=\"left:" + ($) + "px;\"></a>";
		$ += 18;
		if (H[ZMpm]) {
			var _ = this.getNodeIcon(A);
			F += "<div class=\"" + _ + " mini-treegrid-nodeicon\" style=\"left:" + $ + "px;\"></div>";
			$ += 18
		}
		G = "<span class=\"mini-tree-nodetext\">" + G + "</span>";
		if (H[Ql0]) {
			var E = this.Gdh(A),
			C = this.isCheckedNode(A);
			G = "<input type=\"checkbox\" id=\"" + E + "\" class=\"" + this.C22 + "\" hidefocus " + (C ? "checked": "") + "/>" + G
		}
		F += "<div class=\"mini-treegrid-nodeshow\" style=\"margin-left:" + ($ + 2) + "px;\">" + G + "</div>";
		F += "</div>";
		G = F;
		H.cellHtml = G
	},
	setTreeColumn: function($) {
		if (this.treeColumn != $) {
			this.treeColumn = $;
			this[WRl]()
		}
	},
	getTreeColumn: function($) {
		return this.treeColumn
	},
	setAllowResizeColumn: function($) {
		this[THb5] = $
	},
	getAllowResizeColumn: function($) {
		return this[THb5]
	},
	setAllowMoveColumn: function($) {
		this[G7] = $
	},
	getAllowMoveColumn: function($) {
		return this[G7]
	},
	setAllowResize: function($) {
		this[Wpk] = $;
		this.O7sE.style.display = this[Wpk] ? "": "none"
	},
	getAllowResize: function() {
		return this[Wpk]
	},
	X2yo: function(_, $) {
		return this.uid + "$" + _._id + "$" + $._id
	},
	setColumnWidth: function(_, $) {
		_ = this[DA5](_);
		if (!_) return;
		if (mini.isNumber($)) $ += "px";
		_.width = $;
		this[WRl]()
	},
	getColumnWidth: function(_) {
		var $ = this[$XBP](_);
		return $ ? $.width: 0
	},
	_z8: function(_) {
		var $ = this.LLB.scrollLeft;
		this.U2N.firstChild.scrollLeft = $
	},
	getAttrs: function(_) {
		var E = E8sl[Xc$][Z_s][POm](this, _);
		mini[Dm7Q](_, E, ["treeColumn", "ondrawcell"]);
		mini[CW7m](_, E, ["allowResizeColumn", "allowMoveColumn", "allowResize"]);
		var C = mini[$Vy$](_);
		for (var $ = 0,
		D = C.length; $ < D; $++) {
			var B = C[$],
			A = jQuery(B).attr("property");
			if (!A) continue;
			A = A.toLowerCase();
			if (A == "columns") E.columns = mini._ParseColumns(B)
		}
		delete E.data;
		return E
	}
});
mini.copyTo(E8sl.prototype, mini_Column_Prototype);
J9_$(E8sl, "treegrid");
mini.RadioButtonList = ME7,
mini.ValidatorBase = _bO,
mini.AutoComplete = FzDH,
mini.CheckBoxList = Wme,
mini.DataBinding = PU,
mini.OutlookTree = HuQ,
mini.OutlookMenu = _Rs,
mini.TextBoxList = XYy7,
mini.TimeSpinner = BW,
mini.ListControl = UKsr,
mini.OutlookBar = Hi1b,
mini.FileUpload = Hs,
mini.TreeSelect = JUo,
mini.DatePicker = C81,
mini.ButtonEdit = JzO,
mini.PopupEdit = Xpy,
mini.Component = QFL,
mini.TreeGrid = E8sl,
mini.DataGrid = OVp,
mini.MenuItem = EU9B,
mini.Splitter = Jgu,
mini.HtmlFile = L7,
mini.Calendar = G8i,
mini.ComboBox = JX,
mini.TextArea = W7U,
mini.Password = DFJ,
mini.CheckBox = JSgM,
mini.DataSet = AcTa,
mini.Include = HZ,
mini.Spinner = _e4o,
mini.ListBox = Zr,
mini.TextBox = ZoD,
mini.Control = DZV,
mini.Layout = Hg$E,
mini.Window = NBMP,
mini.Lookup = HMt,
mini.Button = LDc,
mini.Hidden = DikJ,
mini.Pager = K9O,
mini.Panel = P7,
mini.Popup = Nist,
mini.Tree = DaS,
mini.Menu = XL,
mini.Tabs = TVOy,
mini.Fit = L6Ez,
mini.Box = KRr;
mini.locale = "en-US";
mini.dateInfo = {
	monthsLong: ["\u4e00\u6708", "\u4e8c\u6708", "\u4e09\u6708", "\u56db\u6708", "\u4e94\u6708", "\u516d\u6708", "\u4e03\u6708", "\u516b\u6708", "\u4e5d\u6708", "\u5341\u6708", "\u5341\u4e00\u6708", "\u5341\u4e8c\u6708"],
	monthsShort: ["1\u6708", "2\u6708", "3\u6708", "4\u6708", "5\u6708", "6\u6708", "7\u6708", "8\u6708", "9\u6708", "10\u6708", "11\u6708", "12\u6708"],
	daysLong: ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"],
	daysShort: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
	quarterLong: ["\u4e00\u5b63\u5ea6", "\u4e8c\u5b63\u5ea6", "\u4e09\u5b63\u5ea6", "\u56db\u5b63\u5ea6"],
	quarterShort: ["Q1", "Q2", "Q2", "Q4"],
	halfYearLong: ["\u4e0a\u534a\u5e74", "\u4e0b\u534a\u5e74"],
	patterns: {
		"d": "yyyy-M-d",
		"D": "yyyy\u5e74M\u6708d\u65e5",
		"f": "yyyy\u5e74M\u6708d\u65e5 H:mm",
		"F": "yyyy\u5e74M\u6708d\u65e5 H:mm:ss",
		"g": "yyyy-M-d H:mm",
		"G": "yyyy-M-d H:mm:ss",
		"m": "MMMd\u65e5",
		"o": "yyyy-MM-ddTHH:mm:ss.fff",
		"s": "yyyy-MM-ddTHH:mm:ss",
		"t": "H:mm",
		"T": "H:mm:ss",
		"U": "yyyy\u5e74M\u6708d\u65e5 HH:mm:ss",
		"y": "yyyy\u5e74MM\u6708"
	},
	tt: {
		"AM": "\u4e0a\u5348",
		"PM": "\u4e0b\u5348"
	},
	ten: {
		"Early": "\u4e0a\u65ec",
		"Mid": "\u4e2d\u65ec",
		"Late": "\u4e0b\u65ec"
	},
	today: "\u4eca\u5929",
	clockType: 24
};
if (G8i) mini.copyTo(G8i.prototype, {
	firstDayOfWeek: 0,
	todayText: "\u4eca\u5929",
	clearText: "\u6e05\u9664",
	okText: "\u786e\u5b9a",
	cancelText: "\u53d6\u6d88",
	daysShort: ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"],
	format: "yyyy\u5e74MM\u6708",
	timeFormat: "H:mm"
});
for (var id in mini) {
	var clazz = mini[id];
	if (clazz && clazz[DK] && clazz[DK].isControl) clazz[DK][EoEr] = "\u4e0d\u80fd\u4e3a\u7a7a"
}
if (ZoD) {
	var vtypeErrorTexts = {
		emailErrorText: "\u8bf7\u8f93\u5165\u90ae\u4ef6\u683c\u5f0f",
		urlErrorText: "\u8bf7\u8f93\u5165URL\u683c\u5f0f",
		floatErrorText: "\u8bf7\u8f93\u5165\u6570\u5b57",
		intErrorText: "\u8bf7\u8f93\u5165\u6574\u6570",
		dateErrorText: "\u8bf7\u8f93\u5165\u65e5\u671f\u683c\u5f0f {0}",
		maxLengthErrorText: "\u4e0d\u80fd\u8d85\u8fc7 {0} \u4e2a\u5b57\u7b26",
		minLengthErrorText: "\u4e0d\u80fd\u5c11\u4e8e {0} \u4e2a\u5b57\u7b26",
		maxErrorText: "\u6570\u5b57\u4e0d\u80fd\u5927\u4e8e {0} ",
		minErrorText: "\u6570\u5b57\u4e0d\u80fd\u5c0f\u4e8e {0} ",
		rangeLengthErrorText: "\u5b57\u7b26\u957f\u5ea6\u5fc5\u987b\u5728 {0} \u5230 {1} \u4e4b\u95f4",
		rangeCharErrorText: "\u5b57\u7b26\u6570\u5fc5\u987b\u5728 {0} \u5230 {1} \u4e4b\u95f4",
		rangeErrorText: "\u6570\u5b57\u5fc5\u987b\u5728 {0} \u5230 {1} \u4e4b\u95f4"
	};
	mini.copyTo(ZoD.prototype, vtypeErrorTexts);
	mini.copyTo(DFJ.prototype, vtypeErrorTexts);
	mini.copyTo(W7U.prototype, vtypeErrorTexts)
}
if (K9O) mini.copyTo(K9O.prototype, {
	firstText: "\u9996\u9875",
	prevText: "\u4e0a\u4e00\u9875",
	nextText: "\u4e0b\u4e00\u9875",
	lastText: "\u5c3e\u9875",
	pageInfoText: "\u6bcf\u9875 {0} \u6761,\u5171 {1} \u6761"
});
if (OVp) mini.copyTo(OVp.prototype, {
	emptyText: "\u6ca1\u6709\u8fd4\u56de\u7684\u6570\u636e"
});
if (window.mini.Gantt) {
	mini.GanttView.ShortWeeks = ["\u65e5", "\u4e00", "\u4e8c", "\u4e09", "\u56db", "\u4e94", "\u516d"];
	mini.GanttView.LongWeeks = ["\u661f\u671f\u65e5", "\u661f\u671f\u4e00", "\u661f\u671f\u4e8c", "\u661f\u671f\u4e09", "\u661f\u671f\u56db", "\u661f\u671f\u4e94", "\u661f\u671f\u516d"];
	mini.Gantt.PredecessorLinkType = [{
		ID: 0,
		Name: "\u5b8c\u6210-\u5b8c\u6210(FF)",
		Short: "FF"
	},
	{
		ID: 1,
		Name: "\u5b8c\u6210-\u5f00\u59cb(FS)",
		Short: "FS"
	},
	{
		ID: 2,
		Name: "\u5f00\u59cb-\u5b8c\u6210(SF)",
		Short: "SF"
	},
	{
		ID: 3,
		Name: "\u5f00\u59cb-\u5f00\u59cb(SS)",
		Short: "SS"
	}];
	mini.Gantt.ConstraintType = [{
		ID: 0,
		Name: "\u8d8a\u65e9\u8d8a\u597d"
	},
	{
		ID: 1,
		Name: "\u8d8a\u665a\u8d8a\u597d"
	},
	{
		ID: 2,
		Name: "\u5fc5\u987b\u5f00\u59cb\u4e8e"
	},
	{
		ID: 3,
		Name: "\u5fc5\u987b\u5b8c\u6210\u4e8e"
	},
	{
		ID: 4,
		Name: "\u4e0d\u5f97\u65e9\u4e8e...\u5f00\u59cb"
	},
	{
		ID: 5,
		Name: "\u4e0d\u5f97\u665a\u4e8e...\u5f00\u59cb"
	},
	{
		ID: 6,
		Name: "\u4e0d\u5f97\u65e9\u4e8e...\u5b8c\u6210"
	},
	{
		ID: 7,
		Name: "\u4e0d\u5f97\u665a\u4e8e...\u5b8c\u6210"
	}];
	mini.copyTo(mini.Gantt, {
		ID_Text: "\u6807\u8bc6\u53f7",
		Name_Text: "\u4efb\u52a1\u540d\u79f0",
		PercentComplete_Text: "\u8fdb\u5ea6",
		Duration_Text: "\u5de5\u671f",
		Start_Text: "\u5f00\u59cb\u65e5\u671f",
		Finish_Text: "\u5b8c\u6210\u65e5\u671f",
		Critical_Text: "\u5173\u952e\u4efb\u52a1",
		PredecessorLink_Text: "\u524d\u7f6e\u4efb\u52a1",
		Work_Text: "\u5de5\u65f6",
		Priority_Text: "\u91cd\u8981\u7ea7\u522b",
		Weight_Text: "\u6743\u91cd",
		OutlineNumber_Text: "\u5927\u7eb2\u5b57\u6bb5",
		OutlineLevel_Text: "\u4efb\u52a1\u5c42\u7ea7",
		ActualStart_Text: "\u5b9e\u9645\u5f00\u59cb\u65e5\u671f",
		ActualFinish_Text: "\u5b9e\u9645\u5b8c\u6210\u65e5\u671f",
		WBS_Text: "WBS",
		ConstraintType_Text: "\u9650\u5236\u7c7b\u578b",
		ConstraintDate_Text: "\u9650\u5236\u65e5\u671f",
		Department_Text: "\u90e8\u95e8",
		Principal_Text: "\u8d1f\u8d23\u4eba",
		Assignments_Text: "\u8d44\u6e90\u540d\u79f0",
		Summary_Text: "\u6458\u8981\u4efb\u52a1",
		Task_Text: "\u4efb\u52a1",
		Baseline_Text: "\u6bd4\u8f83\u57fa\u51c6",
		LinkType_Text: "\u94fe\u63a5\u7c7b\u578b",
		LinkLag_Text: "\u5ef6\u9694\u65f6\u95f4",
		From_Text: "\u4ece",
		To_Text: "\u5230",
		Goto_Text: "\u8f6c\u5230\u4efb\u52a1",
		UpGrade_Text: "\u5347\u7ea7",
		DownGrade_Text: "\u964d\u7ea7",
		Add_Text: "\u65b0\u589e",
		Edit_Text: "\u7f16\u8f91",
		Remove_Text: "\u5220\u9664",
		Move_Text: "\u79fb\u52a8",
		ZoomIn_Text: "\u653e\u5927",
		ZoomOut_Text: "\u7f29\u5c0f",
		Deselect_Text: "\u53d6\u6d88\u9009\u62e9",
		Split_Text: "\u62c6\u5206\u4efb\u52a1"
	})
}