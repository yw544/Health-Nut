
class Body extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fruits: [],
      foodInfo: null
    };
    this.handleFormSubmit = this.handleFormSubmit.bind(this)
    this.addNewFruit = this.addNewFruit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.deleteFruit = this.deleteFruit.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this);
    this.updateFruit = this.updateFruit.bind(this)
    this.foodInfo = this.foodInfo.bind(this)
    this.makeGraph = this.makeGraph.bind(this)
  }

  handleFormSubmit(name, description){
    let body = JSON.stringify({fruit: {name: name, description: description} })

    fetch('http://localhost:3000/api/v1/fruits', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: body,
    }).then((response) => {return response.json()})
    .then((fruit)=>{
      this.addNewFruit(fruit)
    })

  }

  addNewFruit(fruit){
    this.setState({
      fruits: this.state.fruits.concat(fruit)
    })
  }

   handleDelete(id){
    fetch(`http://localhost:3000/api/v1/fruits/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        this.deleteFruit(id)
      })
  }

  deleteFruit(id){
    newFruits = this.state.fruits.filter((fruit) => fruit.id !== id)
    this.setState({
      fruits: newFruits
    })
  }

  handleUpdate(fruit){
    fetch(`http://localhost:3000/api/v1/fruits/${fruit.id}`,
    {
      method: 'PUT',
      body: JSON.stringify({fruit: fruit}),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((response) => {
        this.updateFruit(fruit)
      })
  }
  updateFruit(fruit){
    let newFruits = this.state.fruits.filter((f) => f.id !== fruit.id)
    newFruits.push(fruit)
    this.setState({
      fruits: newFruits
    })
  }

  componentDidMount(){
    fetch('/api/v1/fruits.json')
      .then((response) => {return response.json()})
      .then((data) => {this.setState({ fruits: data }) });
  }

  foodInfo(){
    fetch('http://localhost:3000/api/v1/getfood', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        food: this.state.fruits
      })
    })
    .then(res=>res.json())
    .then(json=>{
      this.setState(({
        foodInfo: json
      }))
    })
  }

  showButton(){
    return(
      <button onClick={this.foodInfo}>Make Graph</button>
    )
  }

  makeGraph(){
    totalC = 0
    totalF = 0
    totalSF = 0
    totalCH = 0
    totalS = 0
    totalSu = 0
    totalP = 0
    totalK = 0
    totalPh = 0

    return(
      <div>
        {this.state.foodInfo.map((food)=>{
          totalC += food.nf_calories
          totalF += food.nf_total_fat
          totalSF += food.nf_saturated_fat
          totalCH += food.nf_cholesterol
          totalS += food.nf_sodium
          totalSu += food.nf_sugars
          totalP += food.nf_protein
          totalK += food.nf_potassium
          totalPh += food.nf_p
          return(
            <div>
              {food.food_name} -->
               Calories: {food.nf_calories},
               Total fat: {food.nf_total_fat},
               Saturated fat: {food.nf_saturated_fat},
               Cholesterol: {food.nf_cholesterol},
               Sodium: {food.nf_sodium},
               Sugars: {food.nf_sugars},
               Protein: {food.nf_protein},
               Potassium: {food.nf_potassium},
               Phosphorus: {food.nf_p}
            </div>
          )
        })}
        <br />
        Total Calories = {totalC} <br></br>
        Total Fat = {totalF} <br></br>
        Total Saturated Fat = {totalSF} <br></br>
        Total Cholesterol = {totalCH} <br></br>
        Total Sodium = {totalS} <br></br>
        Total Sugars = {totalSu} <br></br>
        Total Protein = {totalP} <br></br>
        Total Potassium = {totalK} <br></br>
        Total Phosphorus = {totalPh} <br />
      </div>
    )
  }

  render(){
    console.log(this.state)
    return(
      <div>
      <div style={{display:'block', marginLeft: "45%", width:'0%'}}>
        <NewFruit handleFormSubmit={this.handleFormSubmit}/>
        {this.state.fruits.length !== 0 ? this.showButton() : null }
        </div>
        <div style={{marginLeft:'50%', fontSize:'16pt', position: "fixed"}}>
        {this.state.foodInfo !== null ? this.makeGraph() : null}
        </div>
        <div style={{display:'block', marginLeft:'15%', width:'75%', position: "fixed"}}>
        <AllFruits fruits={this.state.fruits} handleDelete={this.handleDelete} handleUpdate={this.handleUpdate}/>
        </div>
      </div>
    )
  }
}
