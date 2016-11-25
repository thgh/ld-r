import React from 'react';
import PropertyHeader from '../property/PropertyHeader';
import ObjectBrowser from '../object/ObjectBrowser';
import SearchInput from 'react-search-input';

class Facet extends React.Component {
    constructor(props){
        super(props);
        this.state = {searchTerm: '', selected: []};
    }
    checkItem(status, value) {
        this.props.onCheck(status, value, this.props.spec.propertyURI);
        let pos = this.state.selected.indexOf(value);
        if(pos === -1){
            this.state.selected.push(value);
        }else{
            this.state.selected.splice(pos, 1);
        }
    }
    //used for custom sorting
    compare(a, b) {
        return (parseInt(b.total) - parseInt(a.total));
    }
    //filter content
    searchUpdated(term) {
        this.setState({searchTerm: term}); // needed to force re-render
    }
    render() {
        let self = this;
        let cardClasses = 'ui segment ' + (this.props.color ? this.props.color : 'blue');
        let descStyle = {
            minHeight: this.props.minHeight ? this.props.minHeight : 80,
            maxHeight: this.props.maxHeight ? this.props.maxHeight : 200,
            position: 'relative',
            overflow: 'scroll'
        };
        //order by total count: for performance is done on client-side
        if(self.props.spec.propertyURI){
            this.props.spec.instances.sort(this.compare);
        }
        let newSpec = {};
        let cloneInstances = this.props.spec.instances.slice(0);
        newSpec.property = this.props.spec.property;
        newSpec.propertyURI = this.props.spec.propertyURI;
        if (this.refs.search) {
            let filters = ['label', 'value'];
            cloneInstances = cloneInstances.filter(this.refs.search.filter(filters));
        }
        newSpec.instances = cloneInstances;
        return (
            <div className={cardClasses} ref="facet">
                <div className="content">
                    <div className="ui horizontal list">
                        <div className="item">
                            <PropertyHeader spec={{property: this.props.spec.property, propertyURI: this.props.spec.propertyURI}} config={this.props.config} size="3" />
                        </div>
                    </div>
                    <div className="meta">

                    </div>
                    <div className="description">
                        <div className="ui form" style={descStyle}>
                            <ObjectBrowser shortenURI={true} spec={newSpec} config={this.props.config} onSelect={this.checkItem.bind(this)} datasetURI={this.props.datasetURI}/>
                        </div>
                    </div>
                  </div>
                  <br/>
                  <div className="extra content">
                      <div className="ui tag horizontal labels">
                          <SearchInput className="ui mini search icon input" ref="search" onChange={this.searchUpdated.bind(this)} throttle={500}/>
                          {this.props.spec.property ?
                              <a className='ui icon mini basic button right floated' onClick={this.props.toggleExpandFacet.bind(this, this.props.spec.propertyURI)}>
                                  <i className='ui icon expand'></i>
                              </a>
                          : ''
                          }
                      </div>

                  </div>
            </div>
        );
    }
}

export default Facet;