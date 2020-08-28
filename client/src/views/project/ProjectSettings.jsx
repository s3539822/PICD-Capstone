import React, { Component } from 'react'
import Sidebar from '../../components/Sidebar'
import auth from '../../utils/auth'
import callAPI from '../../utils/callAPI'

class ProjectSettings extends Component {
    constructor(props) {
        super(props)

        this.state = {
            project_id: "",
            title: "",
            owner: "",
            date_stamp: "",
            description: "",
            created_at: "",
            updated_at: "",
            isLoading: true,
            userList: "",
            err: ""
        }
    }

    getProjectData(projectID) {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS + "/project/" + projectID)
            .then(res => res.json())
            .then(res => {
                this.setState({
                    project_id: res.project.project_id,
                    title: res.project.title,
                    description: res.project.description,
                    created_at: res.project.created_at,
                    updated_at: res.project.updated_at,
                    owner: res.project.owner,
                })
                this.getProjectUserList();
            });        
    }

    componentDidMount() {
        this.getProjectData(this.props.match.params.projectId);
    }

    getProjectUserList() {
        if (this.state.owner === auth.getUID()) {
            callAPI.getProjectUserList((data) => {
                this.setState({
                    userList: data.projectUsers,
                    isLoading: false
                })
            }, this.state.project_id)
        }
    }

    handleSubmit = (event, uid) => {
        event.preventDefault()
        if (this.state.owner === uid) {
            //SET ERROR OR ALERT
        } else {
            callAPI.removeProjectUser((data) => {
                
                /* this.props.history.push("/project/"+this.props.match.params.projectId+"/settings") */
                window.location.href = "/project/"+this.props.match.params.projectId+"/settings";
            }, this.state.project_id, uid)
        }
    }

    handleFormChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    deleteProject(projectID, e) {
        fetch(process.env.REACT_APP_API_SERVER_ADDRESS + '/dashboard/delete/' + projectID)
            .then((response) => {
                if (response.status === 200) {
                    return response.json();
                }
            })
            .then((data) => {
                /* console.log(data); */
            
                window.location.href = "/";
            });
    }

    datetime = (datetime) => {
        var date = datetime.substring(0, 10).split('-');
        var time = datetime.substring(11, 16);
        return date[2] + "/" + date[1] + "/" + date[0] + ", " + time
    }

    projectCollaborators = () => {
        return this.state.owner === auth.getUID() ? (
            <div>
                <div className="row">
                    <label htmlFor="title" className="col-md-2 col-form-label text-md-right"></label>
                    <div className="col-md-4">
                        <h5>
                            User List
                        </h5>
                    </div>
                    <div className="col-md-4">
                        <button className="btn btn-success btn-sm" >
                            Add +
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="form-group row mb-0">
                            <div className="col-md-6 offset-md-2">
                                <table className="table table-hover">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>Privilege</th>
                                            <th>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.isLoading ? <tr><td colSpan="5" className="text-center"><strong>Loading...</strong></td></tr> :
                                            this.state.userList.map((user) => {
                                                return (
                                                    <tr key={user.user_id} className="pointer" >
                                                        <td>{user.fname} {user.lname}</td>
                                                        <td>{user.privilege.toUpperCase()}</td>
                                                        {
                                                            this.state.owner === user.user_id ? null :
                                                            <td>
                                                                <button className="btn btn-primary btn-sm" onClick={(event) => this.handleSubmit(event, user.user_id)}>
                                                                    Remove
                                                                </button>
                                                            </td>
                                                        }
                                                    </tr>
                                                )
                                            })}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
            </div>
        ) : null
    }

    render() {
        return (
            <div className="row justify-content-left">
                <Sidebar id={this.props.match.params.projectId} />
                <div className="col">
                    <div className="row">
                        <label htmlFor="title" className="col-md-2 col-form-label text-md-right"></label>
                        <div className="col-md-6">
                            <h3>
                                Project Settings
                            </h3>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <label htmlFor="title" className="col-md-2 col-form-label text-md-right"></label>
                        <div className="col-md-6">
                            <h5>
                                Edit
                            </h5>
                        </div>
                    </div>
                    <div className="row">
                        <form className="col">
                            <div className="form-group row">
                                <label htmlFor="title" className="col-md-2 col-form-label text-md-right">Project Title: </label>

                                <div className="col-md-6">
                                    <input type="text" name="title" className="form-control" id="title" value={this.state.title} onChange={this.handleFormChange} />
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="description" className="col-md-2 col-form-label text-md-right">Project Description: </label>

                                <div className="col-md-6">
                                    <textarea name="description" className="form-control" id="description" value={this.state.description} onChange={this.handleFormChange} />
                                </div>
                            </div>
                            {this.state.err !== "" ?
                                <div className="form-group row">
                                    <div className="col-md-6 offset-md-4">
                                        <span className="alert-danger form-control">
                                            {this.state.err}
                                        </span>
                                    </div>
                                </div> : null}
                        </form>
                    </div>
                    <div className="row">
                        <div className="col">
                            <div className="form-group row mb-0">
                                <div className="col-md-6 offset-md-2">
                                    <span>
                                        <button className="btn btn-danger" onClick={() => this.getProjectData(this.state.project_id)}>
                                            Cancel
                                        </button>
                                    </span>
                                    <span className="px-1">
                                        <button className="btn btn-primary" onClick={this.handleSubmit}>
                                            Update
                                        </button>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className="col">
                            <div className="form-group row">
                                <label htmlFor="created_at" className="col-md-2 text-md-right">Created At:</label>
                                <span className="col-md-6">{this.datetime(this.state.created_at)}</span>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="updated_at" className="col-md-2 text-md-right">Updated At:</label>
                                <span className="col-md-6">{this.datetime(this.state.updated_at)}</span>
                            </div>
                        </div>
                    </div>
                    <hr />
                    {this.projectCollaborators()}
                    <div className="row">
                        <form className="col" onSubmit={this.handleSubmit}>
                            {this.state.err !== "" ?
                                <div className="form-group row">
                                    <div className="col-md-6 offset-md-4">
                                        <span className="alert-danger form-control">
                                            {this.state.err}
                                        </span>
                                    </div>
                                </div> : null}
                            <div className="form-group row">
                                <label htmlFor="revision" className="col-md-2 col-form-label text-md-right">Delete Project:</label>

                                <div className="col-md-6">
                                    <button id='test' type="button" onClick={(e) => this.deleteProject(this.props.match.params.projectId, e)} className="btn btn-xs btn-danger">
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProjectSettings;