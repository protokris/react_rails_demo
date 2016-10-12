# README

This project shows step by step how I integrated React into Rails using the react-rails gem on Oct 4 2016.  

Each commit represents a step in the process. 

# ROUGH NOTES

1. Make sure you have Rails

```
   gem update rails '5.0.0.1'
```

2. Create a rails project

```
   rails new .
```

3. Fire it up

```
   rake db:setup 
   rake db:migrate
   rails s
```

4. Add the gem

```
   echo -e "gem 'react-rails'\n" >> Gemfile

   bundle install
```

5. Run the install generator

```
   rails g react:install
```

6. Scaffold up a quick demo app:

```
   rails g scaffold Author name:string age:integer
   rails g scaffold Book title:string author:references
   rake db:migrate
```

7. Start it up again and make sure it works:

```
   rails s
   http://localhost:3000/authors  (add an author)		
   http://localhost:3000/books    (add a book)
```

8. create a REACT component!

```
rails g react:component Book book:object
```

9.  Edit the component


```
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
  }});
```

10.  Add the component to a view, e.g.

```
<p>
  <strong>Books:</strong>
  <% Book.where(author: @author).each do |b| %>

    <%= react_component('Book', book: b )  %>

  <% end %>
</p>
```

11.  You can make a lazy loading component:

```
var LazyBook = React.createClass({

  getInitialState: function() {
    return {data: {} };
  },

  componentDidMount: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  render: function() {
    return (
      <div>
        <div>Title: {this.state.data.title}</div>
      </div>
    );
  }

});
```

and in the view

```
<%= react_component( ‘LazyBook’,  url: url_for(b) )  %>
```
