<template>
  <div>
    <div class="white-background">
      <div class="row justify-content-between align-items-center">
        <div class="col-md-2">
          <el-select v-model="cycle" @change="handleFilter">
            <el-option value="" label="Tất cả"></el-option>
            <el-option
              v-for="item in cycleCompany"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </div>
        <div class="col-md-6">
          <div class="row align-items-center">
            <div class="col-md-8">
              <div class="position-relative">
                <input :placeholder="$t('checkinPage.placeholderSearch')" class="input-primary medium" v-model="description" @keyup="handleSearch"/>
                <font-awesome-icon :icon="['fas', 'search']" class="icon-search"/>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4 text-right">
          <a class="btn btn-secondary btn-switchLayout mr-3" @click="handleSwitchLayout">
            <font-awesome-icon :icon="['fas', 'th-large']" class="switch-icon" :class="{ show : switchLayout == true}" />
            <font-awesome-icon :icon="['fas', 'th-list']" class="switch-icon" :class="{ show : switchLayout == false}"/>
          </a>
          <button class="btn btn-primary btn-medium" @click="openCreateFeedback">Tạo phản hồi</button>
        </div>
      </div>
    </div>
    <div class="main container-fluid">
      <div class="row">
        <div class="col-md-6">
          <div class="wrapper-target">
            <div class="title">Mục tiêu toàn công ty</div>
            <div class="content">
              <PieChart/>
            </div>
          </div>
        </div>
        <div class="col-md-6">
          <div class="wrapper-target">
            <div class="title">Mục tiêu của {{ currentUser.fullName  }}</div>
            <div class="content">
              <PieChart/>
            </div>
          </div>
        </div>
      </div>
      <div class="d-flex justify-content-end align-items-center">
        <el-pagination  @size-change="handleSizeChange"
                        @current-change="handleCurrentChange"
                        background
                        :current-page.sync="searchRequest.pageIndex"
                        layout="sizes, prev, pager, next , jumper"
                        :page-sizes="[5, 10, 20]" 
                        :total="goalList.total">
        </el-pagination>
      </div>
      <div class="row mt-4">
          <div :class="switchLayout == false ? 'col-lg-12' : 'col-lg-3 col-md-6 col-12'" v-for="(item, index) in goalList" :key="index">
            <div class="card mb-4">
              <div class="card-body">
                <div class="row">
                  <div class="col-md-12 d-flex flex-wrap align-items-center justify-content-between">
                    <div :class="switchLayout == false ? 'd-flex align-items-center' : 'col-12 d-flex align-items-center px-0 mb-4'">
                      <div class="group-avatar">
                        <div v-if="!item.avatar" class="avatar-without-img">{{item.convertName}}</div>
                        <div v-else class="avatar-with-img" :style="{ backgroundImage: `url(${item && item.avatar ? item.avatar : ''})` }"></div>
                      </div>
                      <div class="ml-2 mr-2">
                        <div class="name-avatar">{{ item && item.fullName ? item.fullName : '' }}</div>
                        <div class="created-date">{{ item.createdAt.slice(0,10) }}</div>
                      </div>
                      <button class="btn btn-primary" v-if="item.userId != loggedUserId" @click="handleCreateSubGoal(item)">
                        <span class="ml-2">Tạo mục tiêu con</span>
                      </button>
                    </div>
                    <div :class="switchLayout == false ? 'd-flex align-items-center' : 'col-12 d-flex justify-content-between align-items-center px-0'">
                      <a class="relative-group-icon mr-4" @click="handleModalRelation(item.id)">
                        <div class="number">{{ item.relation.length }}</div>
                        <font-awesome-icon :icon="['fas', 'project-diagram']" class="icon diagram" />
                      </a>
                      <a class="relative-group-icon mr-4" @click="handleModalViewFeedback(item.id)">
                        <div class="number star" :class="{ danger: item.star < 0 }">{{ item.star }}</div>
                        <div>
                          <font-awesome-icon :icon="['fas', 'star']" class="icon star" :class="{ danger: item.star < 0 }"/>
                        </div>
                      </a>
                      <a class="relative-group-icon" @click="handleModalViewFeedback(item.id)">
                        <div class="number">{{ item.reply.length }}</div>
                        <font-awesome-icon :icon="['far', 'comment-dots']" class="icon" />
                      </a>
                    </div>
                  </div>
                </div>
                <hr class=""/>
                <div class="row">
                  <div :class="switchLayout == false ? 'col-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                    <div class="title">Mục tiêu</div>
                    <div class="content">{{ item.name ? item.name : ''}}</div>
                  </div>
                  <div :class="switchLayout == false ? 'col-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid grid d-flex flex-column justify-content-center'">
                    <div class="title">Kết quả chính</div>
                    <div class="content">
                      <a href="javascript:;" class="result" @click="handleModalViewMainResult(item.id)">{{item.mainResult && item.mainResult.length ? item.mainResult.length : 0}} kết quả</a>
                    </div>
                  </div>
                  <div :class="switchLayout == false ? 'col-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                    <div class="title">Tiến độ</div>
                    <div class="content">
                      <ProgressAdvance :type="item.typeProgress" :value="item.progressPercent" />
                    </div>
                  </div>
                  <div :class="switchLayout == false ? 'col-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                    <div class="title">Thay đổi</div>
                    <div class="content">
                      <CompareValue :type="item.typeProgress" :value="item.compare" />
                    </div>
                  </div>
                  <div :class="switchLayout == false ? 'col-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                    <div class="title">Mức độ tự tin</div>
                    <div class="content">{{ item.confidenceLevel ?  commonData.confidenceLevelDisplay[item.confidenceLevel] : ''}}</div>
                  </div>
                  <div :class="switchLayout == false ? 'col-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                    <div class="title">Trạng thái</div>
                    <div class="content">
                      <div class="tag" :class="`${commonData.goalStatusDisplay[item.status].color}`">
                        {{ item.status ?  commonData.goalStatusDisplay[item.status].name : ''}}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="row" v-if="item.card.length">
                  <div class="col-12">
                    <el-collapse class="sub-goal">
                      <el-collapse-item>
                        <div class="text-primary" slot="title">
                          <span class="mr-2">Các liên kết</span>
                          <span>({{ item.card.length + ' ' + 'liên kết' }})</span>
                        </div>
                        <div class="col-lg-12" v-for="(card, index) in item.card" :key="index">
                          <div class="card mb-4">
                            <div class="card-body">
                              <div class="row">
                                <div :class="switchLayout == false ? 'col-md-4 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                                  <div class="title">Tên liên kết</div>
                                  <div class="content">{{ card.title ? card.title : 'Không có tên liên kết' }}</div>
                                </div>
                                <div :class="switchLayout == false ? 'col-md-3 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                                  <div class="title">Người phụ trách</div>
                                  <div class="d-flex align-items-center flex-wrap">
                                    <div class="content mr-2" v-for="(assignee, index) in card.assignees" :key="index">
                                      <el-tooltip class="item" effect="dark" :content="assignee.fullName" placement="top-start">
                                        <div class="group-avatar">
                                          <div class="avatar-circle original">
                                            <div class="avatar-with-img" :style="{ backgroundImage: `url(${card && card.assignees ? assignee.avatar : ''})` }"></div>
                                          </div>
                                        </div>
                                      </el-tooltip>
                                    </div>
                                  </div>
                                </div>
                                <div :class="switchLayout == false ? 'col-md-3 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                                  <div class="title">Ngày hết hạn</div>
                                  <div class="content">{{ card.dueDate ? card.dueDate.slice(0, 10) : 'Không có thông tin' }}</div>
                                </div>
                                <div :class="switchLayout == false ? 'col-md-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                                  <el-tooltip class="item" effect="dark" content="Chuyển tới quản lý công việc" placement="top-start">
                                    <a class="d-block text-primary mr-3" href="javascript:;" @click="redirectToCardDetail(card)">
                                      <font-awesome-icon :icon="['fas', 'directions']" />
                                    </a>
                                  </el-tooltip>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </div>
                <div class="row" v-if="item.subGoal.length">
                  <div class="col-12">
                    <el-collapse class="sub-goal">
                      <el-collapse-item>
                        <div class="text-primary" slot="title">
                          <span class="mr-2">Các mục tiêu con</span>
                          <span>({{ item.subGoal.length + ' ' + 'mục tiêu con' }})</span>
                        </div>
                        <div class="col-lg-12" v-for="(sub, index) in item.subGoal" :key="index">
                          <div class="card mb-4">
                            <div class="card-body">
                              <div class="row">
                                <div :class="switchLayout == false ? 'col-md-3 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                                <div class="title d-flex align-items-center">
                                    <div class="mr-2">Tên mục tiêu con</div>
                                    <div v-if="item.userId === sub.userId">
                                      <el-tooltip class="item" effect="dark" content="Xem kết quả check-in" placement="top-start">
                                        <a href="javascript:;" class="text-primary medium mr-2" :disabled="sub.checkIn.length === 0" @click="openModalViewCheckInSubGoal(sub)">
                                          <font-awesome-icon :icon="['fas', 'calendar-check']" />
                                        </a>
                                      </el-tooltip>
                                      <el-tooltip class="item" effect="dark" content="Xem kết quả chính" placement="top-start">
                                        <a href="javascript:;" class="text-primary medium" :disabled="sub.mainResult.length === 0" @click="openModalViewMainResultSubGoal(sub)">
                                          <font-awesome-icon :icon="['fas', 'eye']" />
                                        </a>
                                      </el-tooltip>
                                    </div>
                                    <div v-else>
                                      <el-tooltip class="item" effect="dark" content="Check-in mục tiêu con" placement="top-start" v-if="item.userId != loggedUserId">
                                        <a href="javascript:;" class="text-primary medium mr-2" @click="openModalCheckInHigher(sub)">
                                          <font-awesome-icon :icon="['fas', 'check-double']" />
                                        </a>
                                      </el-tooltip>
                                      <el-tooltip class="item" effect="dark" content="Xem kết quả check-in" placement="top-start">
                                        <a href="javascript:;" class="text-primary medium" @click="openModalViewHigher(sub.checkIn)">
                                          <font-awesome-icon :icon="['fas', 'eye']" />
                                        </a>
                                      </el-tooltip>
                                    </div>
                                  </div>
                                  <div class="content">{{ sub.name ? sub.name : 'Không có tên mục tiêu' }}</div>
                                </div>
                                <div :class="switchLayout == false ? 'col-md-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                                  <div class="title">Mức độ tự tin</div>
                                  <div class="content">{{ sub.confidenceLevel ? commonData.confidenceLevelDisplay[sub.confidenceLevel] : '' }}</div>
                                </div>
                                <div :class="switchLayout == false ? 'col-md-3 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                                  <div class="title">Tiến độ</div>
                                  <div class="content"> 
                                    <div class="content">
                                      <ProgressAdvance :type="sub.typeProgress" :value="sub.progressPercent" />
                                    </div>
                                  </div>
                                </div>
                                <div :class="switchLayout == false ? 'col-md-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                                  <div class="title">Trạng thái</div>
                                  <div class="content"> 
                                    <div :class="`tag ${commonData.goalStatusDisplay[sub.status].color}`">{{ sub.status ? commonData.goalStatusDisplay[sub.status].name : '' }}</div>
                                  </div>
                                </div>
                                <div :class="switchLayout == false ? 'col-md-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                                  <div class="title">Người tạo</div>
                                  <el-tooltip class="item" effect="dark" :content="feedbackUser.find(x => x.id === sub.userId).fullName" placement="top-start">
                                    <div class="avatar-circle board">
                                      <div class="inside img-thumbnail" :style="{ backgroundImage: `url(${feedbackUser ? feedbackUser.find(x => x.id === sub.userId ).avatar : ''})` }"></div>
                                    </div>
                                  </el-tooltip>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </el-collapse-item>
                    </el-collapse>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>

    <el-dialog title="Form phản hồi, ghi nhận" :visible.sync="modalFeedback" class="transition-box-center" width="80%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="modal-body">
        <form data-vv-scope="validateFeedback">
          <div :class="`row my-2 ${errors.has('validateFeedback.replyType') ? 'has-error' : ''}`">
            <div class="col-md-4 title">Loại phản hồi</div>
            <div class="col-md-8">
              <el-select v-model="formData.type" placeholder="Chọn loại phản hồi" class="w-100" name="replyType" v-validate="'required'">
                <el-option
                  v-for="(item, index) in commonData.replyType"
                  :key="index"
                  :label="item.name"
                  :value="item.code">
                </el-option>
              </el-select>
              <div v-if="errors.has('validateFeedback.replyType')" class="my-3 text-danger">Yêu cầu nhập loại phản hồi</div>
            </div>
          </div>
          <div :class="`row my-2 ${errors.has('validateFeedback.receiveUserId') ? 'has-error' : ''}`">
            <div class="col-md-4 title">Người được phản hồi</div>
            <div class="col-md-8">
              <el-select v-model="formData.receiveUserId" placeholder="Chọn người được phản hồi" class="w-100" name="receiveUserId" v-validate="'required'">
                <el-option
                  v-for="item in feedbackUser"
                  :key="item.id"
                  :label="item.fullName"
                  :value="item.id">
                </el-option>
              </el-select>
              <div v-if="errors.has('validateFeedback.receiveUserId')" class="my-3 text-danger">Yêu cầu nhập người được phản hồi</div>
            </div>
          </div>
          <div :class="`row my-2 ${errors.has('validateFeedback.cycleId') ? 'has-error' : ''}`">
            <div class="col-md-4 title">Chu kỳ</div>
            <div class="col-md-8">
              <el-select v-model="cycleId" placeholder="Chọn chu kỳ" class="w-100" name="cycleId" v-validate="'required'">
                <el-option
                  v-for="item in cycleCompany"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <div v-if="errors.has('validateFeedback.cycleId')" class="my-3 text-danger">Yêu cầu nhập chu kỳ</div>
            </div>
          </div>
          <div :class="`row my-2 ${errors.has('validateFeedback.goalId') ? 'has-error' : ''}`">
            <div class="col-md-4 title">Mục tiêu</div>
            <div class="col-md-8">
              <el-select v-model="formData.goalId" placeholder="Chọn mục tiêu" name="goalId" class="w-100" v-validate="'required'">
                <el-option
                  v-for="item in goalUser"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <div v-if="errors.has('validateFeedback.cycleId')" class="my-3 text-danger">Yêu cầu nhập mục tiêu</div>
            </div>
          </div>
          <div :class="`row my-2 ${errors.has('validateFeedback.evaluativeCriteriaId') ? 'has-error' : ''}`">
            <div class="col-md-4 title">Tiêu chí</div>
            <div class="col-md-8">
              <el-select v-model="formData.evaluativeCriteriaId" placeholder="Chọn tiêu chí" name="evaluativeCriteriaId" class="w-100" v-validate="'required'">
                <el-option
                  v-for="item in evaluateUser"
                  :key="item.id"
                  :label="item.content"
                  :value="item.id">
                </el-option>
              </el-select>
               <div v-if="errors.has('validateFeedback.evaluativeCriteriaId')" class="my-3 text-danger">Yêu cầu nhập tiêu chí</div>
            </div>
          </div>
          <div class="row my-2">
            <div class="col-md-4 title">Nội dung</div>
            <div class="col-md-8">
              <textarea rows="10" class="w-100" v-model="formData.content" placeholder="Nhập nội dung"></textarea>
            </div>
          </div>
        </form>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-standard btn-medium mr-3" @click="modalFeedback = false">
          Hủy
        </button>
        <button class="btn btn-primary btn-medium" @click="submitResponse">
          Xác nhận
        </button>
      </span>
    </el-dialog>

    <el-dialog title="Xem phản hồi, ghi nhận" :visible.sync="modalViewFeedback" class="transition-box-center" width="80%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="table-responsive">
        <table class="table table-hover">
          <thead class="thead-light">
            <tr>
              <th>Người phản hồi</th>
              <th>Loại phản hồi</th>
              <th>Ngày phản hồi</th>
              <th>Nội dung phản hồi</th>
              <th>Số sao</th>
            </tr>
          </thead>
          <tbody v-for="(item, index) in replyData" :key="index">
            <tr v-for="(text, key) in item.reply" :key="key"> 
              <td>{{ feedbackUser.find(x => { return x.id === text.userId}).fullName }}</td>
              <td>{{ text.type ? commonData.replyTypeDisplay[text.type] : '' }}</td>
              <td>{{ text.createdAt.slice(0, 10) }}</td>
              <td>{{ text.content ? text.content : 'Không có nội dung' }}</td>
              <td>
                <a class="relative-group-icon">
                  <span class="mr-2"><font-awesome-icon :icon="['fas', 'star']" class="icon star" /></span>
                  <span class="number">{{ evaluateCompany.find(x => { return x.id === text.evaluativeCriteriaId}).star }}</span>
                </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-dialog>

    <el-dialog title="Kết quả chính" :visible.sync="modalViewMainResult" class="transition-box-center" width="80%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="table-responsive">
        <table class="table">
          <thead class="thead-light">
            <tr>
              <th>Kết quả chính</th>
              <th>Tiến độ</th>
              <th>Link kế hoạch</th>
              <th>Link kết quả</th>
              <th></th>
            </tr>
          </thead>
         <tbody v-for="(item, index) in mainResultData" :key="index">
            <tr v-for="(result, key) in item.mainResult" :key="key"> 
              <td>
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <div v-if="result && result.title" class="d-flex align-items-center">
                      <div class="mr-2">{{ result.title }}</div>
                      <el-tooltip class="item" effect="dark" content="Xem kết quả chính" placement="top-start">
                        <a href="javascript:;" @click="openModalReadMainResult(result)"><font-awesome-icon :icon="['fas', 'eye']" class="text-primary"/></a>
                      </el-tooltip>
                    </div>
                    <div v-else class="text-disabled">Không có nội dung</div>
                  </div>
                </div>
              </td>
              <td>
                <ProgressAdvance :type="result.typeProgress" :value="result.targetPercent" />
              </td>
              <td>
                <div v-if="result && result.planLink">{{ result.planLink }}</div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </td>
              <td>
                <div v-if="result && result.resultLink">{{ result.resultLink }}</div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </el-dialog>

    <el-dialog title="Xem check-in kết quả chính" :visible.sync="modalReadMainResult" class="transition-box-center" width="60%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <div class="card mb-3" v-for="item in checkInMainResultData" :key="item.id">
          <div class="card-body">
            <div class="row">
              <label class="col-6 font-weight-bold">Kết quả</label>
              <div class="col-6">
                <div v-if="item && item.result">
                  {{ item.result }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">Mức độ tự tin</label>
              <div class="col-6">{{ commonData.confidenceLevelDisplay[item.confidenceLevel] }}</div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">Tiến độ</label>
              <div class="col-6">
                <ProgressAdvance :type="item.typeProgress" :value="item.currentProgress" />
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">Ngày tạo</label>
              <div class="col-6">
                <div v-if="item && item.createdAt">
                  {{ item.createdAt.slice(0, 10) }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">{{ questionsCompany.find(x => x.orderNo === 1).question }}</label>
              <div class="col-6">
                <div v-if="item && item.answerFirst">
                  {{ item.answerFirst }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">{{ questionsCompany.find(x => x.orderNo === 2).question }}</label>
              <div class="col-6">
                <div v-if="item && item.answerSecond">
                  {{ item.answerSecond }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">{{ questionsCompany.find(x => x.orderNo === 3).question }}</label>
              <div class="col-6">
                <div v-if="item && item.answerThird">
                  {{ item.answerThird }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">{{ questionsCompany.find(x => x.orderNo === 4).question }}</label>
              <div class="col-6">
                <div v-if="item && item.answerFourth">
                  {{ item.answerFourth }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="Form mục tiêu liên quan" :visible.sync="modalRelation" class="transition-box-center" width="80%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div v-for="(item, index) in relationData" :key="index">
        <div v-for="(relate, key) in item.relation" :key="key" class="card mb-4">
          <div class="card-body">
            <div class="row align-items-center justify-content-between" v-if="relate.type == 'previousStep'">
              <div class="col-md-4">
                <div>
                  <span class="mr-2">Mục tiêu:</span>
                  <span class="font-weight-bold">{{ goalOfCompany.find(x => { return x.id === relate.goalId}).name }}</span>
                </div>
                <div>
                  <span class="mr-2">Tiến độ:</span>
                  <span>{{ goalOfCompany.find(x => { return x.id === relate.goalId}).progressPercent }}%</span>
                </div>
                <div class="d-flex justify-content-start">
                  <span class="mr-2">Trạng thái:</span>
                  <span>
                    <div class="tag" :class="`${commonData.goalStatusDisplay[goalOfCompany.find(x => { return x.id === relate.goalId}).status].color}`">
                      {{ goalOfCompany.find(x => { return x.id === relate.goalId}) ?  commonData.goalStatusDisplay[goalOfCompany.find(x => { return x.id === relate.goalId}).status].name : ''}}
                    </div>
                  </span>
                </div>
              </div>
              <div class="col-md-4 group-relation">
                <div class="text">{{ relate.type ?  commonData.relationTypeDisplay[relate.type] : ''}}</div>
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-right']" class="icon arrow-long" />
              </div>
              <div class="col-md-4 text-right">
                <div>
                  <span class="mr-2">Mục tiêu:</span>
                  <span>{{ goalOfCompany.find(x => { return x.id === relate.relatedGoalId}).name }}</span>
                </div>
                <div>
                  <span class="mr-2">Tiến độ:</span>
                  <span>{{ goalOfCompany.find(x => { return x.id === relate.relatedGoalId}).progressPercent }}%</span>
                </div>
                <div class="d-flex justify-content-end">
                  <span class="mr-2">Trạng thái:</span>
                  <span>
                    <div class="tag" :class="`${commonData.goalStatusDisplay[goalOfCompany.find(x => { return x.id === relate.relatedGoalId}).status].color}`">
                      {{ goalOfCompany.find(x => { return x.id === relate.relatedGoalId}) ?  commonData.goalStatusDisplay[goalOfCompany.find(x => { return x.id === relate.relatedGoalId}).status].name : ''}}
                    </div>
                  </span>
                </div>
              </div>
            </div>

            <div class="row align-items-center justify-content-between" v-if="relate.type == 'nextStep'">
              <div class="col-md-4">
                <div>
                  <span class="mr-2">Mục tiêu:</span>
                  <span>{{ goalOfCompany.find(x => { return x.id === relate.relatedGoalId}).name }}</span>
                </div>
                <div>
                  <span class="mr-2">Tiến độ:</span>
                  <span>{{ goalOfCompany.find(x => { return x.id === relate.relatedGoalId}).progressPercent }}%</span>
                </div>
                <div class="d-flex justify-content-start">
                  <span class="mr-2">Trạng thái:</span>
                  <span>
                    <div class="tag" :class="`${commonData.goalStatusDisplay[goalOfCompany.find(x => { return x.id === relate.relatedGoalId}).status].color}`">
                      {{ goalOfCompany.find(x => { return x.id === relate.relatedGoalId}) ?  commonData.goalStatusDisplay[goalOfCompany.find(x => { return x.id === relate.relatedGoalId}).status].name : ''}}
                    </div>
                  </span>
                </div>
              </div>
              <div class="col-md-4 group-relation">
                <div class="text">{{ relate.type ?  commonData.relationTypeDisplay[relate.type] : ''}}</div>
                <font-awesome-icon :icon="['fas', 'long-arrow-alt-left']" class="icon arrow-long" />
              </div>
              <div class="col-md-4 text-right">
                <div>
                  <span class="mr-2">Mục tiêu:</span>
                  <span class="font-weight-bold">{{ goalOfCompany.find(x => { return x.id === relate.goalId}).name }}</span>
                </div>
                <div>
                  <span class="mr-2">Tiến độ:</span>
                  <span>{{ goalOfCompany.find(x => { return x.id === relate.goalId}).progressPercent }}%</span>
                </div>
                <div class="d-flex justify-content-end">
                  <span class="mr-2">Trạng thái:</span>
                  <span>
                    <div class="tag" :class="`${commonData.goalStatusDisplay[goalOfCompany.find(x => { return x.id === relate.goalId}).status].color}`">
                      {{ goalOfCompany.find(x => { return x.id === relate.goalId}) ?  commonData.goalStatusDisplay[goalOfCompany.find(x => { return x.id === relate.goalId}).status].name : ''}}
                    </div>
                  </span>
                </div>
              </div>
            </div>

            <div class="row align-items-center justify-content-between" v-if="relate.type == 'sameTime'">
              <div class="col-md-4">
                <div>
                  <span class="mr-2">Mục tiêu:</span>
                  <span>{{ goalOfCompany.find(x => { return x.id === relate.goalId}).name }}</span>
                </div>
                <div>
                  <span class="mr-2">Tiến độ:</span>
                  <span>{{ goalOfCompany.find(x => { return x.id === relate.goalId}).progressPercent }}%</span>
                </div>
                <div class="d-flex justify-content-start">
                  <span class="mr-2">Trạng thái:</span>
                  <span>
                    <div class="tag" :class="`${commonData.goalStatusDisplay[goalOfCompany.find(x => { return x.id === relate.goalId}).status].color}`">
                      {{ goalOfCompany.find(x => { return x.id === relate.goalId}) ?  commonData.goalStatusDisplay[goalOfCompany.find(x => { return x.id === relate.goalId}).status].name : ''}}
                    </div>
                  </span>
                </div>
              </div>
              <div class="col-md-4 group-relation">
                <div class="text">{{ relate.type ?  commonData.relationTypeDisplay[relate.type] : ''}}</div>
                <div class="row justify-content-center">
                  <font-awesome-icon :icon="['fas', 'long-arrow-alt-left']" class="icon arrow-long" />
                  <font-awesome-icon :icon="['fas', 'long-arrow-alt-right']" class="icon arrow-long" />
                </div>
              </div>
              <div class="col-md-4 text-right">
                <div>
                  <span class="mr-2">Mục tiêu:</span>
                  <span>{{ goalOfCompany.find(x => { return x.id === relate.relatedGoalId}).name }}</span>
                </div>
                <div>
                  <span class="mr-2">Tiến độ:</span>
                  <span>{{ goalOfCompany.find(x => { return x.id === relate.relatedGoalId}).progressPercent }}%</span>
                </div>
                <div class="d-flex justify-content-end">
                  <span class="mr-2">Trạng thái:</span>
                  <span>
                    <div class="tag" :class="`${commonData.goalStatusDisplay[goalOfCompany.find(x => { return x.id === relate.relatedGoalId}).status].color}`">
                      {{ goalOfCompany.find(x => { return x.id === relate.relatedGoalId}) ?  commonData.goalStatusDisplay[goalOfCompany.find(x => { return x.id === relate.relatedGoalId}).status].name : ''}}
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="Xem kết quả chính của mục tiêu con" :visible.sync="modalViewMainResultSubGoal" class="transition-box-center" width="80%" :close-on-click-modal="false" :close-on-press-escape="false">
        <div class="table-responsive">
          <table class="table center">
            <thead class="thead-light">
              <tr>
                <th>Tên kết quả chính</th>
                <th>Tiến độ</th>
                <th>Link kế hoạch</th>
                <th>Link kết quả</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(result, index) in mainResultSubGoalArray" :key="index"> 
                <td>
                  <span class="mr-2">{{ result.title ? result.title : 'Không có nội dung' }}</span>
                  <el-tooltip class="item" effect="dark" content="Xem check-in của kết quả chính" placement="top-start">
                    <a href="javascript:;" class="text-primary medium" :disabled="result.checkIn === 0" @click="openModalViewMainResultCheckInSubGoal(result)">
                      <font-awesome-icon :icon="['fas', 'calendar-check']" />
                    </a>
                  </el-tooltip>
                </td>
                <td>
                  <ProgressAdvance :type="result.typeProgress" :value="result.targetPercent" />
                </td>
                <td>{{ result.planLink ? text.planLink : 'Không có nội dung'}}</td>
                <td>{{ result.resultLink ? text.resultLink : 'Không có nội dung' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
    </el-dialog>

    <el-dialog title="Xem kết quả check-in mục tiêu con" :visible.sync="modalViewCheckInSubGoal" class="transition-box-center" width="60%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <div class="card mb-3" v-for="item in checkInSubGoalArray" :key="item.id">
          <div class="card-body">
            <div class="row">
              <label class="col-6 font-weight-bold">Kết quả</label>
              <div class="col-6">
                <div v-if="item && item.result">
                  {{ item.result }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">Mức độ tự tin</label>
              <div class="col-6">{{ commonData.confidenceLevelDisplay[item.confidenceLevel] }}</div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">Tiến độ</label>
              <div class="col-6">
                <ProgressAdvance :type="item.typeProgress" :value="item.currentProgress" />
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">Ngày tạo</label>
              <div class="col-6">
                <div v-if="item && item.createdAt">
                  {{ item.createdAt.slice(0, 10) }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">{{ questionsCompany.find(x => x.orderNo === 1).question }}</label>
              <div class="col-6">
                <div v-if="item && item.answerFirst">
                  {{ item.answerFirst }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">{{ questionsCompany.find(x => x.orderNo === 2).question }}</label>
              <div class="col-6">
                <div v-if="item && item.answerSecond">
                  {{ item.answerSecond }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">{{ questionsCompany.find(x => x.orderNo === 3).question }}</label>
              <div class="col-6">
                <div v-if="item && item.answerThird">
                  {{ item.answerThird }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">{{ questionsCompany.find(x => x.orderNo === 4).question }}</label>
              <div class="col-6">
                <div v-if="item && item.answerFourth">
                  {{ item.answerFourth }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="Xem kết quả check-in kết quả chính của mục tiêu con" :visible.sync="modalViewMainResultCheckInSubGoal" class="transition-box-center" width="60%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <div class="card mb-3" v-for="item in checkInMainReusultSubGoalArray" :key="item.id">
          <div class="card-body">
            <div class="row">
              <label class="col-6 font-weight-bold">Kết quả</label>
              <div class="col-6">
                <div v-if="item && item.result">
                  {{ item.result }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">Mức độ tự tin</label>
              <div class="col-6">{{ commonData.confidenceLevelDisplay[item.confidenceLevel] }}</div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">Tiến độ</label>
              <div class="col-6">
                <ProgressAdvance :type="item.typeProgress" :value="item.currentProgress" />
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">Ngày tạo</label>
              <div class="col-6">
                <div v-if="item && item.createdAt">
                  {{ item.createdAt.slice(0, 10) }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">{{ questionsCompany.find(x => x.orderNo === 1).question }}</label>
              <div class="col-6">
                <div v-if="item && item.answerFirst">
                  {{ item.answerFirst }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">{{ questionsCompany.find(x => x.orderNo === 2).question }}</label>
              <div class="col-6">
                <div v-if="item && item.answerSecond">
                  {{ item.answerSecond }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">{{ questionsCompany.find(x => x.orderNo === 3).question }}</label>
              <div class="col-6">
                <div v-if="item && item.answerThird">
                  {{ item.answerThird }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">{{ questionsCompany.find(x => x.orderNo === 4).question }}</label>
              <div class="col-6">
                <div v-if="item && item.answerFourth">
                  {{ item.answerFourth }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>

    <el-dialog title="Tạo mục tiêu con" :visible.sync="modalCreateSubGoal" class="transition-box-center" width="50%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <form data-vv-scope="validateCreateSubGoal">
          <div :class="`form-group ${errors.has('validateCreateSubGoal.nameSubGoal') ? 'has-error' : ''}`">
            <label>Tên mục tiêu con<span class="text-danger ml-2">*</span></label>
            <input type="text" class="input-primary medium" name="nameSubGoal" placeholder="Nhập tên mục tiêu con" v-model="formCreateSubGoal.name" v-validate="'required'"/>
            <div v-if="errors.has('validateCreateSubGoal.nameSubGoal')" class="mt-3 text-danger">Yêu cầu nhập tên mục tiêu con</div>
          </div>
          <div :class="`form-group ${errors.has('validateCreateSubGoal.typeProgressSubGoal') ? 'has-error' : ''}`">
            <label>Đơn vị đo lường<span class="text-danger ml-2">*</span></label>
            <el-select v-model="formCreateSubGoal.typeProgress" name="typeProgressSubGoal" clearable placeholder="Chọn đơn vị đo lường" class="w-100" v-validate="'required'">
              <el-option v-for="item in commonData.unit"
                    :key="item.code"
                    :label="`${item.name} ( ${item.shortName} )`"
                    :value="item.code">
              </el-option>
            </el-select>
            <div v-if="errors.has('validateCreateSubGoal.typeProgressSubGoal')" class="mt-3 text-danger">Yêu cầu nhập đơn vị đo lường</div>
          </div>
          <div :class="`form-group ${errors.has('validateCreateSubGoal.fullProgressSubGoal') ? 'has-error' : ''}`" v-if="formCreateSubGoal.typeProgress && formCreateSubGoal.typeProgress !== commonData.PERCENT && formCreateSubGoal.typeProgress !== commonData.STAR">
            <label>Giới hạn đo lường<span class="text-danger ml-2">*</span></label>
            <input type="number" class="input-primary medium" name="fullProgressSubGoal" placeholder="Nhập giới hạn đo lường" v-model="formCreateSubGoal.fullProgress" v-validate="'required'" />
            <div v-if="errors.has('validateCreateSubGoal.fullProgressSubGoal')" class="mt-3 text-danger">Yêu cầu nhập giới hạn đo lường</div>
          </div>
        </form>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-standard btn-medium mr-3" @click="modalCreateSubGoal = false">
          Hủy
        </button>
        <button class="btn btn-primary btn-medium" :disabled="errors.items.length > 0" @click="confirmCreateSubGoal">
          Xác nhận
        </button>
      </span>
    </el-dialog>

    <el-dialog title="Form check-in cấp trên" :visible.sync="modalCheckInHigher" class="transition-box-center" width="80%" top="3vh" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="modal-body">
        <form data-vv-scope="validateCheckInHigher">
          <div class="row my-2">
            <div class="col-md-4 title">{{ $t("checkinPage.checkInForm.confidenceLevel") }}</div>
            <div class="col-md-8">
              <el-radio-group v-model="formCheckInHigher.confidenceLevel" v-for="(item,k) in commonData.confidenceLevel" :key="k">
                <el-radio :label="item.code" class="mr-2">{{item.name}}</el-radio>
              </el-radio-group>
            </div>
          </div>
          <div :class="`row my-2 ${errors.has('validateCheckInHigher.resultMainGoal') ? 'has-error' : ''}`">
            <div class="col-md-4 title">{{ $t("checkinPage.checkInForm.result") }}<span class="text-danger ml-2">*</span></div>
            <div class="col-md-8">
              <input class="input-primary medium" name="resultMainGoal" placeholder="Nhập kết quả" v-model="formCheckInHigher.result" v-validate="'required'" />
              <div v-if="errors.has('validateCheckInHigher.resultMainGoal')" class="mt-3 text-danger">Yêu cầu nhập kết quả</div>
            </div>
          </div>
          <div :class="`row my-2 ${errors.has('validateCheckInHigher.currentProgressMainGoal') ? 'has-error' : ''}`">
            <div class="col-md-4 title">{{ $t("checkinPage.checkInForm.progress") }}<span class="text-danger ml-2">*</span></div>
            <div class="col-md-8">
              <input type="number" class="input-primary medium" name="currentProgressMainGoal" placeholder="Nhập tiến độ" v-model="formCheckInHigher.currentProgress" v-validate="'required'" />
              <div v-if="errors.has('validateCheckInHigher.currentProgressMainGoal')" class="mt-3 text-danger">Yêu cầu nhập tiến độ</div>
            </div> 
          </div>
          <div class="row my-2" v-for="(item, index) in questionsCompany" :key="index">
            <div class="col-md-4 title">{{ item.question }}</div>
            <div class="col-md-8">
              <textarea placeholder="Nhập trả lời" rows="4" class="w-100" v-if="item.orderNo == 1" v-model="formCheckInHigher.answerFirst"></textarea>
              <textarea placeholder="Nhập trả lời" rows="4" class="w-100" v-if="item.orderNo == 2" v-model="formCheckInHigher.answerSecond"></textarea>
              <textarea placeholder="Nhập trả lời" rows="4" class="w-100" v-if="item.orderNo == 3" v-model="formCheckInHigher.answerThird"></textarea>
              <textarea placeholder="Nhập trả lời" rows="4" class="w-100" v-if="item.orderNo == 4" v-model="formCheckInHigher.answerFourth"></textarea>
            </div>
          </div>
        </form>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-standard btn-medium mr-3" @click="modalCheckInHigher = false">
          Hủy
        </button>
        <button class="btn btn-primary btn-medium" :disabled="errors.items.length > 0" @click="submitCheckInHigher">
          Xác nhận
        </button>
      </span>
    </el-dialog>

    <el-dialog title="Xem kết quả check-in cấp trên" :visible.sync="modalViewHigher" class="transition-box-center" width="60%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <div class="card mb-3" v-for="(item, index) in checkInHigherArray" :key="index">
          <div class="card-body">
            <div class="row">
              <label class="col-6 font-weight-bold">Kết quả</label>
              <div class="col-6">
                <div v-if="item && item.result">
                  {{ item.result }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">Mức độ tự tin</label>
              <div class="col-6">{{ commonData.confidenceLevelDisplay[item.confidenceLevel] }}</div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">Tiến độ</label>
              <div class="col-6">
                <ProgressAdvance :type="item.typeProgress" :value="item.currentProgress" />
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">Ngày tạo</label>
              <div class="col-6">
                <div v-if="item && item.createdAt">
                  {{ item.createdAt.slice(0, 10) }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">{{ questionsCompany.find(x => x.orderNo === 1).question }}</label>
              <div class="col-6">
                <div v-if="item && item.answerFirst">
                  {{ item.answerFirst }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">{{ questionsCompany.find(x => x.orderNo === 2).question }}</label>
              <div class="col-6">
                <div v-if="item && item.answerSecond">
                  {{ item.answerSecond }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">{{ questionsCompany.find(x => x.orderNo === 3).question }}</label>
              <div class="col-6">
                <div v-if="item && item.answerThird">
                  {{ item.answerThird }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
            <div class="row">
              <label class="col-6 font-weight-bold">{{ questionsCompany.find(x => x.orderNo === 4).question }}</label>
              <div class="col-6">
                <div v-if="item && item.answerFourth">
                  {{ item.answerFourth }}
                </div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import store from "./_store";
import commonData from '../../utils/common-data';
import PieChart from "./_components/pieChart";
import CompareValue from "../../components/compareValue.vue";
import ProgressAdvance from "../../components/progressAdvance.vue";
import _ from 'lodash';
export default {
  components: {
    PieChart,
    CompareValue,
    ProgressAdvance
  },
  data() {
    return {
      commonData,
      cycle: '',
      description: '',
      modalFeedback: false,
      modalViewFeedback: false,
      modalViewCheckIn: false,
      modalRelation: false,
      modalViewMainResult: false,
      modalReadMainResult: false,
      modalViewMainResultSubGoal: false,
      modalViewCheckInSubGoal: false,
      modalViewMainResultCheckInSubGoal: false,
      modalCreateSubGoal: false,
      modalCheckInHigher: false,
      modalViewHigher: false,
      activeTab: "check-in",
      activeTabHigher: "check-in",
      cycleId: '',
      formData:{
        receiveUserId: '',
        type: '',
        userId: localStorage.getItem("userId"),
        goalId: '',
        evaluativeCriteriaId: '',
        content: '',
        isDelete: false
      },
      user: null,
      rawEvaluateCompany:null,
      evaluateUser: null,
      replyData: null,
      mainResultData: null,
      checkInMainResultData: null,
      relationData: null,
      mainResultSubGoalArray: null,
      checkInSubGoalArray: null,
      checkInMainReusultSubGoalArray: null,
      checkInHigherArray: null,
      switchLayout: false,
      loggedUserId: null,
      formCreateSubGoal: {
        name: '',
        confidenceLevel: 'fine',
        image: null,
        status: 'new',
        isDelete: false
      },
      higherDetails: null,
      formCheckInHigher: {
        goalId: '',
        subGoalId: null,
        result: '',
        confidenceLevel: '',
        currentProgress: 0,
        answerFirst: '',
        answerSecond: '',
        answerThird: '',
        answerFourth: '',
        isDelete: false
      },
    };
  },
  computed: {
    ...mapState({
      searchRequest: state => state.$_checkInCompany.searchRequest,
      currentUser: state => state.$_loginPage.currentUser,
    }),
    ...mapGetters({
      questionsCompany: "$_loginPage/getQuestionsCompany",
      cycleCompany: "$_loginPage/getCycleCompany",
      goalList: "$_checkInCompany/getGoalList",
      evaluateCompany: "$_loginPage/getEvaluateCriteriaCompany",
      feedbackUser: "$_checkInCompany/getUserList",
      goalUser: "$_checkInCompany/getUserGoal",
      goalOfCompany: "$_checkInCompany/getAllGoalOfCompany",
    }),
  },
  async created() {
    var _this = this;
    const STORE_KEY = "$_checkInCompany";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    await _this.$store.dispatch("$_checkInCompany/getUserList");
    await _this.$store.dispatch("$_checkInCompany/getGoalListOfCompany");
    await _this.$store.dispatch("$_checkInCompany/getAllGoalOfCompany");
    _this.rawEvaluateCompany = _.cloneDeep(_this.evaluateCompany);
    _this.evaluateUser = _.cloneDeep(_this.rawEvaluateCompany);
    _this.loggedUserId = localStorage.getItem('userId');

  },
  watch:{
    "formData.receiveUserId": async function(val){
      var _this = this;
      await _this.$store.dispatch("$_checkInCompany/getAllGoalOfUser", val);
    },
    "cycleId": async function(val){
      var _this = this;
      await _this.$store.dispatch("$_checkInCompany/handleChangeCycleIdOfGoalUser", val);
    },
    "formData.type": async function(val){
      var _this = this;
      _this.evaluateUser = _.filter(_this.rawEvaluateCompany, o => {return o.type === val})
    },
  },
  methods: {
    openModalCheckInHigher(higherDetails){
      var _this = this;
      _this.formCheckInHigher = _.cloneDeep(higherDetails);
      _this.formCheckInHigher.subGoalId = higherDetails.id;
      _this.formCheckInHigher.goalId = higherDetails.goalId;
      _this.formCheckInHigher.fullProgress = higherDetails.fullProgress;
      _this.formCheckInHigher.typeProgress = higherDetails.typeProgress;
      _this.modalCheckInHigher = true;
      _this.$nextTick(() => {
        _this.$validator.errors.clear();
        _this.$validator.fields.items.forEach(field => field.reset());
        _this.$validator.fields.items.forEach(field => _this.errors.remove(field));
        _this.$validator.reset();
      });
    },
    submitCheckInHigher: _.debounce(async function () {
        var _this = this;
        await _this.$validator.validateAll("validateCheckInHigher").then(async result => {
          if (result) {
            try {
              _this.formCheckInHigher.currentProgress = parseFloat(_this.formCheckInHigher.currentProgress);
              _this.formCheckInHigher.fullProgress = _this.setFullProgress(_this.formCheckInHigher.typeProgress, _this.formCheckInHigher.fullProgress);
              await _this.$store.dispatch("$_checkInCompany/checkInHigher", _this.formCheckInHigher);
              _this.formCheckInHigher.goalId = '';
              _this.formCheckInHigher.subGoalId = null;
              _this.formCheckInHigher.currentProgress = 0;
              _this.formCheckInHigher.confidenceLevel = '';
              _this.formCheckInHigher.fullProgress = 0;
              _this.formCheckInHigher.typeProgress = null;
              _this.formCheckInHigher.result = '';
              _this.formCheckInHigher.answerFirst = '';
              _this.formCheckInHigher.answerSecond = '';
              _this.formCheckInHigher.answerThird = '';
              _this.formCheckInHigher.answerFourth = '';
              _this.formCheckInHigher.isDelete = false,
              _this.modalCheckInHigher = false;
              console.log(_this.formCheckInHigher);
              await _this.$store.dispatch("$_checkInCompany/getGoalListOfCompany");
              _this.$notify({
                title: 'Chúc mừng',
                message: 'Check-in thành công',
                type: 'success'
              });
            } catch (error) {
              _this.$notify.error({
                title: 'Thất bại',
                message: 'Check-in thất bại'
              });
            }
          }
        });
    }, 500),
    openModalViewHigher(subGoal){
      var _this = this;
      _this.modalViewHigher = true;
      _this.checkInHigherArray = _.cloneDeep(subGoal);
    },
    async redirectToCardDetail(card){
      var _this = this;
      var boardIdOfCardGroup =  await _this.$store.dispatch("$_checkInCompany/getBoardId", card.cardGroupId);
      var path = `/boardDetail/${boardIdOfCardGroup}?cardId=${card.id}`;
      window.open(path, "_blank");
    },
    handleSwitchLayout(){
      var _this = this;
      _this.switchLayout = ! _this.switchLayout;
    },
    customColorMethod(percentage) {
      if (percentage < 10) {
        return '#909399';
      } else if (percentage < 50) {
        return '#ff0404';
      } else if (percentage < 70) {
        return '#e6a23c';
      } else {
        return '#67c23a';
      }
    },
    setFullProgress(type, value){
      switch(type){
        case commonData.PERCENT:
          return 100;
        case commonData.STAR:
          return 5;
        case commonData.VND: case commonData.DOLA: case commonData.TIME: case commonData.PRODUCT:
          return parseFloat(value);
        default:
          return 0;
      }
    },
    handleCreateSubGoal(item){
      var _this = this;
      _this.formCreateSubGoal.userId = localStorage.getItem("userId");
      _this.formCreateSubGoal.goalId = item.id;
      _this.formCreateSubGoal.cycleId = item.cycleId;
      _this.formCreateSubGoal.companyId = item.companyId;
      _this.formCreateSubGoal.higherUserId = item.higherUserId;
      _this.modalCreateSubGoal = true;
      console.log( _this.formCreateSubGoal)
       _this.$nextTick(() => {
        _this.$validator.errors.clear();
        _this.$validator.fields.items.forEach(field => field.reset());
        _this.$validator.fields.items.forEach(field => _this.errors.remove(field));
        _this.$validator.reset();
      });
    },
    confirmCreateSubGoal: _.debounce(async function () {
        var _this = this;
        await _this.$validator.validateAll("validateCreateSubGoal").then(async result => {
          if (result) {
            try {
              _this.formCreateSubGoal.fullProgress = _this.setFullProgress(_this.formCreateSubGoal.typeProgress, _this.formCreateSubGoal.fullProgress);
              await _this.$store.dispatch("$_checkInCompany/editSubGoal", _this.formCreateSubGoal);
              _this.modalCreateSubGoal = false;
              _this.formCreateSubGoal.userId = null;
              _this.formCreateSubGoal.goalId = null;
              _this.formCreateSubGoal.cycleId = null;
              _this.formCreateSubGoal.companyId = null;
              _this.formCreateSubGoal.higherUserId = null;
              _this.formCreateSubGoal.typeProgress = null;
              _this.formCreateSubGoal.fullProgress = null;
              _this.formCreateSubGoal.name = "";
              await _this.$store.dispatch("$_checkInCompany/getGoalListOfCompany");
              _this.$notify({
                title: 'Chúc mừng',
                message: 'Lưu thành công',
                type: 'success'
              });
            } catch (error) {
              _this.$notify.error({
                title: 'Thất bại',
                message: 'Lưu thất bại'
              });
            }
          }
        });
    }, 500),
    openModalViewMainResultSubGoal(subGoal){
      var _this = this;
      _this.modalViewMainResultSubGoal = true;
      _this.mainResultSubGoalArray = _.cloneDeep(subGoal.mainResult);
    },
    openModalViewCheckInSubGoal(subGoal){
      var _this = this;
      _this.modalViewCheckInSubGoal = true;
      _this.checkInSubGoalArray = _.cloneDeep(subGoal.checkIn);
    },
    openModalViewMainResultCheckInSubGoal(subGoal){
      var _this = this;
      _this.modalViewMainResultCheckInSubGoal = true;
      _this.checkInMainReusultSubGoalArray = _.cloneDeep(subGoal.checkIn);
    },
    openCreateFeedback(){
      var _this = this;
      _this.modalFeedback = true;
    },
    async handleSearch(){
      var _this = this;
      _this.searchRequest.description = _this.description;
      await _this.$store.dispatch("$_checkInCompany/getGoalListOfCompany");
    },
    async handleFilter(){
      var _this = this;
      _this.searchRequest.title = _this.cycle;
      await _this.$store.dispatch("$_checkInCompany/getGoalListOfCompany");
    },
    format(percentage) {
      return percentage === 100 ? "Full" : `${percentage}%`;
    },
    handleModalViewFeedback(val){
      var _this = this;
      _this.replyData = _.filter(_this.goalList, (o)=>{ return o.id === val });
      _this.modalViewFeedback = true;
    },
    handleModalViewMainResult(val){
      var _this = this;
      _this.mainResultData = _.filter(_this.goalList, (o)=>{ return o.id === val });
      _this.modalViewMainResult = true;
    },
    openModalReadMainResult(result){
      var _this = this;
      _this.checkInMainResultData = result.checkIn;
      _this.modalReadMainResult = true;
    },
    handleModalRelation(val){
      var _this = this;
      _this.relationData = _.filter(_this.goalList, (o)=>{ return o.id === val });
      _this.modalRelation = true;
    },
    async handleSizeChange(val) {
      var _this = this;
      _this.searchRequest.pageSize = val;
      await _this.$store.dispatch("$_checkInCompany/getGoalListOfCompany");
    },
    async handleCurrentChange(val) {
      var _this = this;
      _this.searchRequest.pageIndex = val;
      await _this.$store.dispatch("$_checkInCompany/getGoalListOfCompany");
    },
    submitResponse: _.debounce(async function () {
      var _this = this;
      await _this.$validator.validateAll("validateFeedback").then(async result => {
        if (result) {
          try {
            await _this.$store.dispatch("$_checkInCompany/createReply", _this.formData);
            await _this.$store.dispatch("$_checkInCompany/getGoalListOfCompany");
            _this.modalFeedback = false
            _this.$notify({
              title: "Chúc mừng",
              message: "Phản hồi thành công",
              type: "success",
            });
          } catch (error) {
            _this.$notify.error({
              title: "Thất bại",
              message: "Phản hồi thất bại",
            });
          }
        }
      });
    }, 500),
  },
};
</script>
