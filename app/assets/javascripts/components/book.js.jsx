var Book = React.createClass({
  propTypes: {
    book: React.PropTypes.object
  },

  render: function() {
    return (
      <div>
        <div>Title: {this.props.book.title}</div>
      </div>
    );
  }
});
