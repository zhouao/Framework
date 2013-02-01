# Copyright (c) 2010 Wilker Lúcio
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

(($) ->
  KEY = {
    BACKSPACE: 8
    TAB:       9
    RETURN:    13
    ESCAPE:    27
    SPACE:     32
    LEFT:      37
    UP:        38
    RIGHT:     39
    DOWN:      40
    COLON:     188
    DOT:       190
  }

  class $.MultiSelect
    constructor: (element, options) ->
      @options = {
        # options
        separator:            ","
        completions:          []
        max_complete_results: 5
        enable_new_options:   true
        complex_search:       true
        title:                null

        # callbacks
        afterChange: ->
        afterAdd:    ->
        afterRemove: ->
      }

      $.extend(@options, options || {})
      @values = []
      @input = $(element)
      @initialize_elements()
      @initialize_events()
      @parse_value(0, true)

    initialize_elements: ->
      # hidden input to hold real value
      @hidden = $(document.createElement("input"))
      @hidden.attr("name", @input.attr("name"))
      @hidden.attr("type", "hidden")
      @input.removeAttr("name")

      @container = $(document.createElement("div"))
      @container.addClass("jquery-multiselect")

      @input_wrapper = $(document.createElement("a"))
      @input_wrapper.addClass("bit-input")

      @input.replaceWith(@container)
      @container.append(@input_wrapper)
      @input_wrapper.append(@input)
      @container.before(@hidden)

    initialize_events: ->
      # create helpers
      @selection = new $.MultiSelect.Selection(@input)
      @resizable = new $.MultiSelect.ResizableInput(@input, @options.title)
      @observer = new $.MultiSelect.InputObserver(@input)
      @autocomplete = new $.MultiSelect.AutoComplete(this, @options.completions)

      # prevent container click to put carret at end
      @input.click (e) =>
        e.stopPropagation()

      # create element when place separator or paste
      @input.keyup =>
        @parse_value(1)

      # focus input and set carret at and
      @container.click =>
        @input.focus()
        @selection.set_caret_at_end()

      # add element on press TAB or RETURN
      @observer.bind [KEY.TAB, KEY.RETURN], (e) =>
        if @autocomplete.val()
          e.preventDefault()
          @add_and_reset()

      # remove last item
      @observer.bind [KEY.BACKSPACE], (e) =>
        return if @values.length <= 0
        caret = @selection.get_caret()

        if caret[0] == 0 and caret[1] == 0
          e.preventDefault()
          @remove(@values[@values.length - 1])

      # hide complete box
      @input.blur =>
        setTimeout(=>
          @autocomplete.hide_complete_box()
        200)

      @observer.bind [KEY.ESCAPE], (e) =>
        @autocomplete.hide_complete_box()

    values_real: ->
      $.map @values, (v) -> v[1]

    parse_value: (min = 0, checkKey = false) ->
      values = @input.val().split(@options.separator)

      if values.length > min
        for value in values
          label = if checkKey then @autocomplete.labelForValue(value) else value
          @add [label, value] if value.present()

        @input.val("")
        @autocomplete.search()

    add_and_reset: ->
      if @autocomplete.val()
        @add(@autocomplete.val())
        @input.val("")
        @autocomplete.search()

    # add new element
    add: (value) ->
      return if $.inArray(value[1], @values_real()) > -1
      return if value[0].blank()

      value[1] = value[1].trim()
      oldValues = @values.slice(0)
      @values.push(value)

      a = $(document.createElement("a"))
      a.addClass("bit bit-box")
      a.mouseover -> $(this).addClass("bit-hover")
      a.mouseout -> $(this).removeClass("bit-hover")
      a.data("value", value)
      a.html(value[0].entitizeHTML())

      close = $(document.createElement("a"))
      close.addClass("closebutton")
      close.click =>
        @remove(a.data("value"))
      a.append(close)

      @input_wrapper.before(a)
      @refresh_hidden()

      @options.afterAdd(this, value)
      @options.afterChange(this, oldValues)

    remove: (value) ->
      oldValues = @values.slice(0)

      @values = $.grep @values, (v) -> v[1] != value[1]
      @container.find("a.bit-box").each ->
        $(this).remove() if $(this).data("value")[1] == value[1]
      @refresh_hidden()

      @options.afterRemove(this, value)
      @options.afterChange(this, oldValues)

    refresh_hidden: ->
      @hidden.val(@values_real().join(@options.separator))

  # Input Observer Helper
  class $.MultiSelect.InputObserver
    constructor: (element) ->
      @input = $(element)
      @input.keydown (e) => @handle_keydown(e)
      @events = []

    bind: (key, callback) ->
      @events.push([key, callback])

    handle_keydown: (e) ->
      for event in @events
        [keys, callback] = event
        keys = [keys] unless keys.push
        callback(e) if $.inArray(e.keyCode, keys) > -1

  # Selection Helper
  class $.MultiSelect.Selection
    constructor: (element) ->
      @input = $(element)[0]

    get_caret: ->
      # For IE
      if document.selection
        r = document.selection.createRange().duplicate()
        r.moveEnd('character', @input.value.length)

        if r.text == ''
          [@input.value.length, @input.value.length]
        else
          [@input.value.lastIndexOf(r.text), @input.value.lastIndexOf(r.text)]
      # Others
      else
        [@input.selectionStart, @input.selectionEnd]

    set_caret: (begin, end) ->
      end ?= begin
      @input.selectionStart = begin
      @input.selectionEnd = end

    set_caret_at_end: ->
      @set_caret(@input.value.length)

  # Resizable Input Helper
  class $.MultiSelect.ResizableInput
    constructor: (element, title) ->
      @input = $(element)
      @input.attr('title', title) if title
      @create_measurer()
      @input.keypress (e) => @set_width(e)
      @input.keyup (e) => @set_width(e)
      @input.change (e) => @set_width(e)

    create_measurer: ->
      if $("#__jquery_multiselect_measurer")[0] == undefined
        measurer = $(document.createElement("div"))
        measurer.attr("id", "__jquery_multiselect_measurer")
        measurer.css {
          position: "absolute"
          left: "-1000px"
          top: "-1000px"
        }

        $(document.body).append(measurer)

      @measurer = $("#__jquery_multiselect_measurer:first")
      @measurer.css {
        fontSize: @input.css('font-size')
        fontFamily: @input.css('font-family')
      }

    calculate_width: ->
      @measurer.html(@input.val().entitizeHTML() + 'MM')
      @measurer.innerWidth()

    set_width: ->
      @input.css("width", @calculate_width() + "px")

  # AutoComplete Helper
  class $.MultiSelect.AutoComplete
    constructor: (multiselect, completions) ->
      @multiselect = multiselect
      @input = @multiselect.input
      @completions = @parse_completions(completions)
      @matches = []
      @create_elements()
      @bind_events()

    parse_completions: (completions) ->
      $.map completions, (value) ->
        if typeof value == "string"
          [[value, value]]
        else if value instanceof Array and value.length == 2
          [value]
        else if value.value and value.caption
          [[value.caption, value.value]]
        else
          console.error "Invalid option #{value}" if console

    labelForValue: (value) ->
      for completion in @completions
        [label, val] = completion

        return label if val == value

      value

    create_elements: ->
      @container = $(document.createElement("div"))
      @container.addClass("jquery-multiselect-autocomplete")
      @container.css("width", @multiselect.container.outerWidth())
      @container.css("display", "none")

      @container.append(@def)

      @list = $(document.createElement("ul"))
      @list.addClass("feed")

      @container.append(@list)
      @multiselect.container.after(@container)

    bind_events: ->
      @input.keypress (e) => @search(e)
      @input.keyup (e) => @search(e)
      @input.change (e) => @search(e)
      @multiselect.observer.bind KEY.UP, (e) => e.preventDefault(); @navigate_up()
      @multiselect.observer.bind KEY.DOWN, (e) => e.preventDefault(); @navigate_down()

    search: ->
      return if @input.val().trim() == @query # dont do operation if query is same

      @query = @input.val().trim()
      @list.html("") # clear list
      @current = 0

      if @query.present()
        @container.fadeIn("fast")
        @matches = @matching_completions(@query)

        if @multiselect.options.enable_new_options
          def = @create_item("Add <em>" + @query + "</em>")
          def.mouseover (e) => @select_index(0)

        for option, i in @matches
          x = if @multiselect.options.enable_new_options then i + 1 else i
          item = @create_item(@highlight(option[0], @query))
          item.mouseover (e) => @select_index(x)

        @matches.unshift([@query, @query]) if @multiselect.options.enable_new_options

        @select_index(0)
      else
        @matches = []
        @hide_complete_box()
        @query = null

    hide_complete_box: ->
      @container.fadeOut("fast")

    select_index: (index) ->
      items = @list.find("li")
      items.removeClass("auto-focus")
      items.filter(":eq(#{index})").addClass("auto-focus")

      @current = index

    navigate_down: ->
      next = @current + 1
      next = 0 if next >= @matches.length
      @select_index(next)

    navigate_up: ->
      next = @current - 1
      next = @matches.length - 1 if next < 0
      @select_index(next)

    create_item: (text, highlight) ->
      item = $(document.createElement("li"))
      item.click =>
        @multiselect.add_and_reset()
        @search()
        @input.focus()
      item.html(text)
      @list.append(item)
      item

    val: ->
      @matches[@current]

    highlight: (text, highlight) ->
      if @multiselect.options.complex_search
        highlighted = ""
        current = 0

        for char, i in text
          char = text.charAt(i)
          if current < highlight.length and char.toLowerCase() == highlight.charAt(current).toLowerCase()
            highlighted += "<em>#{char}</em>"
            current++
          else
            highlighted += char

        highlighted
      else
        reg = "(#{RegExp.escape(highlight)})"
        text.replace(new RegExp(reg, "gi"), '<em>$1</em>')

    matching_completions: (text) ->
      if @multiselect.options.complex_search
        reg = ""
        for char, i in text
          char = text.charAt(i)
          reg += RegExp.escape(char) + ".*"

        reg = new RegExp(reg, "i")
      else
        reg = new RegExp(RegExp.escape(text), "i")
      count = 0
      $.grep @completions, (c) =>
        return false if count >= @multiselect.options.max_complete_results
        return false if $.inArray(c[1], @multiselect.values_real()) > -1

        if c[0].match(reg)
          count++
          true
        else
          false

  # Hook jQuery extension
  $.fn.multiselect = (options) ->
    options ?= {}

    $(this).each ->
      if this.tagName.toLowerCase() == "select"
        input = $(document.createElement("input"))
        input.attr("type", "text")
        input.attr("name", this.name)
        input.attr("id", this.id)

        completions = []
        add         = []

        for option in this.options
          completions.push([option.innerHTML, option.value])
          add.push([option.innerHTML, option.value]) if option.selected

        select_options = {
          completions: completions
          enable_new_options: false
        }

        $.extend(select_options, options)

        $(this).replaceWith(input)

        multiselect = new $.MultiSelect(input, select_options)
        multiselect.add(val) for val in add
        multiselect
      else if this.tagName.toLowerCase() == "input" and this.type == "text"
        new $.MultiSelect(this, options)

  $.extend String.prototype, {
    trim: -> this.replace(/^[\r\n\s]/g, '').replace(/[\r\n\s]$/g, '')
    entitizeHTML: -> this.replace(/</g,'&lt;').replace(/>/g,'&gt;')
    unentitizeHTML: -> this.replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    blank: -> this.trim().length == 0
    present: -> not @blank()
  }

  RegExp.escape = (str) ->
    String(str).replace(/([.*+?^=!:${}()|[\]\/\\])/g, '\\$1')
)(jQuery)
