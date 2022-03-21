import React, { useState, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import useInfinity from '../../customHooks/useInfinity'
import { CustomFooter, CustomHeader } from '../../components'
import { changeCharacterProps } from '../../actions/characterActions'
import './home.scss'

import { Layout, Empty, Card, Col, Row, Input } from 'antd'

const Home = () => {
  // HOOKS
  // HOOKS PARA DESPACHAR ACTIONS
  const dispatcher = useDispatch()

  // ESTADOS DE LA BARRA DE BUSQUEDA
  const [query, setQuery] = useState('')
  const [pageNumber, setPageNumber] = useState(1)

  // CUSTOM HOOK PARA Infinity scroll
  const { characters, loading, error, hasMore } = useInfinity(query, pageNumber)

  // HOOKS PARA DISPARAR BUSQUEDA AL VISUALIZAR LA ULTIMA CARD SOLO SI AUN HAY BUSQUEDAS POR REALIZAR
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

  // HOOK PARA NAVIGACION
  const navigate = useNavigate()

  // SUB COMPONENTES DE ANTD
  const { Content } = Layout
  const { Search } = Input

  // ATRAPA EL EVENTO QUE SE DISPARA AL PRESIONAR EN LA LUPA
  function handleSearch (value) {
    setQuery(value)
    setPageNumber(1)
  }

  // ATRAPA EL EVENTO AL PULSAR ENTER EN LA BARRA DE BUSQUEDA
  function handleEnter (e) {
    setQuery(e.target.value)
    setPageNumber(1)
  }

  // ATRAPA EL EVENTO AL SELECCIONAR UNA CARD
  function handleClickCard (number, name) {
    dispatcher(changeCharacterProps({
      id: parseInt(number),
      name: name
    }))
    navigate('/character')
  }

  return (
    <Layout className="layout home">
      <CustomHeader />
      <Content className='home--content' >
        <Row gutter={16} justify="center">
          <Col xs={20} sm={20} md={20} lg={16} xl={16} xxl={14} className="home--content--searchbar">
            <Search
              placeholder="Put here a name."
              onSearch={handleSearch}
              onPressEnter={handleEnter}
              allowClear
              size='large'
              className='home--search'
            />
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
                          <Col xs={24} sm={24} md={12} lg={8} xl={6} key={i}>
                            {
                              characters.length === i + 1
                                ? (
                                  <Card
                                    className='character'
                                    hoverable
                                    ref={lastCardElementRef}
                                    title={c.name}
                                    bordered={false}
                                    cover={<img alt="example" src="https://via.placeholder.com/240x300.png/ddd/000?text=Star+Wars+Challenge.png" />}
                                    onClick={() => handleClickCard(number, c.name)}
                                  />
                                  )
                                : (
                                  <Card
                                    className='character'
                                    hoverable
                                    title={c.name}
                                    bordered={false}
                                    cover={<img alt="example" src="https://via.placeholder.com/240x300.png/ddd/000?text=Star+Wars+Challenge.png" />}
                                    onClick={() => handleClickCard(number, c.name)}
                                  />
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
                <Empty className='empty'>
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
      <CustomFooter />
    </Layout>
  )
}

export default Home
