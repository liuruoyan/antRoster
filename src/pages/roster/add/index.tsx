import {
  Button,
  Card,
  Col,
  DatePicker,
  Form,
  Icon,
  Input,
  Popover,
  Row,
  Select,
  TimePicker,
  InputNumber,
} from 'antd';
import React, { Component } from 'react';

import { Dispatch } from 'redux';
import { FormComponentProps } from 'antd/es/form';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import { connect } from 'dva';
import TableForm from './components/TableForm';
import FooterToolbar from './components/FooterToolbar';
import styles from './style.less';
import Radio from 'antd/es/radio';

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
  // 基本信息
  name: '姓名',
  idType: '证件类型',
  jobGrade: '职级',
  position: '职务',
  job: '职位',
  deptname: '部门',
  empNo: '工号',
  idNumber: '证件号',
  phone: '手机号',
  contractType: '合同类型',
  type: '员工类型',
  hireDate: '入职日期',
  seniority: '历史工龄',
  contractor: '合同公司',
  gender: '性别',
  birthType: '生日类型',
  birthday: '出生日期',
  workLoc: '工作地点',
  contactAddr: '联系地址',
  nationality: '国籍',
  firstName: '名',
  lastName: '姓',
  // 合同信息
  startDate: '当前合同起始日',
  endDate: '当前合同终止日',
  email: '工作邮箱',
  workTel: '工作电话',
  probationEndDay: '试用期到期日',
  probationLength: '试用期（月）',
  // 员工信息
  stageName: '花名',
  idName: '证件姓名',
  nation: '民族',
  accountType:'户口类型',
  accountLoc:'户口所在地',
  nativePlace:'籍贯',
  currentAddr:'居住住址',
  highestEducation:'最高学历',
  politicsStatus: '政治面貌',
  maritalStatus: '婚姻状况',
  bloodType : '血型',
  spouseName: '配偶姓名',
  childName: '孩子姓名',
  qq: 'QQ',
  wechat: '微信',
  personalEmail: '个人邮箱',
  remark: '备注',
  
  // 银行卡信息
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type1: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

interface AdvancedFormProps extends FormComponentProps {
  dispatch: Dispatch<any>;
  submitting: boolean;
}

