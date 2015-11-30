Router.configure({
	layoutTemplate: 'layout'
});

Router.route('/',{
	template: 'runway'
});

Router.route('runway',{
	template: 'runway'
});

Router.route('survey',{
	template: 'survey'
});

Router.route('stylingRoom',{
	template: 'stylingRoom'
});

Router.route('wardrobe',{
	template: 'wardrobe'
});

Router.route('fetchItems',{
	template: 'fetchItems'
});
