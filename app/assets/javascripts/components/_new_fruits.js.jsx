const NewFruit = (props) => {

    let formFields = {}

    return(
      <div>
        <div class="ui input"> <input type="text" ref={input => formFields.name = input} placeholder='Enter the name of the item'/></div>
        <div class="ui input"><input ref={input => formFields.description = input} placeholder='Enter a description' /></div>
        <button onClick={ () => props.handleFormSubmit(formFields.name.value, formFields.description.value)}>Submit</button>
      </div>
    )
}
