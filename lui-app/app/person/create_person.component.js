window.CreatePersonComponent = React.createClass({
    
    getInitialState: function() {
        return {
            first_name: '',
            last_name: '',
            contact_number: '',
            successCreation: null
        };
    },
    
    componentDidMount: function() {    
        $('.page-header h1').text('Create Record');
    },
    
    componentWillUnmount: function() {
        this.serverRequest.abort();
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
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            contact_number: this.state.contact_number,
        };
    
        $.ajax({
            url: "http://localhost/lui-api/person/create.php",
            type : "POST",
            contentType : 'application/json',
            data : JSON.stringify(form_data),
            success : function(response) {
    
                this.setState({successCreation: response['message']});
    
                this.setState({first_name: ""});
                this.setState({last_name: ""});
                this.setState({contact_number: ""});
    
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
     
                this.state.successCreation == "Account was created." ?
                    <div className='alert alert-success'>
                        Person's record was saved.
                    </div>
                : null
            }
     
            {
     
                this.state.successCreation == "Unable to create person." ?
                    <div className='alert alert-danger'>
                        Unable to save Person's Data. Please try again.
                    </div>
                : null
            }
     
            <a href='#'
                onClick={() => this.props.changeAppMode('read')}
                className='btn btn-primary margin-bottom-1em'> View All Records
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
                            onClick={this.onSave}>Save</button>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </form>
        </div>
        );
    }
});