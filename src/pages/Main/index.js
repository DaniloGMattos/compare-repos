import React, { Fragment, Component } from "react";
import api from "../../services/api";
import logo from "../../assets/logo.svg";
import moment from "moment";
import { Container, Form } from "./styles";
import CompareList from "../../components/CompareList";

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: "",
    repositories: []
  };
  componentWillMount() {
    this.handleRetreveRepository();
  }
  handleRetreveRepository = async () => {
    this.setState({
      repositories: await JSON.parse(localStorage.getItem("repositories"))
    });
  };
  handleUpdateRepository = async repositoryId => {
    let updatedRepository = await this.state.repositories.find(
      repo => repo.id === repositoryId
    );
    const { data: repository } = await api.get(
      `/repos/${updatedRepository.full_name}`
    );
    updatedRepository = repository;
    updatedRepository.lastCommit = moment(
      updatedRepository.pushed_at
    ).fromNow();
    this.setState({
      repositories: [
        ...this.state.repositories.filter(repo => repo.id !== repositoryId),
        updatedRepository
      ]
    });
    await localStorage.clear();
    localStorage.setItem(
      "repositories",
      JSON.stringify(this.state.repositories)
    );
  };
  handleDeleteRepository = async repositoryId => {
    const newRepositories = this.state.repositories.filter(
      repo => repo.id !== repositoryId
    );
    this.setState({ repositories: newRepositories });
    await localStorage.clear();

    localStorage.setItem(
      "repositories",
      JSON.stringify(this.state.repositories)
    );
  };
  handleAddRepository = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const { data: repository } = await api.get(
        `/repos/${this.state.repositoryInput}`
      );
      repository.lastCommit = moment(repository.pushed_at).fromNow();
      this.setState({
        repositoryInput: "",
        repositories: [...this.state.repositories, repository],
        repositoryError: false
      });
      localStorage.setItem(
        "repositories",
        JSON.stringify(this.state.repositories)
      );
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    return (
      <Fragment>
        <Container>
          <img src={logo} alt="" />
          <Form
            Error={this.state.repositoryError}
            onSubmit={this.handleAddRepository}
            action=""
          >
            <input
              type="text"
              name="search"
              id=""
              value={this.state.repositoryInput}
              placeholder="usuário/repositório"
              onChange={e => this.setState({ repositoryInput: e.target.value })}
            />
            <button type="submit">
              {this.state.loading ? (
                <i className="fa fa-spinner fa-pulse" />
              ) : (
                "OK"
              )}
            </button>
          </Form>
          <CompareList
            onUpdate={this.handleUpdateRepository}
            onDelete={this.handleDeleteRepository}
            repositories={this.state.repositories}
          />
        </Container>
      </Fragment>
    );
  }
}
