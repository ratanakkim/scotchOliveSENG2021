var HelloWorld = React.createClass({
  render: function() {
    return (
      <p>
        Hello, it is {this.props.date.toTimeString()}
      </p>
    );
  }
});
setInterval(function() {
  ReactDOM.render(
    <HelloWorld date={new Date()} />,
    document.getElementById('example')
  );
}, 500);