@connect(({ loading }: { loading: { effects: { [key: string]: boolean } } }) => ({
  submitting: loading.effects['formAdvancedForm/submitAdvancedForm'],
}))
class AdvancedForm extends Component<AdvancedFormProps> {
  state = {
    width: '100%',
  };

  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar, { passive: true });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }

  getErrorInfo = () => {
    const {
      form: { getFieldsError },
    } = this.props;
    const errors = getFieldsError();
    const errorCount = Object.keys(errors).filter(key => errors[key]).length;
    if (!errors || errorCount === 0) {
      return null;
    }
    const scrollToField = (fieldKey: string) => {
      const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
      if (labelNode) {
        labelNode.scrollIntoView(true);
      }
    };
    const errorList = Object.keys(errors).map(key => {
      if (!errors[key]) {
        return null;
      }
      const errorMessage = errors[key] || [];
      return (
        <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
          <Icon type="cross-circle-o" className={styles.errorIcon} />
          <div className={styles.errorMessage}>{errorMessage[0]}</div>
          <div className={styles.errorField}>{fieldLabels[key]}</div>
        </li>
      );
    });
    return (
      <span className={styles.errorIcon}>
        <Popover
          title="表单校验信息"
          content={errorList}
          overlayClassName={styles.errorPopover}
          trigger="click"
          getPopupContainer={(trigger: HTMLElement) => {
            if (trigger && trigger.parentNode) {
              return trigger.parentNode as HTMLElement;
            }
            return trigger;
          }}
        >
          <Icon type="exclamation-circle" />
        </Popover>
        {errorCount}
      </span>
    );
  };

  resizeFooterToolbar = () => {
    requestAnimationFrame(() => {
      const sider = document.querySelectorAll('.ant-layout-sider')[0] as HTMLDivElement;
      if (sider) {
        const width = `calc(100% - ${sider.style.width})`;
        const { width: stateWidth } = this.state;
        if (stateWidth !== width) {
          this.setState({ width });
        }
      }
    });
  };

  validate = () => {
    const {
      form: { validateFieldsAndScroll },
      dispatch,
    } = this.props;
    validateFieldsAndScroll((error, values) => {
      if (!error) {
        // submit the values
        dispatch({
          type: 'formAdvancedForm/submitAdvancedForm',
          payload: values,
        });
      }
    });
  };

  render() {
    const {
      form: { getFieldDecorator },
      submitting,
    } = this.props;
    const { width } = this.state;
    return (
      <>
        <PageHeaderWrapper content="高级表单常见于一次性输入和提交大批量数据的场景。">
          <Card title="基础信息" className={styles.card} bordered={false}>
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.name}>
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: '请输入姓名' }],
                    })(<Input placeholder="请输入姓名" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.idType}>
                    {getFieldDecorator('idType', {
                      rules: [{ required: true, message: '请选择证件类型' }],
                    })(
                      <Select placeholder="请选择证件类型">
                        <Option value="1">居民身份证</Option>
                        <Option value="2">中国护照</Option>
                        <Option value="3">外国护照</Option>
                        <Option value="4">港澳台通行证</Option>
                        <Option value="5">其它</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.idNumber}>
                    {getFieldDecorator('idNumber', {
                      rules: [{ required: true, message: '请输入证件号' }],
                    })(<Input placeholder="请输入证件号" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.jobGrade}>
                    {getFieldDecorator('jobGrade', {
                      rules: [{ required: true, message: '请输入职级' }],
                    })(<Input placeholder="请输入职级" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.position}>
                    {getFieldDecorator('position', {
                      rules: [{ required: true, message: '请输入职务' }],
                    })(<Input placeholder="请输入职务" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.job}>
                    {getFieldDecorator('job', {
                      rules: [{ required: true, message: '请输入职位' }],
                    })(<Input placeholder="请输入职位" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.empNo}>
                    {getFieldDecorator('empNo', {
                      rules: [{ required: true, message: '请输入工号' }],
                    })(<Input placeholder="请输入工号" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.phone}>
                    {getFieldDecorator('phone', {
                      rules: [{ required: true, message: '请输入手机号' }],
                    })(<Input placeholder="请输入手机号" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.contractType}>
                    {getFieldDecorator('contractType', {
                      rules: [{ required: true, message: '请选择合同类型' }],
                    })(
                      <Select placeholder="请选择合同类型">
                        <Option value="1">劳动合同</Option>
                        <Option value="2">劳务合同</Option>
                        <Option value="3">实习合同</Option>
                        <Option value="4">无固定期限劳动合同</Option>
                        <Option value="5">其它合同</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.type}>
                    {getFieldDecorator('contractType', {
                      rules: [{ required: true, message: '请选择员工类型' }],
                    })(
                      <Select placeholder="请选择员工类型">
                        <Option value="1">全职</Option>
                        <Option value="2">兼职</Option>
                        <Option value="3">实习</Option>
                        <Option value="4">外派</Option>
                        <Option value="5">临时工</Option>
                        <Option value="6">退休返聘</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.hireDate}>
                    {getFieldDecorator('hireDate', {
                      rules: [{ required: true, message: '请选择入职日期' }],
                    })(
                      <DatePicker
                        placeholder={'请选择入职日期'}
                        style={{ width: '100%' }}
                      />,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.seniority}>
                    {getFieldDecorator('seniority', {
                      rules: [{ required: false, message: '请输入历史工龄' }],
                    })(<InputNumber min={0} max={100} />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.contractor}>
                    {getFieldDecorator('contractor', {
                      rules: [{ required: true, message: '请输入合同公司' }],
                    })(<Input placeholder="请输入合同公司" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.gender}>
                    {getFieldDecorator('gender', {
                      rules: [{ required: false, message: '请选择性别' }],
                    })(
                      <Select placeholder="请选择性别">
                        <Option value="1">男</Option>
                        <Option value="2">女</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.birthType}>
                    {getFieldDecorator('birthType', {
                      rules: [{ required: false, message: '请选择生日类型' }],
                    })(
                      <Radio.Group>
                        <Radio value={1}>公历</Radio>
                        <Radio value={2}>农历</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.birthday}>
                    {getFieldDecorator('contractor', {
                      rules: [{ required: true, message: '请输入出生日期' }],
                    })(
                      <DatePicker
                        placeholder={'请选择出生日期'}
                        style={{ width: '100%' }}
                      />,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.workLoc}>
                    {getFieldDecorator('workLoc', {
                      rules: [{ required: false, message: '请输入工作地点' }],
                    })(<Input placeholder="请输入工作地点" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.contactAddr}>
                    {getFieldDecorator('contactAddr', {
                      rules: [{ required: false, message: '请输入联系地址' }],
                    })(<Input placeholder="请输入联系地址" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.nationality}>
                    {getFieldDecorator('nationality', {
                      rules: [{ required: true, message: '请输入国籍' }],
                    })(<Input placeholder="请输入国籍" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.firstName}>
                    {getFieldDecorator('firstName', {
                      rules: [{ required: false, message: '请输入名' }],
                    })(<Input placeholder="请输入名" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.lastName}>
                    {getFieldDecorator('lastName', {
                      rules: [{ required: false, message: '请输入姓' }],
                    })(<Input placeholder="请输入姓" />)}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card title="合同信息" className={styles.card} bordered={false}>
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.startDate}>
                    {getFieldDecorator('startDate', {
                      rules: [{ required: true, message: '请输入当前合同起始日' }],
                    })(
                      <DatePicker
                        placeholder={'请输入当前合同起始日'}
                        style={{ width: '100%' }}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.endDate}>
                    {getFieldDecorator('endDate', {
                      rules: [{ required: true, message: '请输入当前合同终止日' }],
                    })(
                      <DatePicker
                        placeholder={'请输入当前合同终止日'}
                        style={{ width: '100%' }}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.email}>
                    {getFieldDecorator('email', {
                      rules: [{ required: true, message: '请输入工作邮箱' }],
                    })(<Input placeholder="请输入工作邮箱" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.workTel}>
                    {getFieldDecorator('workTel', {
                      rules: [{ required: true, message: '请输入工作电话' }],
                    })(<Input placeholder="请输入工作电话" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.probationEndDay}>
                    {getFieldDecorator('probationEndDay', {
                      rules: [{ required: true, message: '请输入试用期到期日' }],
                    })(
                      <DatePicker
                        placeholder={'请输入试用期到期日'}
                        style={{ width: '100%' }}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.probationLength}>
                    {getFieldDecorator('probationLength', {
                      rules: [{ required: false, message: '请输入试用期长度' }],
                    })(<InputNumber min={0} max={100} />)}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card title="仓库信息" className={styles.card} bordered={false}>
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.name}>
                    {getFieldDecorator('name', {
                      rules: [{ required: true, message: '请输入仓库名称' }],
                    })(<Input placeholder="请输入仓库名称" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.url}>
                    {getFieldDecorator('url', {
                      rules: [{ required: true, message: '请选择' }],
                    })(
                      <Input
                        style={{ width: '100%' }}
                        addonBefore="http://"
                        addonAfter=".com"
                        placeholder="请输入"
                      />,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.owner}>
                    {getFieldDecorator('owner', {
                      rules: [{ required: true, message: '请选择管理员' }],
                    })(
                      <Select placeholder="请选择管理员">
                        <Option value="xiao">付晓晓</Option>
                        <Option value="mao">周毛毛</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.approver}>
                    {getFieldDecorator('approver', {
                      rules: [{ required: true, message: '请选择审批员' }],
                    })(
                      <Select placeholder="请选择审批员">
                        <Option value="xiao">付晓晓</Option>
                        <Option value="mao">周毛毛</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.dateRange}>
                    {getFieldDecorator('dateRange', {
                      rules: [{ required: true, message: '请选择生效日期' }],
                    })(
                      <RangePicker
                        placeholder={['开始日期', '结束日期']}
                        style={{ width: '100%' }}
                      />,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.type}>
                    {getFieldDecorator('type', {
                      rules: [{ required: true, message: '请选择仓库类型' }],
                    })(
                      <Select placeholder="请选择仓库类型">
                        <Option value="private">私密</Option>
                        <Option value="public">公开</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card title="任务管理" className={styles.card} bordered={false}>
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.name2}>
                    {getFieldDecorator('name2', {
                      rules: [{ required: true, message: '请输入' }],
                    })(<Input placeholder="请输入" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.url2}>
                    {getFieldDecorator('url2', {
                      rules: [{ required: true, message: '请选择' }],
                    })(<Input placeholder="请输入" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.owner2}>
                    {getFieldDecorator('owner2', {
                      rules: [{ required: true, message: '请选择管理员' }],
                    })(
                      <Select placeholder="请选择管理员">
                        <Option value="xiao">付晓晓</Option>
                        <Option value="mao">周毛毛</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.approver2}>
                    {getFieldDecorator('approver2', {
                      rules: [{ required: true, message: '请选择审批员' }],
                    })(
                      <Select placeholder="请选择审批员">
                        <Option value="xiao">付晓晓</Option>
                        <Option value="mao">周毛毛</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.dateRange2}>
                    {getFieldDecorator('dateRange2', {
                      rules: [{ required: true, message: '请输入' }],
                    })(
                      <TimePicker
                        placeholder="提醒时间"
                        style={{ width: '100%' }}
                        getPopupContainer={trigger => {
                          if (trigger && trigger.parentNode) {
                            return trigger.parentNode as HTMLElement;
                          }
                          return trigger;
                        }}
                      />,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.type2}>
                    {getFieldDecorator('type2', {
                      rules: [{ required: true, message: '请选择仓库类型' }],
                    })(
                      <Select placeholder="请选择仓库类型">
                        <Option value="private">私密</Option>
                        <Option value="public">公开</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card title="成员管理" bordered={false}>
            {getFieldDecorator('members', {
              initialValue: tableData,
            })(<TableForm />)}
          </Card>
        </PageHeaderWrapper>
        <FooterToolbar style={{ width }}>
          {this.getErrorInfo()}
          <Button type="primary" onClick={this.validate} loading={submitting}>
            提交
          </Button>
        </FooterToolbar>
      </>
    );
  }
}

export default Form.create<AdvancedFormProps>()(AdvancedForm);
