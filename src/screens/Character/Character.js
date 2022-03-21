import React, { useEffect } from 'react'
import { CustomFooter, CustomHeader } from '../../components'
import { Layout, Breadcrumb, Col, Row, Card, Skeleton, Descriptions, Carousel, Image } from 'antd'
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
          <Col span={16}>
            <Card bordered={false}>
              <Breadcrumb>
                <Breadcrumb.Item><a href='/' onClick={() => dispatcher(resetChanracterProps())}>Home</a></Breadcrumb.Item>
                <Breadcrumb.Item>Characters</Breadcrumb.Item>
                <Breadcrumb.Item>{character.name}</Breadcrumb.Item>
              </Breadcrumb>
            </Card>
            <Card className='characters--details'>
              <Row justify='center'>
                <Col>
                  {
                    character.detail.name
                      ? (
                          <Carousel autoplay style={{ width: 640, height: 480, margin: '0 auto' }}>
                            {
                              character.detail.filmNames.map((f, i) => (
                                <div key={i}>
                                  <Image
                                    width={640}
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
              <Row gutter={16} justify="center">
                <Col span={18}>
                {
                  character.detail.name
                    ? (
                        <Descriptions title="Character Info" bordered>
                          <Descriptions.Item label="Name">{character.detail.name}</Descriptions.Item>
                          <Descriptions.Item label="Birth Year">{character.detail.birth_year}</Descriptions.Item>
                          <Descriptions.Item label="Gender">{character.detail.gender}</Descriptions.Item>
                          <Descriptions.Item label="Homeworld" span={3}>{character.detail.homeworldName}</Descriptions.Item>
                          <Descriptions.Item label="Hair Color">{character.detail.hair_color}</Descriptions.Item>
                          <Descriptions.Item label="Skin Color">{character.detail.skin_color}</Descriptions.Item>
                          <Descriptions.Item label="Eye Color">{character.detail.eye_color}</Descriptions.Item>
                          <Descriptions.Item label="Films">
                            {
                              character.detail.filmNames.map((f, i) => <ul key={i}>
                                  <li>{f}</li>
                                </ul>)
                            }
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
