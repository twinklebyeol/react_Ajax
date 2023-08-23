import { Component } from 'react';
import React from 'react';
import './App.css';

// Nav 컴포넌트
class Nav extends Component {
  state = {
    list: []
  }

  componentDidMount() {
    // 컴포넌트가 마운트될 때 'list.json'에서 데이터를 가져옵니다.
    fetch('list.json').then(function (result) {
      // 가져온 데이터를 텍스트에서 JSON 형식으로 변환합니다.
      return result.json();
    })
    .then(function (json) {
      // 가져온 데이터로 상태(state)를 업데이트합니다.
      this.setState({
        list: json
      });
    }.bind(this)); // 'this'를 현재 컴포넌트 인스턴스에 바인딩합니다.
  }
  
  render() {
    var list_data = [];
    for (var i = 0; i < this.state.list.length; i++) {
      var list_item = this.state.list[i];
      list_data.push(
        <li key={list_item.id}>
          <a
            data-id={list_item.id}
            href={list_item.id}
            onClick={(id, e) => { 
              e.preventDefault(); // 기본 링크 동작을 막습니다.
              this.props.onGetData(id); // id를 사용하여 'onGetData' 프롭 함수를 호출합니다.
            }}
          >
            {list_item.title}
          </a>
        </li>
      );
    } 

    return (
      <nav>
        <ul>
          {/* 가져온 데이터를 동적으로 렌더링합니다. */}
          {list_data}
        </ul>
      </nav>
    );
  }
}
const myImage4 = 'https://i.pinimg.com/236x/79/8f/59/798f5980874aaa327b5e692da12e4066.jpg';

// Article 컴포넌트
class Article extends Component {
  render() {
    return (
      <article>
        <h2>{this.props.title}</h2>
        <p>{this.props.desc}</p>
<img src={myImage4} alt="My Profile Photo" />
        
      </article>
    );
  }
}

// App 컴포넌트
class App extends Component { 
  state = {
    article: { "title": "Welcome★★★★★", "desc": "♥♥♥♥♥♥♥♥♥♥♥♥♥♥♥" },
    article2: { "title": "Welcome", "desc": "★★★★★★★★★★★★" }
  }

  render() {
    return (
      <div className='App'>
        <h1>Hello, React Ajax</h1>
        {/* 'onGetData' 프롭에 익명 함수를 전달합니다. */}
        <Nav onGetData={(get_id) => {
          console.log("Nav 컴포넌트에서 받은값 :", get_id);
          fetch(get_id + ".json")
            .then(function (result) {
              return result.json();
            })
            .then((json) => {
              // 가져온 데이터로 'article' 상태를 업데이트합니다.
              this.setState({
                article: {
                  title: json.title,
                  desc: json.desc
                }
              });
            });
        }} />
        
        {/* Article 컴포넌트에 'article' 상태를 표시합니다. */}
        <Article title={this.state.article.title} desc={this.state.article.desc} />
      </div>
    );
  }
}

export default App;
