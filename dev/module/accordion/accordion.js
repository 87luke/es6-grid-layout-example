class Accordion {
	constructor(props){
		this.props = props;
		this.accordionItems = [];
		this.render();
	}

	// render accordion group template and initialiaze accordionItems
	render() {
		this.container = document.getElementById(this.props.container);
		this.container.innerHTML = this.template();
		// set container accordion item in order to append accordion item
		this.accordionElement = this.container.querySelector('.accordion__items');
		this.props.panels.forEach((value, index) => {
			// instance Accordion item anc render it
			this.accordionItems[index] = new AccordionItem({
				container:this.accordionElement,
				item:value,
				indexList:index
			}, {
				onclick: (index) => this.onclickOnItem(index)
			});
			this.accordionItems[index].render();
		});
	}

	// Return a string with a template accordion group
	template() {
		return '<div class="accordion">' +
			((this.props.mainTitle)?`<h3 class="accordion__title">${this.props.mainTitle}</h3>`:'') + // Optional property
			'<div class="accordion__items"></div>' +
			'</div>'
	}

	// this method receive in input the index of accordion Item clicked and it manages the behaviour
	onclickOnItem(index) {
		this.accordionItems.forEach((value, i) => {
			if(index === i && !this.accordionItems[i].props.item.opened){
				this.accordionItems[i].open();
			} else {
				this.accordionItems[i].close();
			}
		})
	}
}

/** Accordion Item class manage an accordion item */
class AccordionItem {
	constructor (
		props, // object that represent the properties of Accordion Item
		methods = {} // object that have the list of callback event, the accordionItem use it to exchange information with AccordionGroup
	) {
		this.props = props;
		this.methods = methods;

		this.props.item.opened = false; /* param that represent accordion item open or not */
	}

	// render accordion item template
	render () {
		this.itemElement = document.createElement('div');
		this.itemElement.classList.add('accordion__item');
		this.itemElement.innerHTML = this.template();
		this.itemElement.querySelector('.accordion__item__header').onclick = () => this.methods.onclick(this.props.indexList);

		this.props.container.appendChild(this.itemElement);
	}

	// Return a string with a template accordion item
	template() {
		return '<div class="accordion__item__header">' +
			`<span class="accordion__item__title">${this.props.item.title}</span>` +
			((this.props.item.subtitle)?`<span class="accordion__item__subtitle">${this.props.item.subtitle}</span>`:'') + // Optional property
			'<div class="accordion__item__arrow"><i class="material-icons">keyboard_arrow_down</i></div>' +
			'</div>' +
			`<div class="accordion__item__content">${this.props.item.content}</div>`;
	}

	// close panel accordion content
	close () {
		if(!this.props.item.opened) {
			// Case: try to close an accordion item already closed
			return;
		}
		this.itemElement.classList.remove('accordion__item--open');
		this.props.item.opened = false;
	}

	// open panel accordion content
	open () {
		if(this.props.item.opened) {
			// Case: try to open an accordion item already opened
			return;
		}
		this.itemElement.classList.add('accordion__item--open');
		this.props.item.opened = true;
	}
}