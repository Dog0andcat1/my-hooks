import React, { useEffect, useState } from 'react'
import { Button, PageHeader, Modal, Form, Input, message } from 'antd';
import moment from 'moment/moment';
import { ArticleAddApi, ArticleSearchApi, ArticleUpdateApi } from '../request/api.ts';
import '@wangeditor/editor/dist/css/style.css'
import { Editor, Toolbar } from '@wangeditor/editor-for-react'
import { useParams, useNavigate, useLocation } from 'react-router-dom'
export default function Edit() {
  const params = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const [editor, setEditor] = useState(null)
  // 编辑器内容
  const [content, setContent] = useState('')
  const [title, setTitle] = useState('')
  const [subTitle, setSubTitle] = useState('')
  // 工具栏配置
  const toolbarConfig = {}
  // 编辑器配置
  const editorConfig = {
    placeholder: '请输入内容...',
  }
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const showModal = () => {
    setIsModalOpen(true);
  };
  const dealData=(errCode,msg)=>{
    if (errCode === 0) {
      message.success(msg)
      setTimeout(() => {
        navigate('/listlist')
      }, 1500)
    } else {
      console.log(errCode)
      message.error(msg)
    }
    setIsModalOpen(false)
  }
  const handleOk = () => {
    form
      .validateFields()
      .then((values) => {
        // form.resetFields();
        let { title, subTitle } = values
        if (params.id) {
          //更新文章的请求
          ArticleUpdateApi({ title, subTitle, content, id: params.id }).then(res => {
            dealData(res.errCode,res.message)
          })
        }
        else {
          //添加文章的请求
          ArticleAddApi({ title, subTitle, content }).then(res=>{
            dealData(res.errCode,res.message)
            console.log("res:",res)
          })
        }
      })
      .catch(() => {
        return;
      });
  }
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    return () => {
      if (editor == null) return
      editor.destroy()
      setEditor(null)
    }
  }, [editor])
  useEffect(() => {
    if (params.id) {
      ArticleSearchApi({ id: params.id }).then(res => {
        if (res.errCode === 0) {
          let { title, subTitle } = res.data
          setContent(res.data.content)
          setTitle(title)
          setSubTitle(subTitle)
        }
      })
    }
  }, [])
  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={false}
        onBack={params.id ? () => window.history.back() : null}
        title="文章编辑"
        subTitle={"当前日期:" + moment(new Date(0)).format("YYYY-MM-DD")}
        extra={<Button key="1" type="primary" onClick={showModal}>提交文章</Button>}
      >
        <Modal title="填写文章标题" open={isModalOpen} onOk={handleOk} onCancel={handleCancel} okText='提交' cancelText='取消'>
          <Form
            form={form}
            name="basic"
            labelCol={{
              span: 4,
            }}
            wrapperCol={{
              span: 20,
            }}
            initialValues={{
              remember: true,
              title: title,
              subTitle: subTitle,
            }}
            autoComplete="off"
          >
            <Form.Item
              label="标题"
              name="title"
              rules={[
                {
                  required: true,
                  message: '请填写标题',
                },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="副标题"
              name="subTitle"
              rules={[
                {
                  required: true,
                  message: '请输入副标题',
                },
              ]}
            >
              <Input />
            </Form.Item>
          </Form>
        </Modal>
      </PageHeader>
      <div>
        {/* 富文本编辑器 */}
        <>
          <div style={{ height: '40vh', border: '1px solid #ccc', zIndex: 100, padding: '0 20px 20px' }}>
            <Toolbar
              editor={editor}
              defaultConfig={toolbarConfig}
              mode="default"
              style={{ borderBottom: '1px solid #ccc' }}
            />
            <Editor
              defaultConfig={editorConfig}
              value={content}
              onCreated={setEditor}
              onChange={editor => {
                setContent(editor.getHtml())
              }}
              mode="default"
              style={{ height: 'calc(60vh - 212px)', overflowY: 'hidden', }}
            />
          </div>
        </>
      </div>
    </div>
  )
}

