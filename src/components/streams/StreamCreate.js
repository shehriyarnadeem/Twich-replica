import React from 'react';
import {Field, reduxForm} from 'redux-form';
class StreamCreate extends React.Component{

  renderError=({error,touched})=>{

    if(touched && error){
    return (
    <div className="ui error message">
    <div className="header">
    {error}
    </div>
    </div>
    );     
    }
  }
  renderInput=(formProps)=>{
    const className =`field ${formProps.meta.error && formProps.meta.touched ? 'error':''}`;
    return (
      <div className={className}>
    <label>{formProps.label}</label>
    <input {...formProps.input} />
   
    {this.renderError(formProps.meta)}
    </div>
    );
  }

  onSubmit(formValues){
    console.log(formValues);
  }

  render(){

  
  return (

   <form className="ui form error" onSubmit={this.props.handleSubmit(this.onSubmit)}>
   <Field name="title" component={this.renderInput} label="Enter title"/>
   <Field name="description" component={this.renderInput} label="Enter description"/>
   <button type="submit" className="btn btn-primary">Submit</button>
   </form>
  )
  }
}

const validate=formValues=>{
 const errors = {}
 if(!formValues.title){
   errors.title="Title cannot be blank"
 }
 if(!formValues.description){
  errors.description="Descrition cannot be blank"
}
return errors;
 }

 export default reduxForm({
  form:'streamCreate',
  validate
})(StreamCreate);
