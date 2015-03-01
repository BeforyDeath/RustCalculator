/**
 * RustCalculator.js - iqrust.ru
 * Initial version by: BeforyDeath
 * Initial version created on: 12.05.2014 4:17
 */

var RustCalculator = {
	entity: {},				// все объекты игры
	selected: {},			// выбранные объекты
	inventory: {},			// слоты инвентаря и добавленные в них объекты
	inventory_count: 30,	// количество слотов инвентаря
	init: function (filename) {
		$.ajax({
			url: filename,
			dataType: 'json',
			async: false,
			success: function (data) {
				// пересобираем данные, добавляем id для названий и категорий (используются в селекторах)
				$.each(data, function (key, value) {
					data[key]['name'] = key;
					data[key]['slot'] = data[key]['slot'];
					data[key]['category_id'] = value.category.replace(/ /g, '_');
					var id = key.replace(/ /g, '_');
					RustCalculator.entity[id] = data[key];
				});
				RustCalculator.viewport();
				RustCalculator.setEvent();
			}
		});
	},
	viewport: function () {
		this.template();
		// проходим по всем элементам и добавляем их на страницу
		var category_list = {};
		var select_option = '';
		var entity = '';
		for (var id in this.entity) {

			// собираем категории
			if (!category_list[this.entity[id].category_id]) {
				select_option += '<option value="' + this.entity[id].category_id + '">' + this.entity[id].category + '</option>\n';
				category_list[this.entity[id].category_id] = 1;
			}

			// собираем элементы
			var plus_count = this.entity[id].slot;
			if (plus_count == 250) plus_count = 50;
			entity += '<span class="rc_entity ' + this.entity[id].category_id + '" id="' + id + '" title="' + this.entity[id].name + '">\n' +
			'<div class="rc_entity_top">' +
			'<button class="rc_entity_img rc_65 i' + id + '"><div class="rc_entity_count">x0</div></button>' +
			'<button class="rc_entity_plus" rel="' + plus_count + '">' + '+ ' + plus_count + '</button></div>\n' +
			'<div class="rc_entity_button"><button class="rc_entity_minus">-</button><button class="rc_entity_minus clear">clear</button></div>\n</span>\n';
		}

		$('#rc_entities').append(entity);
		$('#rc_entities select').append(select_option);

	},
	template: function () {
		var tpl_entity = '<p>entity list</p><div class="rc_select"><select class="form-control input-sm"><option value="all">Все</option></select></div>\n';
		var tpl_inventory = '<button class="rc_entity" id="slot{{slot_id}}"><span class="rc_65 iNone"></span><div class="rc_entity_count"></div></button>\n';
		var tpl_inventory_craft = '<p>inventory craft</p><ul id="rc_craft_first"></ul>\n';

		$('#rc_entities').html(tpl_entity);
		$("#rc_inventory").html('<p>inventory</p>\n');
		for (var i = 0; i <= this.inventory_count - 1; i++) {
			this.inventory['slot' + i] = {id: false, count: 0};
			var tpl = tpl_inventory.replace('{{slot_id}}', String(i));
			$('#rc_inventory').append(tpl);
		}
		$('#rc_craft').html(tpl_inventory_craft);
	},
	// события
	setEvent: function () {
		$('#rc_entities button.rc_entity_img').click(function () {
			var id = $(this).closest('span').attr('id');
			RustCalculator.addSelected(id, 1);
			RustCalculator.calculateCraft();
		});
		$('#rc_entities button.rc_entity_plus').click(function () {
			var id = $(this).closest('span').attr('id');
			var plus_count = $(this).attr('rel');
			RustCalculator.addSelected(id, parseInt(plus_count));
			RustCalculator.calculateCraft();
		});
		$('#rc_entities button.rc_entity_minus').click(function () {
			var id = $(this).closest('span').attr('id');
			if ($(this).hasClass("clear")) {
				RustCalculator.takeSelected(id, 'clear');
			} else {
				RustCalculator.takeSelected(id, 1);
			}
			RustCalculator.calculateCraft();
		});

		// выбор категории при старте
		$('#rc_entities select :nth-child(4)').attr("selected", "selected");
		$('#rc_entities span.rc_entity').hide();
		$('#rc_entities span.' + 'Боеприпасы').show();

		// обработчик выбора категории
		$("#rc_entities select").on('change', function () {
			if (this.value == 'all') {
				$('#rc_entities span.rc_entity').show();
			} else {
				$('#rc_entities span.rc_entity').hide();
				$('#rc_entities span.' + this.value).show();
			}
		});
		// обработчик нажатий на инвентарь
		$('#rc_inventory button').click(function () {
			var id = $(this).attr('id');
			RustCalculator.clearSlot(id);
			RustCalculator.calculateCraft();
		});
		// отчистить инвентарь
		$('.rc_inventory_clear').click(function () {
			RustCalculator.selected = {};
			RustCalculator.clearSlots();
			RustCalculator.calculateCraft();
		});

		// выдать инвентарь игроку
		// todo можно сделать в один запрос, ответ ркона всё равно долгий
		// todo но при донате, проверка результата выдачи каждого елемента, всё же станет важным
		$('.rc_inventory_give').click(function () {
			for (var id in RustCalculator.selected) {
				$.ajax({
					url: '/lib/RustCalculator/RustRCONSend.php',
					type: "POST",
					data: {name: RustCalculator.entity[id].name, count: RustCalculator.selected[id].count, nick: $("#rc_inventory_button select").val(), return: 0},
					async: false,
					success: function (data) {
						var slot = $('#rc_inventory span.i' + id);
						slot.each(function (i, e) {
							var slot_id = $(e).parent().attr('id');
							RustCalculator.clearSlot(slot_id);
							console.log(i, slot_id, data);
						});
					}
				});
			}
			RustCalculator.calculateCraft();
		});

		// обработчик нажатий на слайдеры крафта
		$('#rc_craft_first').on("click", 'span.rc_open_sub', function () {
			var id = $(this).parent().find('ul').first();
			if (id.is(':visible')) {
				id.slideUp('fast');
				$(this).text('+');
			} else {
				id.slideDown('fast');
				$(this).text('-');
			}
		});
	},
	// добавить в избранное
	addSelected: function (id, count) {
		var is_full = false;
		var nCount = 1;
		if (count > 1) nCount = count;

		if (this.selected[id]) {
			nCount = this.selected[id].count + count;
			if (this.addInventory(id, nCount, count)) {
				this.selected[id].count = nCount;
			} else is_full = true;
		} else {
			if (this.addInventory(id, nCount, count)) {
				this.selected[id] = this.entity[id];
				this.selected[id].count = nCount;
			} else is_full = true
		}
		if (!is_full) {
			$('#rc_entities').find('#' + id + ' .rc_entity_count').text('x' + nCount);
		}
	},
	// изъять из избранного
	takeSelected: function (id, count) {
		var nCount = 0;
		if (this.selected[id]) {
			if (count == 'clear') {
				delete this.selected[id];
			} else {
				if (this.selected[id].count > 1) {
					nCount = this.selected[id].count - count;
					this.selected[id].count = nCount;
				} else {
					delete this.selected[id];
				}
			}
		}
		$('#rc_entities').find('#' + id + ' .rc_entity_count').text('x' + nCount);
		this.takeInventory(id, nCount, count);
	},
	// добавить в инвентарь
	addInventory: function (id, count, addCount) {
		// ищем объект уже в слотах
		var is_new_slot = true;
		for (var key in this.inventory) {
			if (id == this.inventory[key].id) {
				// если добавляем меньше стага, то плюсуем к слоту
				if ((count) <= this.entity[id].slot) {
					this.inventory[key].count = count;
					is_new_slot = false;
				} else {
					// иначе ставим стаг, вычисляем остаток и ищем пустой слот
					this.inventory[key].count = this.entity[id].slot;
					count = count - this.entity[id].slot;
					is_new_slot = true;
				}
				$('#rc_inventory #' + key + ' div').text(this.inventory[key].count);
			}
		}
		if (is_new_slot) {
			// ищим свободный слот
			var is_full = true;
			for (var key in this.inventory) {
				if (this.inventory[key].count == 0) {
					this.inventory[key].count = count;
					this.inventory[key].id = id;
					var tpl = '<span class="rc_65 i' + id + '"></span><div class="rc_entity_count">' + count + '</div>';
					$('#rc_inventory #' + key).html(tpl);
					is_full = false;
					break;
				}
			}
			if (is_full) {
				// заполняем до упора количество выбранного
				if (this.selected[id]) {
					var nCount = this.selected[id].count - count + addCount;
					this.selected[id].count = nCount;
					$('#rc_entities').find('#' + id + ' .rc_entity_count').text('x' + nCount);
				}
				alert('Inventory full!');
				return false;
			}
		}
		return true
	},
	// изъять из инвентаря
	takeInventory: function (id, nCount, count) {
		for (var i = this.inventory_count - 1; i >= 0; i--) {
			var key = 'slot' + i;
			if (this.inventory[key].id == id) {
				if (nCount == 0) {
					this.takeInventorySlot(key);
				} else {
					this.inventory[key].count = this.inventory[key].count - count;
					if (this.inventory[key].count > 0) {
						$('#rc_inventory #' + key + ' div').text(this.inventory[key].count);
						break;
					} else {
						this.takeInventorySlot(key);
						break;
					}
				}
			}
		}
	},
	// удалить из слота инвентаря
	clearSlot: function (key) {
		var nCount = 0;
		var count = this.inventory[key].count;
		if (count > 0) {
			var id = this.inventory[key].id;
			this.takeInventorySlot(key);
			if (this.selected[id].count == count) {
				delete this.selected[id];
			} else {
				nCount = this.selected[id].count - count;
				this.selected[id].count = nCount;
			}
			$('#rc_entities').find('#' + id + ' .rc_entity_count').text('x' + nCount);
		}
	},
	// очистить визуально слот инвентаря
	takeInventorySlot: function (key) {
		this.inventory[key].count = 0;
		this.inventory[key].id = "";
		$('#rc_inventory #' + key).html('<span class="rc_65 iNone"></span>');
	},
	// очистить все слоты инвентаря
	clearSlots: function () {
		RustCalculator.inventory = {};
		for (var i = 0; i <= this.inventory_count - 1; i++) {
			this.inventory['slot' + i] = {id: false, count: 0};
		}
		$('#rc_inventory .rc_entity').html('<span class="rc_65 iNone"></span><div class="rc_entity_count"></div>');
		$('#rc_entities .rc_entity_count').text('x0');
	},
	// калькуляция крафта
	calculateCraft: function () {
		var resours = {};
		for (var key in this.selected) {
			this.calculate(key, this.selected[key].count, resours);
		}
		this.viewCraft(resours);
//		console.dir(this.selected);
//		console.dir(resours);
	},
	// калькулятор
	calculate: function (name, count, resours) {
		name = name.replace(/ /g, '_');

		if (this.entity[name].craft) {
			var craft = {};
			craft['count'] = parseInt(count);
			for (var key in this.entity[name].craft) {
				craft[key.replace(/ /g, '_')] = parseInt(this.entity[name].craft[key] * craft['count']);
				this.calculate(key, parseInt(this.entity[name].craft[key] * craft['count']), resours);
			}
		} else {
			if (resours[name])
				resours[name] += count;
			else
				resours[name] = count;
		}
	},
	// показываем результат калькуляции
	// todo refactoring!
	viewCraft: function (resours) {
		var price = 0;

		$('#rc_craft ul#rc_craft_first').html('');
		if (!is_empty(this.selected)) {

//*/
			$('#rc_craft ul#rc_craft_first').append('<li>craft items :</li>\n');
			for (var key in this.selected) {
				// проверка цены
				if (this.selected[key].price) {
//					price += Math.ceil((this.selected[key].count / this.entity[key].price.count) * this.entity[key].price.value);
				}
				if (this.selected[key].craft) {
					var craft = ' <span class="rc_open_sub">-</span><br/>\n<ul class="sub_craft">\n';
					for (var name in this.selected[key].craft) {
						var count = this.selected[key].craft[name];
						var nCount = count * this.selected[key].count;
						var id = name.replace(/ /g, '_');
						// проверка цены
						if (this.entity[id].price) {
//							price += Math.ceil((nCount / this.entity[id].price.count) * this.entity[id].price.value);
						}
						if (this.entity[id].craft) {
							var craftUp = ' <span class="rc_open_sub">+</span>\n<ul class="sub_craft_up">\n';
							for (var nameUp in this.entity[id].craft) {
								var countUp = this.entity[id].craft[nameUp];
								var nCountUp = countUp * nCount;
								var idUp = nameUp.replace(/ /g, '_');
								// проверка цены
								if (this.entity[idUp].price) {
//									price += Math.ceil((nCountUp / this.entity[idUp].price.count) * this.entity[idUp].price.value);
								}
								craftUp += '<li>' + nameUp + ' x <span>' + nCountUp + '</span></li>\n';
							}
							craftUp += '</ul>\n';
						} else {
							craftUp = '';
						}
						craft += '<li' + ((craftUp) ? ' class="li_sub_craft"' : '') + '>' + name + ' x <span>' + nCount + '</span>' + craftUp + '</li>\n';
					}
					craft += '</ul>\n';
				} else craft = '';
				$('#rc_craft ul#rc_craft_first').append('<li><span class="rc_30 i' + key + '"></span>' + this.entity[key].name + ' x <span>' + this.selected[key].count + '</span>' + craft + '</li>\n');
			}
//*/
			$('#rc_craft ul#rc_craft_first').append('<li style="margin-top:20px">craft total :</li>\n');
			var base = {};
			var furnace = '';
			for (var key in resours) {

				if (this.entity[key].furnace) {
					furnace = '<span class="rc_open_sub">+</span>\n<ul class="sub_craft_furnace">\n';
					for (var name in this.entity[key].furnace) {
						var count = Math.ceil(resours[key] / this.entity[key].result) * this.entity[key].furnace[name];

						if (base[name]) {
							base[name] += count;
						} else {
							base[name] = count;
						}

						var charcoal = '';
						if ((name == 'Wood') && (key != 'Charcoal')) {
							var charcoalCount = Math.ceil(count * this.entity['Charcoal'].result) * this.entity['Charcoal'].furnace['Wood'];
							charcoal = '<li>>>> + Charcoal ≈ <span>' + charcoalCount + '</span></li>\n';
						}
						furnace += '<li>' + name + ' ≈ <span>' + count + '</span></li>\n' + charcoal;
					}
					furnace += '</ul>\n';
				} else {
					furnace = '';

					if (base[this.entity[key].name]) {
						base[this.entity[key].name] += resours[key];
					} else {
						base[this.entity[key].name] = resours[key];
					}

				}
				$('#rc_craft ul#rc_craft_first').append('<li class="sub_craft"><span class="rc_30 i' + key + '"></span>' + this.entity[key].name + ' x <span>' + resours[key] + '</span>' + furnace + '</li>\n');
			}
//*/
			$('#rc_craft ul#rc_craft_first').append('<li style="margin-top:20px">craft base :</li>\n');
			for (var key in base) {
				var id = key.replace(/ /g, '_');
				// расчёт цены
				if (this.entity[id].price) {
					price += Math.ceil((base[key] / this.entity[id].price.count) * this.entity[id].price.value);
				}
				$('#rc_craft ul#rc_craft_first').append('<li class="sub_craft"><span class="rc_30 i' + id + '"></span>' + this.entity[id].name + ' x <span>' + base[key] + '</span></li>\n');
			}

//			$('#rc_craft ul#rc_craft_first').append('<li style="margin-top:20px">price : <span>' + price + '</span></li>\n');
//*/
		}
		function is_empty(obj) {
			for (var key in obj) return false;
			return true;
		}
	}
};
RustCalculator.init('js/RustCalculator.json');

/*
 function mergeArray(destination, source) {
 for (var property in source) if (source.hasOwnProperty(property)) destination[property] += source[property];
 return destination;
 }
 */