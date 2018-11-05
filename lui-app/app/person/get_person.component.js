// component that contains the logic to read one person
window.GetPersonComponent = React.createClass({
    getInitialState: function() {
        
        return {
            id: 0,
            first_name: '',
            last_name: '',
            contact_number: ''
        };
    },
     
    componentDidMount: function(){
     

        var personId = this.props.personId;
        this.serverRequestProd = $.get("http://localhost/lui-api/person/getperson.php?id=" + personId,
            function (person) {
                this.setState({id: person.id});
                this.setState({first_name: person.first_name});
                this.setState({last_name: person.last_name});
                this.setState({contact_number: person.contact_number});
            }.bind(this));
    },
     
    componentWillUnmount: function() {
        this.serverRequestProd.abort();
    },
     
    render: function() {

        
        $('.page-header h1').text(this.state.first_name + ' ' + this.state.last_name +'\'s data');
 
        return (
            <div>
                <a href='#'
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    View All Data
                </a>
     
                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>First Name</td>
                            <td>{this.state.first_name}</td>
                        </tr>
     
                        <tr>
                            <td>Last Name</td>
                            <td>{this.state.last_name}</td>
                        </tr>
     
                        <tr>
                            <td>Contact Number</td>
                            <td>{this.state.contact_number}</td>
                        </tr>
     
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});