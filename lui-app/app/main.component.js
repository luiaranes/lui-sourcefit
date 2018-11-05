var MainApp = React.createClass({
 
    getInitialState: function(){
        return {
            currentMode: 'read',
            personId: null
        };
    },
 
    changeAppMode: function(newMode, personId){
        this.setState({currentMode: newMode});
            if(personId !== undefined){
            this.setState({personId: personId});
        }
    },
 
    render: function(){
 
        var modeComponent =
            <ReadPersonsComponent
            changeAppMode={this.changeAppMode} />;
 
        switch(this.state.currentMode){
            case 'read':
                break;
            case 'get':
                modeComponent = <GetPersonComponent personId={this.state.personId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'create':
                modeComponent = <CreatePersonComponent changeAppMode={this.changeAppMode}/>;
                break;
            case 'update':
                modeComponent = <UpdatePersonComponent personId={this.state.personId} changeAppMode={this.changeAppMode}/>;
                break;
            case 'delete':
                modeComponent = <DeletePersonComponent personId={this.state.personId} changeAppMode={this.changeAppMode}/>;
                break;
            default:
                break;
        }
 
        return modeComponent;
    }
});
 
ReactDOM.render(
    <MainApp />,
    document.getElementById('content')
);