import React, { useState, useEffect } from 'react';
import { Card, Avatar, Typography, List, Row, Col } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

import { useSelector, useDispatch } from 'react-redux'
const { Meta } = Card;
const { Title, Text } = Typography;

const ProfilePage = () => {
  const [userData, setUserData] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [orgsData, setOrgsData] = useState([]);
  const [reposData, setReposData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth)

  const username = 'inciner8r'; 
  const accessToken = process.env.GITHUB_ACCESS_TOKEN; 
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // const config = {
        //   headers: {
        //     Authorization: `token ${accessToken}`
        //   }
        // };
        console.log(user.username)
        const userResponse = await axios.get(`https://api.github.com/users/${user.username}`);
        setUserData(userResponse.data);
        
        const followersResponse = await axios.get(`https://api.github.com/users/${user.username}/followers`);
        setFollowers(followersResponse.data);

        const followingResponse = await axios.get(`https://api.github.com/users/${user.username}/following`);
        setFollowing(followingResponse.data);

        const orgsResponse = await axios.get(`https://api.github.com/users/${user.username}/orgs`);
        setOrgsData(orgsResponse.data);

        const reposResponse = await axios.get(`https://api.github.com/users/${user.username}/repos?sort=stars`);
        setReposData(reposResponse.data);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };


    fetchUserData();
  }, [user]);

  return (
    <div style={{ position: 'fixed', left: '200px', width: 'calc(100% - 200px)', height: '100vh', overflowY: 'auto', paddingBottom:"50px", borderRadius: "25px" }} >
    <Row gutter={[16, 16]}>
        <Col span={24}>
          <Card
            title={<Title level={3}>User Profile</Title>}
            style={{
              margin: '13px',
              backgroundColor: 'rgb(235, 201, 225)',
              borderRadius: '15px',
              border: 'none',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              boxShadow: '0 0 10px 1px rgba(0, 0, 0, 0.2)'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Avatar size={64} src={userData?.avatar_url} />
              <div style={{ marginLeft: '20px' }}>
                <Title level={4}>{userData?.name}</Title>
                <Text>Github Username: {userData?.login}</Text>
                <br />
                <Text>Total Contributions: {userData?.public_repos}</Text>
              </div>
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card
            title="Followers"
            style={{
             margin: '13px',
              backgroundColor: 'rgb(235, 201, 225)',
              borderRadius: '10px',
              border: 'none',
              overflowY: 'auto',
              maxHeight: '300px',
              boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, 0.2)'
            }}
          >
            <List
              dataSource={followers}
              renderItem={follower => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={follower.avatar_url} />}
                    title={<Text>{follower.login}</Text>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Following"
            style={{
             margin: '13px',
              backgroundColor: 'rgb(235, 201, 225)',
              borderRadius: '10px',
              border: 'none',
              overflowY: 'auto',
              maxHeight: '300px',
              boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, 0.2)'
            }}
          >
            <List
              dataSource={following}
              renderItem={follow => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={follow.avatar_url} />}
                    title={<Text>{follow.login}</Text>}
                  />
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Card
            title="Organizations"
            style={{
             margin: '13px',
              backgroundColor: 'rgb(235, 201, 225)',
              borderRadius: '10px',
              border: 'none',
              overflowY: 'auto',
              maxHeight: '300px',
              boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, 0.2)'
            }}
          >
            <List
              dataSource={orgsData}
              renderItem={org => (
                <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={org.avatar_url} />}
                  title={<Text>{org.login}</Text>}
                />
              </List.Item>
              )}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card
            title="Popular Repositories"
            style={{
             margin: '13px',
              backgroundColor: 'rgb(235, 201, 225)',
              borderRadius: '10px',
              border: 'none',
              overflowY: 'auto',
              maxHeight: '300px',
              boxShadow: '0px 0px 10px 1px rgba(0, 0, 0, 0.2)'
            }}
          >
            <List
              dataSource={reposData}
              renderItem={repo => (
                <List.Item>
                  <Text>{repo.name}</Text>
                </List.Item>
              )}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ProfilePage;
