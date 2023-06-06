import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Header from '../Header'
import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class CourseItemDetails extends Component {
  state = {
    apiData: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.renderApi()
  }

  renderApi = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })

    const {match} = this.props
    const {params} = match
    // console.log(this.props)
    const {id} = params
    // console.log(id)
    const options = {
      method: 'GET',
    }
    const apiUrl = `https://apis.ccbp.in/te/courses/${id}`
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()

      const updatedData = {
        id: data.course_details.id,
        description: data.course_details.description,
        imageUrl: data.course_details.image_url,
        name: data.course_details.name,
      }

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
      <div className="course-container">
        <div className="course-sub-container">
          <img
            className="course-img"
            src={apiData.imageUrl}
            alt={apiData.name}
          />
          <div className="heading-container">
            <h1>{apiData.name}</h1>
            <p>{apiData.description}</p>
          </div>
        </div>
      </div>
    )
  }

  retryApi = () => {
    this.renderApi()
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

  renderCourseItemDetails = () => {
    const {apiStatus} = this.state
    // console.log(apiStatus)

    switch (apiStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoader()
      case apiStatusConstants.success:
        return this.renderSuccessView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="main-container1">
        <Header />
        {this.renderCourseItemDetails()}
      </div>
    )
  }
}

export default CourseItemDetails
