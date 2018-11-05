window.ReadPersonsComponent = React.createClass({
    getInitialState: function() {
        return {
            persons: []
        };
    },
 
    componentDidMount: function() {
 
        this.serverRequest = $.get("http://localhost/lui-api/person/read.php", function (persons) {
            this.setState({
                persons: persons.records
            });
        }.bind(this));
    },
 
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
 
    render: function() {
        
        var filteredPersons = this.state.persons;
        $('.page-header h1').text('List of Persons');
 
        return (
            <div className='overflow-hidden'>
                <TopActionsComponent changeAppMode={this.props.changeAppMode} />
 
                <PersonsTable
                    persons={filteredPersons}
                    changeAppMode={this.props.changeAppMode} />
            </div>
        );
    }
});