window.UpdatePersonComponent = React.createClass({
    getInitialState: function() {
        return {
            id: 0,
            first_name: '',
            last_name: '',
            contact_number: 0,
            successUpdate: null
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
     
        $('.page-header h1').text('Update Person\'s Data');
    },
     
    componentWillUnmount: function() {
        this.serverRequestCat.abort();
        this.serverRequestProd.abort();
    },
     
    onFirstNameChange: function(e) {
        this.setState({first_name: e.target.value});
    },
    
    onLastNameChange: function(e) {
        this.setState({last_name: e.target.value});
    },
    
    onContactNumberChange: function(e) {
        this.setState({contact_number: e.target.value});
    },

    onSave: function(e){
    
        var form_data={
            id: this.state.id,
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            contact_number: this.state.contact_number,
        };
    
        $.ajax({
            url: "http://localhost/lui-api/person/update.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(response) {
                this.setState({successUpdate: response['message']});
            }.bind(this),
            error: function(xhr, resp, text){
                console.log(xhr, resp, text);
            }
        });
    
        e.preventDefault();
    },
    
    render: function() {
     
        return (
            <div>
                {
                    this.state.successUpdate == "Person's record was updated." ?
                        <div className='alert alert-success'>
                            Person's Data was updated.
                        </div>
                    : null
                }
     
                {
                    this.state.successUpdate == "Unable to update person's record." ?
                        <div className='alert alert-danger'>
                            Unable to update Person's Data. Please try again.
                        </div>
                    : null
                }
     
                <a href='#'
                    onClick={() => this.props.changeAppMode('read')}
                    className='btn btn-primary margin-bottom-1em'>
                    View All Records
                </a>
     
                <form onSubmit={this.onSave}>
                    <table className='table table-bordered table-hover'>
                        <tbody>
                        <tr>
                            <td>First Name</td>
                            <td>
                                <input
                                type='text'
                                className='form-control'
                                value={this.state.first_name}
                                required
                                onChange={this.onFirstNameChange} />
                            </td>
                        </tr>
        
                        <tr>
                            <td>Last Name</td>
                            <td>
                                <input
                                type='text'
                                className='form-control'
                                value={this.state.last_name}
                                required
                                onChange={this.onLastNameChange} />
                            </td>
                        </tr>
        
                        <tr>
                            <td>Contact Number</td>
                            <td>
                                <input
                                type='text'
                                className='form-control'
                                value={this.state.contact_number}
                                required
                                onChange={this.onContactNumberChange} />
                            </td>
                        </tr>
     
                        <tr>
                            <td></td>
                            <td>
                                <button
                                    className='btn btn-primary'
                                    onClick={this.onSave}>Save Changes</button>
                            </td>
                        </tr>
     
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
});