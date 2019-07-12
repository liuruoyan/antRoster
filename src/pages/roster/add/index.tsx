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
import TextArea from 'antd/lib/input/TextArea';

const { Option } = Select;
const { RangePicker } = DatePicker;

const fieldLabels = {
  // 基本信息
  name: '姓名',
  'idType.id': '证件类型',
  jobGrade: '职级',
  position: '职务',
  job: '职位',
  deptname: '部门',
  empNo: '工号',
  idNumber: '证件号',
  phone: '手机号',
  'contractType.id': '合同类型',
  'type.id': '员工类型',
  hireDate: '入职日期',
  seniority: '历史工龄',
  contractor: '合同公司',
  'gender.id': '性别',
  birthType: '生日类型',
  birthday: '出生日期',
  workLoc: '工作地点',
  contactAddr: '联系地址',
  nationality: '国籍',
  firstName: '名',
  lastName: '姓',
  // 合同信息
  'contracts[0].startDate': '当前合同起始日',
  'contracts[0].endDate': '当前合同终止日',
  'contracts[0].email': '工作邮箱',
  'contracts[0].workTel': '工作电话',
  'contracts[0].probationEndDay': '试用期到期日',
  'contracts[0].probationLength': '试用期（月）',
  // 员工信息
  'personals[0].stageName': '花名',
  'personals[0].idName': '证件姓名',
  'personals[0].nation': '民族',
  'personals[0].accountType.id':'户口类型',
  'personals[0].accountLoc':'户口所在地',
  'personals[0].nativePlace':'籍贯',
  'personals[0].currentAddr':'居住住址',
  'personals[0].highestEducation.id':'最高学历',
  'personals[0].politicsStatus.id': '政治面貌',
  'personals[0].maritalStatus.id': '婚姻状况',
  'personals[0].bloodType' : '血型',
  'personals[0].spouseName': '配偶姓名',
  'personals[0].childName': '孩子姓名',
  'personals[0].qq': 'QQ',
  'personals[0].wechat': '微信',
  'personals[0].personalEmail': '个人邮箱',
  'personals[0].emergencyContactName': '紧急联系人姓名',
  'personals[0].emergencyContactPhone': '紧急联系人电话',
  'personals[0].remark': '备注',
  // 银行卡信息
 
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
                  <Form.Item label={fieldLabels['idType.id']}>
                    {getFieldDecorator('idType.id', {
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
                      rules: [{ required: false, message: '请输入职级' }],
                    })(<Input placeholder="请输入职级" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels.position}>
                    {getFieldDecorator('position', {
                      rules: [{ required: false, message: '请输入职务' }],
                    })(<Input placeholder="请输入职务" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels.job}>
                    {getFieldDecorator('job', {
                      rules: [{ required: false, message: '请输入职位' }],
                    })(<Input placeholder="请输入职位" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.empNo}>
                    {getFieldDecorator('empNo', {
                      rules: [{ required: false, message: '请输入工号' }],
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
                  <Form.Item label={fieldLabels['contractType.id']}>
                    {getFieldDecorator('contractType.id', {
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
                  <Form.Item label={fieldLabels['type.id']}>
                    {getFieldDecorator('type.id', {
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
                      rules: [{ required: false, message: '请输入合同公司' }],
                    })(<Input placeholder="请输入合同公司" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels['gender.id']}>
                    {getFieldDecorator('gender.id', {
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
                        <Radio value={'CALENDAR'}>公历</Radio>
                        <Radio value={'LUNAR'}>农历</Radio>
                      </Radio.Group>
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels.birthday}>
                    {getFieldDecorator('birthday', {
                      rules: [{ required: false, message: '请输入出生日期' }],
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
                      rules: [{ required: false, message: '请输入国籍' }],
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
                  <Form.Item label={fieldLabels['contracts[0].startDate']}>
                    {getFieldDecorator('contracts[0].startDate', {
                      rules: [{ required: false, message: '请输入当前合同起始日' }],
                    })(
                      <DatePicker
                        placeholder={'请输入当前合同起始日'}
                        style={{ width: '100%' }}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels['contracts[0].endDate']}>
                    {getFieldDecorator('contracts[0].endDate', {
                      rules: [{ required: false, message: '请输入当前合同终止日' }],
                    })(
                      <DatePicker
                        placeholder={'请输入当前合同终止日'}
                        style={{ width: '100%' }}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels['contracts[0].email']}>
                    {getFieldDecorator('contracts[0].email', {
                      rules: [{ required: false, message: '请输入工作邮箱' }],
                    })(<Input placeholder="请输入工作邮箱" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels['contracts[0].workTel']}>
                    {getFieldDecorator('contracts[0].workTel', {
                      rules: [{ required: false, message: '请输入工作电话' }],
                    })(<Input placeholder="请输入工作电话" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels['contracts[0].probationEndDay']}>
                    {getFieldDecorator('contracts[0].probationEndDay', {
                      rules: [{ required: false, message: '请输入试用期到期日' }],
                    })(
                      <DatePicker
                        placeholder={'请输入试用期到期日'}
                        style={{ width: '100%' }}
                      />
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels['contracts[0].probationLength']}>
                    {getFieldDecorator('contracts[0].probationLength', {
                      rules: [{ required: false, message: '请输入试用期长度' }],
                    })(<InputNumber min={0} max={100} />)}
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Card>
          <Card title="员工信息" className={styles.card} bordered={false}>
            <Form layout="vertical" hideRequiredMark>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].stageName']}>
                    {getFieldDecorator('personals[0].stageName', {
                      rules: [{ required: false, message: '请输入花名' }],
                    })(<Input placeholder="请输入花名" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].idName']}>
                    {getFieldDecorator('personals[0].idName', {
                      rules: [{ required: false, message: '请输入证件姓名' }],
                    })(<Input placeholder="请输入证件姓名" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].nation']}>
                    {getFieldDecorator('personals[0].nation', {
                      rules: [{ required: false, message: '请选择民族' }],
                    })(
                      <Select placeholder="请选择民族">
                        <Option value="汉族">汉族</Option>
                        <Option value="蒙古族">蒙古族</Option>
                        <Option value="回族">回族</Option>
                        <Option value="藏族">藏族</Option>
                        <Option value="维吾尔族">维吾尔族</Option>
                        <Option value="其他民族">其他民族</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].accountType.id']}>
                    {getFieldDecorator('personals[0].accountType.id', {
                      rules: [{ required: false, message: '请选择户口类型' }],
                    })(
                      <Select placeholder="请选择户口类型">
                        <Option value="1">城镇</Option>
                        <Option value="2">非城镇</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].accountLoc']}>
                    {getFieldDecorator('personals[0].accountLoc', {
                      rules: [{ required: false, message: '请输入户口所在地' }],
                    })(<Input placeholder="请输入户口所在地" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].nativePlace']}>
                    {getFieldDecorator('personals[0].nativePlace', {
                      rules: [{ required: false, message: '请输入籍贯' }],
                    })(<Input placeholder="请输入籍贯" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].currentAddr']}>
                    {getFieldDecorator('personals[0].currentAddr', {
                      rules: [{ required: false, message: '请输入居住地址' }],
                    })(<Input placeholder="请输入居住地址" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].highestEducation.id']}>
                    {getFieldDecorator('personals[0].highestEducation.id', {
                      rules: [{ required: false, message: '请选择最高学历' }],
                    })(
                      <Select placeholder="请选择最高学历">
                        <Option value="1">博士</Option>
                        <Option value="2">硕士/MBA/EMBA</Option>
                        <Option value="3">本科</Option>
                        <Option value="4">大专/高职</Option>
                        <Option value="5">高中/中专/中技</Option>
                        <Option value="6">初中</Option>
                        <Option value="7">小学</Option>
                        <Option value="8">其它</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item label={fieldLabels['personals[0].politicsStatus.id']}>
                    {getFieldDecorator('personals[0].politicsStatus.id', {
                      rules: [{ required: false, message: '请选择政治面貌' }],
                    })(
                      <Select placeholder="请选择政治面貌">
                        <Option value="1">党员</Option>
                        <Option value="2">预备党员</Option>
                        <Option value="3">民主党派</Option>
                        <Option value="4">团员</Option>
                        <Option value="5">群众</Option>
                        <Option value="6">其它</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].maritalStatus.id']}>
                    {getFieldDecorator('personals[0].maritalStatus.id', {
                      rules: [{ required: false, message: '请选择婚姻状况' }],
                    })(
                      <Select placeholder="请选择婚姻状况">
                        <Option value="1">未婚</Option>
                        <Option value="2">已婚</Option>
                        <Option value="3">已婚已孕</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].spouseName']}>
                    {getFieldDecorator('personals[0].spouseName', {
                      rules: [{ required: false, message: '请输入配偶姓名' }],
                    })(<Input placeholder="请输入配偶姓名" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].childName']}>
                    {getFieldDecorator('personals[0].childName', {
                      rules: [{ required: false, message: '请输入孩子姓名' }],
                    })(<Input placeholder="请输入孩子姓名" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].bloodType']}>
                    {getFieldDecorator('personals[0].bloodType', {
                      rules: [{ required: false, message: '请选择血型' }],
                    })(
                      <Select placeholder="请选择血型">
                        <Option value="A">A</Option>
                        <Option value="B">B</Option>
                        <Option value="O">O</Option>
                        <Option value="AB">AB</Option>
                      </Select>,
                    )}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].qq']}>
                    {getFieldDecorator('personals[0].qq', {
                      rules: [{ required: false, message: '请输入qq' }],
                    })(<Input placeholder="请输入qq" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].wechat']}>
                    {getFieldDecorator('personals[0].wechat', {
                      rules: [{ required: false, message: '请输入微信' }],
                    })(<Input placeholder="请输入微信" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].personalEmail']}>
                    {getFieldDecorator('personals[0].personalEmail', {
                      rules: [{ required: false, message: '请输入个人邮箱' }],
                    })(<Input placeholder="请输入个人邮箱" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].emergencyContactName']}>
                    {getFieldDecorator('personals[0].emergencyContactName', {
                      rules: [{ required: false, message: '请输入紧急联系人姓名' }],
                    })(<Input placeholder="请输入紧急联系人姓名" />)}
                  </Form.Item>
                </Col>
                <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].emergencyContactPhone']}>
                    {getFieldDecorator('personals[0].emergencyContactPhone', {
                      rules: [{ required: false, message: '请输入紧急联系人电话' }],
                    })(<Input placeholder="请输入紧急联系人电话" />)}
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col lg={6} md={12} sm={24}>
                  <Form.Item label={fieldLabels['personals[0].remark']}>
                    {getFieldDecorator('personals[0].remark', {
                      rules: [{ required: false, message: '请输入备注' }],
                    })(<TextArea
                      placeholder="请输入备注"
                      autosize={{ minRows: 2, maxRows: 6 }}
                    />)}
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
