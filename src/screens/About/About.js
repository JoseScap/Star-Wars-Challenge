import React from 'react'
import { Layout, Card, Col, Row, Typography, List } from 'antd'
import { CustomFooter, CustomHeader } from '../../components'
import './about.scss'

const About = () => {
  const { Content } = Layout
  const { Title, Paragraph, Text, Link } = Typography

  return (
    <Layout className='layout about'>
      <CustomHeader />
      <Content className='about--content'>
        <Row gutter={16} justify="center">
          <Col xs={24} sm={24} md={20} lg={16}>
            <Card bordered={false} style={{ width: '100%' }}>
              <Title level={1}>Star Wars Challenge</Title>
              <Paragraph>
                Welcome to my Star Wars Application, in this application we can find
                many characters that are served in <Text code>Star Wars API</Text>.
              </Paragraph>
              <Paragraph>
                In this project, I used React to develope it. We can see in the <Link href='https://github.com/JoseScap/Star-Wars-Challenge' target="_blank">code</Link> that I used the
                next libraries to develop it:
              </Paragraph>
              <List
                header={<div>Libraries</div>}
                bordered
                dataSource={[
                  {
                    tech: 'React.js',
                    description: 'A JavaScript library for building user interfaces',
                    url: 'https://reactjs.org/'
                  },
                  {
                    tech: 'AntDesing',
                    description: 'A design system for enterprise-level products. Create an efficient and enjoyable work experience.',
                    url: 'https://ant.design/docs/react/introduce'
                  },
                  {
                    tech: 'Axios',
                    description: 'Promise based HTTP client for the browser and node.js',
                    url: 'https://axios-http.com/docs/intro'
                  },
                  {
                    tech: 'React Router Dom',
                    description: 'React Router is a collection of React components, hooks and utilities that make it easy to build multi-page applications with React.',
                    url: 'https://reactrouter.com/'
                  },
                  {
                    tech: 'Redux',
                    description: 'A Predictable State Container for JS Apps',
                    url: 'https://redux.js.org/'
                  },
                  {
                    tech: 'Sass',
                    description: 'A Dart implementation of Sass. Sass makes CSS fun again.',
                    url: 'https://github.com/sass/dart-sass'
                  }
                ]}
                renderItem={item => (
                  <List.Item>
                    <Link href={item.url} target={'_blank'}>{item.tech}</Link> - {item.description}
                  </List.Item>
                )}
              />
              <List
                header={<div>APIs</div>}
                bordered
                style={{ marginTop: 32 }}
                dataSource={[
                  {
                    tech: 'SWAPI',
                    description: 'The Star Wars API',
                    url: 'https://swapi.dev/'
                  },
                  {
                    tech: 'Placeholder',
                    description: 'The Free Image Placeholder Service Favoured By Designers',
                    url: 'https://placeholder.com/'
                  }
                ]}
                renderItem={item => (
                  <List.Item>
                    <Link href={item.url} target={'_blank'}>{item.tech}</Link> - {item.description}
                  </List.Item>
                )}
              />
            </Card>
          </Col>
        </Row>
      </Content>
      <CustomFooter />
    </Layout>
  )
}

export default About
