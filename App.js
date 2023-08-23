import { Component } from 'react';
import './App.css';


class Nav extends Component{
  state = {
    list: []
  }
  /* constructor(props){
    super(prop)
    this.state = {
      list: []
    }
  } */

  componentDidMount(){
    /* var result = "list.json"; // 데이터 가져오기
    var json = result.json() // 변환하기
    this.setState( { data: json }) // 사용하기 */

    fetch('list.json') // 데이터 가져오기
      .then(function(result){ // 가져오기가 "끝나면" 변환하기
        return result.json()
      })
      .then(function(json){ // 변환이 "끝나면" 사용하기
        // console.log(json)
        this.setState({
          list: json
        })
      }.bind(this))
  }

  render(){
    var list_data = [];
    for( var i = 0; i <this.state.list.length; i++ ){
      var list_item = this.state.list[i]
      list_data.push(
        <li key={list_item.id}>
          <a
            // data-id={list_item.id} // dataset
            href={list_item.id}
            // onClick={function(e){ // dataset
            onClick={function(id, e){
              e.preventDefault()
              // console.log("Trigger 발생!!")
              // console.log(list_item.id) // HTML - 3, CSS - 3, JAVASCRIPT - 3
              // console.log(e.target.dataset.id) // dataset
              // console.log(id)

              this.props.onGetData(id)
            }.bind(this, list_item.id)}
          >
            {list_item.title}
          </a>
        </li>
      )
    }

    return (
      <nav>
        <ul>
          {/* <li><a href="1">HTML</a></li>
          <li><a href="2">CSS</a></li>
          <li><a href="3">JAVASCRIPT</a></li> */}
          {list_data}
        </ul>
      </nav>
    )
  }
}

class Article extends Component {
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        <p>{this.props.desc}</p>
      </article>
    )
  }
}

class App extends Component {
  state = {
    article: { title: "Welcome", desc: "Hello, React Ajax" }
  }
  render(){
    return (
      <div className="App">
        <h1>Hello, React Ajax</h1>
        <Nav onGetData={function(get_id){
          // console.log("Nav 컴포넌트에서 받은 값 : ", get_id)
          fetch(get_id+".json")
            .then(function(result){
              return result.json()
            })
            .then(function(json){
              // console.log(json)
              this.setState({
                article: {
                  title: json.title,
                  desc: json.desc
                }
              })
            }.bind(this))
        }.bind(this)}></Nav>
        {/* <article>
          <h2>{this.state.article.title}</h2>
          <p>{this.state.article.desc}</p>
        </article> */}
        <Article title={this.state.article.title} desc={this.state.article.desc}></Article>
      </div>
    );
  }
}

export default App;
