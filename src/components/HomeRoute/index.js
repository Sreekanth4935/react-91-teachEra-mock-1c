import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Header from '../Header'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class HomeRoute extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    apiData: [],
  }

  componentDidMount() {
    this.renderApiData()
  }

  renderApiData = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const options = {
      method: 'GET',
    }

    const response = await fetch('https://apis.ccbp.in/te/courses', options)

    if (response.ok) {
      const data = await response.json()
      // console.log(data)

      const updatedData = data.courses.map(eachCourse => ({
        id: eachCourse.id,
        logoUrl: eachCourse.logo_url,
        name: eachCourse.name,
      }))

      this.setState({
        apiData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />{' '}
    </div>
  )

  renderSuccessView = () => {
    const {apiData} = this.state

    return (
      <div className="success-container">
        <h1 className="heading">Courses</h1>
        <ul className="ul-container">
          {apiData.map(eachData => (
            <li key={eachData.id} className="list-item">
              <Link to={`/courses/${eachData.id}`} className="link">
                <img
                  className="logo-image"
                  src={eachData.logoUrl}
                  alt={eachData.name}
                />
                <p className="name">{eachData.name}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  retryApi = () => {
    this.renderApiData()
  }

  renderFailureView = () => (
    <>
      <div className="main-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="img"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for</p>
        <button className="retry-btn" type="button" onClick={this.retryApi}>
          Retry
        </button>
      </div>
    </>
  )

  showApiDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return this.renderLoader()
    }
  }

  render() {
    return (
      <>
        <Header />
        <div>{this.showApiDetails()}</div>
      </>
    )
  }
}

export default HomeRoute
