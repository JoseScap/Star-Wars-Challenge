import React, { useState, useCallback, useRef } from 'react'
import { Link } from 'react-router-dom'
import { CustomHeader } from './../components'
import useInfinity from '../customHooks/useInfinity'
import './home.scss'

import { Layout, Empty, Card, Col, Row, Input } from 'antd'

const Home = () => {
  // HOOKS
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  const { characters, loading, error, hasMore } = useInfinity(query, pageNumber)

  const observer = useRef()
  const lastCardElementRef = useCallback(node => {
    if (loading) return
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPageNumber(prevPageNumber => prevPageNumber + 1)
      }
    })

    if (node) observer.current.observe(node)
  }, [loading, hasMore])

  const { Footer, Content } = Layout
  const { Search } = Input

  function handleSearch (value) {
    setQuery(value)
    setPageNumber(1)
  }

  function handleEnter (e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  return (
    <Layout className="layout home">
      <CustomHeader />
      <Content style={{ padding: 24, marginTop: 92 }}>
        <Row gutter={16}>
          <Col span={12} offset={6} style={{ marginBottom: 64 }}>
            <Search placeholder="input search text" onSearch={handleSearch} onPressEnter={handleEnter}/>
          </Col>
        </Row>
        {
          characters.length
            ? (
                <div className='site-card-wrapper'>
                  <Row gutter={16} justify="center" >
                    {
                      characters.map((c, i) => {
                        const number = c.url.split('/')[c.url.split('/').length - 2]

                        return (
                          <Col span={6} key={i}>
                            {
                              characters.length === i + 1
                                ? (
                                  <Link to={`/character/${number}`}>
                                    <Card
                                      className='character'
                                      hoverable
                                      ref={lastCardElementRef}
                                      title={c.name}
                                      bordered={false}
                                      style={{ width: 240, margin: '0 auto 32px' }}
                                      cover={<img alt="example" src="https://via.placeholder.com/240x300.png?text=Star+Wars+Challenge.png" />}
                                    />
                                  </Link>
                                  )
                                : (
                                  <Link to={`/character/${number}`}>
                                    <Card
                                      className='character'
                                      hoverable
                                      title={c.name}
                                      bordered={false}
                                      style={{ width: 240, margin: '0 auto 32px' }}
                                      cover={<img alt="example" src="https://via.placeholder.com/240x300.png?text=Star+Wars+Challenge.png" />}
                                    />
                                  </Link>
                                  )
                            }
                          </Col>
                        )
                      })
                    }
                  </Row>
                </div>
              )
            : (
                <Empty style={{ height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  {
                    error
                      ? 'Something went wrong'
                      : loading
                        ? 'Looking for characters'
                        : !characters.length
                            ? 'There is no results'
                            : null
                  }
                </Empty>
              )
        }
      </Content>
      <Footer style={{ textAlign: 'center' }}>
        Star Wars Challenge ©2022 Created JosePuente
      </Footer>
    </Layout>
  )
}

export default Home
