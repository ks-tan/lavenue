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

Router.route('page2',{
	template: 'page2'
});

Router.route('page3',{
	template: 'page3'
});

Router.route('fetchImages',{
	template: 'fetchImages'
});