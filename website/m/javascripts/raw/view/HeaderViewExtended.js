/*global Poof */
/*global Package */
/*global Load */
/*global Import */
/*global Class */

/*global console */

Package('view',
[
	Import('mjframe.View'),

	Class('public singleton HeaderViewExtended extends View',
	{
		_public:
		{
			HeaderViewExtended : function()
			{
				this._super();
				this.init('headerExtended', 'view.HeaderViewExtended', 'HeaderExtended');
			},

			show : function(direction)
			{
				this.$el.fadeIn();
			},

			hide : function(direction)
			{
				this.$el.fadeOut();
			}
		}
	})
]);