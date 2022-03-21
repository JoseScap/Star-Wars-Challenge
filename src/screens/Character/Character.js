import React, { useEffect } from 'react'
import { CustomFooter, CustomHeader } from '../../components'
import { Layout, Breadcrumb, Col, Row, Card, Skeleton, Descriptions, Carousel, Image, Divider } from 'antd'
import './character.scss'
import { getCharacterData, resetChanracterProps } from './../../actions/characterActions'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

function Character () {
  // HOOKS
  // INFO DEL STORE
  const { character } = useSelector(store => store)

  // HOOKS PARA DESPACHAR EVENTOS
  const dispatcher = useDispatch()

  // HOOKS PARA NAVEGAR
  const navigate = useNavigate()

  // PRIMER RENDER
  useEffect(() => {
    // SI EL ID NO ES VALIDO O NO EXISTE VOLVEMOS AL HOME
    if (!character.id || character.id > 82) navigate('/')

    // EN CASO DE SER VALIDO BUSCAMOS SU INFO
    dispatcher(getCharacterData(character.id))
  }, [])

  const { Content } = Layout

  return (
    <Layout className='layout characters'>
      <CustomHeader />
      <Content className='characters--content'>
        <Row gutter={16} justify="center">
          <Col xs={24} sm={24} md={20} lg={16}>
            <Card bordered={false} style={{ width: '100%' }}>
              <Breadcrumb>
                <Breadcrumb.Item><a href='/' onClick={() => dispatcher(resetChanracterProps())}>Home</a></Breadcrumb.Item>
                <Breadcrumb.Item>Characters</Breadcrumb.Item>
                <Breadcrumb.Item>{character.name}</Breadcrumb.Item>
              </Breadcrumb>
            </Card>
            <Card className='characters--details'>
              <Row justify='center'>
                <Col xs={24} sm={24} md={24} lg={24}>
                  {
                    character.detail.name
                      ? (
                          <Carousel autoplay style={{ width: '100%', maxWidth: 640, margin: '0 auto' }}>
                            {
                              character.detail.filmNames.map((f, i) => (
                                <div key={i}>
                                  <Image
                                    src={`https://via.placeholder.com/640x480.png/ddd/000?text=${character.detail.name.replaceAll(' ', '+')}+in+${f.replaceAll(' ', '+')}.png`}
                                  />
                                </div>
                              ))
                            }
                          </Carousel>
                        )
                      : (
                        <Skeleton.Image style={{ width: 640, height: 480, margin: '0 auto' }}/>
                        )
                  }
                </Col>
              </Row>
              <Divider />
              <Row gutter={16} justify="center">
                <Col xs={24} sm={24} md={24} lg={24}>
                {
                  character.detail.name
                    ? (
                        <Descriptions title="Character Info" bordered column={{ xxl: 3, xl: 3, lg: 3, md: 2, sm: 1, xs: 1 }}>
                          <Descriptions.Item label="Name">{character.detail.name}</Descriptions.Item>
                          <Descriptions.Item label="Birth Year">{character.detail.birth_year}</Descriptions.Item>
                          <Descriptions.Item label="Gender">{character.detail.gender}</Descriptions.Item>
                          <Descriptions.Item label="Homeworld" span={3}>{character.detail.homeworldName}</Descriptions.Item>
                          <Descriptions.Item label="Hair Color">{character.detail.hair_color}</Descriptions.Item>
                          <Descriptions.Item label="Skin Color">{character.detail.skin_color}</Descriptions.Item>
                          <Descriptions.Item label="Eye Color">{character.detail.eye_color}</Descriptions.Item>
                          <Descriptions.Item label="Films">
                            <ul style={{ margin: 0, padding: 0 }}>
                              {
                                character.detail.filmNames.map((f, i) => <li key={i} style={{ marginBottom: 8 }}>{f}</li>)
                              }
                            </ul>
                          </Descriptions.Item>
                        </Descriptions>
                      )
                    : (
                        <Skeleton active />
                      )
                }
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Content>
      <CustomFooter />
    </Layout>
  )
}

export default Character
