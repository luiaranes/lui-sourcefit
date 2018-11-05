window.PersonRow = React.createClass({
    render: function() {
    return (
        <tr>
            <td>{this.props.person.first_name}</td>
            <td>{this.props.person.last_name}</td>
            <td>{this.props.person.contact_number}</td>
            <td>
                <a href='#'
                    onClick={() => this.props.changeAppMode('get', this.props.person.id)}
                    className='btn btn-info m-r-1em'> View Data
                </a>
                <a href='#'
                    onClick={() => this.props.changeAppMode('update', this.props.person.id)}
                    className='btn btn-primary m-r-1em'> Edit
                </a>
                <a
                    onClick={() => this.props.changeAppMode('delete', this.props.person.id)}
                    className='btn btn-danger'> Delete
                </a>
            </td>
        </tr>
        );
    }
});