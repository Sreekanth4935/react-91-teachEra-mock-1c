import {Route, Switch, Redirect} from 'react-router-dom'
import HomeRoute from './components/HomeRoute'
import CourseItemDetails from './components/CourseItemDetails'
import './App.css'
import NotFound from './components/NotFound'

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/" component={HomeRoute} />
      <Route exact path="/courses/:id" component={CourseItemDetails} />
      <Route exact path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
