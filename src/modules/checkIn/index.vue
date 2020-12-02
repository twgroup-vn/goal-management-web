<template>
  <div>
    <div class="white-background">
      <div class="row justify-content-between align-items-center mb-3">
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
          <button class="btn btn-primary btn-medium" @click="openCreateGoal">{{ $t("checkinPage.createGoalBtn") }}</button>
        </div>
      </div>
    </div>
    <div class="main container-fluid">
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
              <div class="row align-items-center">
                <div :class="switchLayout == false ? 'col-md-6 d-flex flex-wrap align-items-center' : 'col-12 d-flex flex-wrap align-items-center justify-content-center'">
                  <div :class="switchLayout == false ? 'created-date mr-3' : 'created-date mr-0 mb-3'">{{  $t("checkinPage.createDate") }}: {{ item.createdAt.slice(0,10) }}</div>
                  <div :class="`status ${commonData.checkInStatusDisplay[item.checkInStatus].color}`" @click="handleOpenModalCheckIn(item)" style="cursor:pointer">
                      {{ commonData.checkInStatusDisplay[item.checkInStatus].name }}
                  </div>
                  <button :class="switchLayout == false ? 'btn btn-primary ml-3' : 'btn btn-primary ml-0 mt-3' " @click="handleCreateSubGoal(item)">
                    <span class="ml-2">Tạo mục tiêu con</span>
                  </button>
                </div>
                <div :class="switchLayout == false ? 'col-md-6 d-flex align-items-center justify-content-end' : 'col-12 d-flex align-items-center justify-content-between mt-4'">
                  <a class="relative-group-icon mr-4" @click="handleModalViewRalation(item)">
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
              <hr class=""/>
              <div class="row">
                <div :class="switchLayout == false ? 'col-md-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                  <div class="title">{{ $t("checkinPage.table.goal") }}</div>
                  <div class="content">{{ item.name ? item.name : ''}}</div>
                </div>
                <div :class="switchLayout == false ? 'col-md-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                  <div class="title">{{ $t("checkinPage.table.mainResult") }}</div>
                  <div class="content">
                    <a href="javascript:;" @click="handleModalMainResult(item.id)" class="result">{{item.mainResult && item.mainResult.length ? item.mainResult.length : 0}} kết quả</a>
                  </div>
                </div>
                <div :class="switchLayout == false ? 'col-md-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                  <div class="title">{{ $t("checkinPage.table.progress") }}</div>
                  <div class="content">
                    <el-progress :percentage="item.progressPercent" :format="format" :color="customColorMethod"></el-progress>
                  </div>
                </div>
                <div :class="switchLayout == false ? 'col-md-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                  <div class="title">{{ $t("checkinPage.table.changing") }}</div>
                  <div class="content">{{ item.compare >= 0 ? `+${item.compare}%` : `${item.compare}%`}}</div>
                </div>
                <div :class="switchLayout == false ? 'col-md-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                  <div class="title">{{ $t("checkinPage.table.confidenceLevel") }}</div>
                  <div class="content">{{ item.confidenceLevel ?  commonData.confidenceLevelDisplay[item.confidenceLevel] : ''}}</div>
                </div>
                <div :class="switchLayout == false ? 'col-md-2 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                  <div class="title">{{ $t("checkinPage.table.status") }}</div>
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
                      <div slot="title">
                        <span class="text-primary mr-2">Các liên kết</span>
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
                                <div class="content d-flex align-items-center">
                                  <div class="group-avatar">
                                    <div class="avatar-circle original">
                                      <div class="avatar-with-img" :style="{ backgroundImage: `url(${card && card.assign ? card.avatarAssign : ''})` }"></div>
                                    </div>
                                  </div>
                                  <div class="ml-2">{{ card.assign ? card.assignee : '' }}</div>
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
                      <div slot="title">
                        <span class="text-primary mr-2">Các mục tiêu con</span>
                        <span>({{ item.subGoal.length + ' ' + 'mục tiêu con' }})</span>
                      </div>
                      <div class="col-lg-12" v-for="(sub, index) in item.subGoal" :key="index">
                        <div class="card mb-4">
                          <div class="card-body">
                            <div class="row">
                              <div :class="switchLayout == false ? 'col-md-3 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                                <div class="title">Tên các mục tiêu con</div>
                                <div class="content">{{ sub.name ? sub.name : 'Không có tên mục tiêu' }}</div>
                              </div>
                              <div :class="switchLayout == false ? 'col-md-3 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                                <div class="title">Mức độ tự tin</div>
                                <div class="content">{{ sub.confidenceLevel ? commonData.confidenceLevelDisplay[sub.confidenceLevel] : '' }}</div>
                              </div>
                              <div :class="switchLayout == false ? 'col-md-3 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                                <div class="title">Trạng thái</div>
                                <div class="content"> 
                                  <div :class="`tag ${commonData.goalStatusDisplay[sub.status].color}`">{{ sub.status ? commonData.goalStatusDisplay[sub.status].name : '' }}</div>
                                </div>
                              </div>
                              <div :class="switchLayout == false ? 'col-md-3 list d-flex flex-column justify-content-center' : 'col-md-12 grid d-flex flex-column justify-content-center'">
                                <div class="title">Ngày tạo</div>
                                <div class="content">{{ sub.createdAt ? sub.createdAt.slice(0, 10) : '' }}</div>
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

    <el-dialog title="Form check-in hàng tuần" :visible.sync="modalCheckIn" class="transition-box-center" width="80%" top="4vh" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="modal-body">
        <el-tabs v-model="activeTab">
          <el-tab-pane label="Check-in" name="check-in" v-if="goalDetails">
            <div class="row my-2">
              <div class="col-md-4 title">{{ $t("checkinPage.checkInForm.goal") }}</div>
              <div class="col-md-8">
                {{ goalDetails.name ?  goalDetails.name : "" }}
              </div>
            </div>
            <div class="row my-2">
              <div class="col-md-4 title">{{ $t("checkinPage.checkInForm.confidenceLevel") }}</div>
              <div class="col-md-8">
               <el-radio-group v-model="formCheckIn.confidenceLevel" v-for="(item,k) in commonData.confidenceLevel" :key="k">
                <el-radio :label="item.code" class="mr-2">{{item.name}}</el-radio>
              </el-radio-group>
              </div>
            </div>
            <div class="row my-2">
              <div class="col-md-4 title">{{ $t("checkinPage.checkInForm.result") }}</div>
              <div class="col-md-8">
                <input class="input-primary medium" placeholder="Nhập kết quả" v-model="formCheckIn.result" />
              </div>
            </div>
            <div class="row my-2">
              <div class="col-md-4 title">{{ $t("checkinPage.checkInForm.progress") }}</div>
              <div class="col-md-8">
                <input type="number" class="input-primary medium" placeholder="Nhập tiến độ" v-model="formCheckIn.currentProgress" />
              </div> 
            </div>
            <div class="row my-2" v-for="(item, index) in questionsCompany" :key="index">
              <div class="col-md-4 title">{{ item.question }}</div>
              <div class="col-md-8">
                <textarea placeholder="Nhập trả lời" rows="4" class="w-100" v-if="item.orderNo == 1" v-model="formCheckIn.answerFirst"></textarea>
                <textarea placeholder="Nhập trả lời" rows="4" class="w-100" v-if="item.orderNo == 2" v-model="formCheckIn.answerSecond"></textarea>
                <textarea placeholder="Nhập trả lời" rows="4" class="w-100" v-if="item.orderNo == 3" v-model="formCheckIn.answerThird"></textarea>
                <textarea placeholder="Nhập trả lời" rows="4" class="w-100" v-if="item.orderNo == 4" v-model="formCheckIn.answerFourth"></textarea>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Lịch sử" name="history">
            <div class="block mt-4" v-if="goalDetails && goalDetails.checkIn && goalDetails.checkIn.length">
              <el-timeline v-for="(item,index) in goalDetails.checkIn" :key="index">
                <el-timeline-item :timestamp="item.createdAt.slice(0,10)" placement="top">
                  <el-card>
                    <div>{{item.result ? item.result : 'Không có kết quả' }}</div>
                    <div><strong>Mức độ tự tin:</strong> {{ commonData.confidenceLevelDisplay[item.confidenceLevel] }}</div>
                    <div><strong>Tiến độ:</strong> {{ item.currentProgress }}%</div>
                    <div>Xem chi tiết</div>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-standard btn-medium mr-3" @click="modalCheckIn = false">
          Hủy
        </button>
        <button class="btn btn-primary btn-medium" @click="submitCheckIn">
          Xác nhận
        </button>
      </span>
    </el-dialog>

    <el-dialog title="Tạo mục tiêu" :visible.sync="modalCreateGoal" class="transition-box-center" width="60%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="modal-body">
        <div class="row my-2">
            <div class="col-md-4 title">Chu kỳ</div>
            <div class="col-md-8">
              <el-select v-model="formCreate.cycleId" clearable placeholder="Chọn chu kỳ" class="w-100">
                <el-option v-for="item in cycleCompany"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                </el-option>
              </el-select>
            </div>
        </div>
        <div class="row my-2">
          <div class="col-md-4 title">Cấp trên</div>
          <div class="col-md-8">
            <el-select v-model="formCreate.higherUserId" clearable placeholder="Chọn cấp trên quản lý mục tiêu" class="w-100">
              <el-option v-for="item in userCompany"
                          :key="item.id"
                          :label="`${item.fullName} ( ${item.email} )`"
                          :value="item.id">
              </el-option>
            </el-select>
          </div>
        </div>
        <div class="row my-2">
          <div class="col-md-4 title">Mục tiêu của bạn</div>
          <div class="col-md-8">
            <input class="input-primary medium" placeholder="Nhập mục tiêu của bạn" v-model="formCreate.name" />
          </div>      
        </div>
        <div class="row my-2">
          <div class="col-md-4 title">Link kế hoạch</div>
          <div class="col-md-8">
            <input class="input-primary medium" placeholder="Nhập link kế hoạch" v-model="formCreate.linkPlan" />
          </div>      
        </div><hr/>
        <div class="row my-2">
          <div class="col-md-4 title">
            Các mục tiêu liên kết
          </div>
          <div class="col-md-8 text-right">
              <button class="btn btn-secondary mr-2" @click="clearRelation">
                <font-awesome-icon :icon="['fas', 'trash']" />
              </button>
              <button class="btn btn-primary" @click="addRelation">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </button>
          </div>
        </div>
        <div class="row my-2" v-for="(item, index) in relationArray" :key="index">
           <div class="col-md-8">
             <el-select
                v-model="item.RelatedGoalId"
                filterable
                remote
                reserve-keyword
                placeholder="Nhập mục tiêu liên kết"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                  v-for="goal in options"
                  :key="goal.id"
                  :label="goal.name"
                  :value="goal.id">
                </el-option>
              </el-select>
           </div>
           <div class="col-md-4">
              <el-select v-model="item.Type" placeholder="Chọn loại liên kết">
                <el-option
                  v-for="type in commonData.relationshipType"
                  :key="type.code"
                  :label="type.name"
                  :value="type.code">
                </el-option>
              </el-select>
           </div>
        </div>
        <!-- <div class="row my-2">
          <div class="col-md-4 title">Hình đính kèm</div>
          <div class="col-md-8">
            <div class="avatar-circle square">
              <img class="img-fluid" :src="NoAvatar" v-if="!formCreate.image" />
              <img class="img-fluid" :src="formCreate.image" v-else />
               <div class="group-edit-avatar">
                <font-awesome-icon :icon="['fas', 'pen-square']" />
                <input
                  type="file"
                  class="avatar-input"
                  name="file"
                  id="file"
                  @change="handleFileUpload"
                />
              </div>
            </div>
          </div>      
        </div> -->
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-standard btn-medium mr-3" @click="modalCreateGoal = false">
          Hủy
        </button>
        <button class="btn btn-primary btn-medium" @click="submit">
          Xác nhận
        </button>
      </span>
    </el-dialog>

    <el-dialog title="Kết quả chính" :visible.sync="modalViewMainResult" class="transition-box-center" width="80%" :close-on-click-modal="false" :close-on-press-escape="false">
      <el-dialog width="50%" title="Thêm kết quả chính" :visible.sync="modalCreateMainResults" class="transition-box-center" append-to-body :close-on-click-modal="false" :close-on-press-escape="false">
        <div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Kết quả chính</label>
                <input type="text" class="input-primary medium" placeholder="Nhập kết quả chính" v-model="formCreateMainResult.title"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Kết quả mong muốn</label>
                <input type="number" class="input-primary medium" placeholder="Nhập kết quả mong muốn" v-model="formCreateMainResult.targetPercent" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Link kế hoạch</label>
                <input type="text" class="input-primary medium" placeholder="Nhập link kế hoạch" v-model="formCreateMainResult.planLink" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Link kết quả</label>
                <input type="text" class="input-primary medium" placeholder="Nhập link kết quả" v-model="formCreateMainResult.resultLink" />
              </div>
            </div>
          </div>
        </div>
        <span slot="footer" class="dialog-footer">
          <button class="btn btn-standard btn-medium mr-3" @click="modalCreateMainResults = false">
            Hủy
          </button>
          <button class="btn btn-primary btn-medium" @click="confirmCreateMainResult">
            Cập nhật
          </button>
        </span>
      </el-dialog>
      <div class="table-responsive">
        <table class="table center">
          <thead class="thead-light">
            <tr>
              <th>Kết quả chính</th>
              <th>Kết quả mong muốn</th>
              <th>Link kế hoạch</th>
              <th>Link kết quả</th>
              <th></th>
            </tr>
          </thead>
         <tbody v-for="(item, index) in mainResult" :key="index">
            <tr v-for="(result, key) in item.mainResult" :key="key"> 
              <td>
                <div class="d-flex align-items-center justify-content-between">
                  <div>
                    <div v-if="result && result.title">{{ result.title }}</div>
                    <div v-else class="text-disabled">Không có nội dung</div>
                  </div>
                  <button href="javascript:;" class="btn btn-secondary small" @click="openModalCheckInMainResult(result)">Check-in</button>
                </div>
              </td>
              <td>
                <el-progress :percentage="result.targetPercent" :format="format" :color="customColorMethod"></el-progress>
              </td>
              <td>
                <div v-if="result && result.planLink">{{ result.planLink }}</div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </td>
              <td>
                <div v-if="result && result.resultLink">{{ result.resultLink }}</div>
                <div v-else class="text-disabled">Không có nội dung</div>
              </td>
              <td>
                <div class="d-flex justify-content-end">
                  <el-tooltip class="item" effect="dark" content="Xem kết quả chính" placement="top-start">
                    <a class="d-block text-primary mr-3" href="javascript:;" @click="openModalReadMainResult(result)">
                      <font-awesome-icon :icon="['fas', 'eye']" />
                    </a>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="Sửa kết quả chính" placement="top-start">
                    <a class="d-block text-primary mr-3" href="javascript:;" @click="openModalEditMainResult(item, result)">
                      <font-awesome-icon :icon="['fas', 'edit']" />
                    </a>
                  </el-tooltip>
                  <el-tooltip class="item" effect="dark" content="Xóa kết quả chính" placement="top-start">
                    <a class="d-block text-primary" href="javascript:;" @click="openModalDeleteMainResult(item, result)">
                      <font-awesome-icon :icon="['fas', 'trash']" />
                    </a>
                  </el-tooltip>
                </div>
              </td>
            </tr>
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <a href="javascript:;" class="d-block text-primary text-right" @click="openModalCreateMainResult(item)">
                  <font-awesome-icon :icon="['fas', 'plus-circle']" />
                  <span class="ml-2">Thêm kết quả chính</span>
                </a>  
              </td>  
            </tr>
          </tbody>
        </table>
      </div>
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

    <el-dialog title="Cập nhật liên kết" :visible.sync="modalViewRalation" class="transition-box-center" width="60%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="modal-body">       
        <div class="row my-2">
          <div class="col-md-4 title">
            Các mục tiêu liên kết
          </div>
          <div class="col-md-8 text-right">
              <button class="btn btn-primary" @click="addRelationById">
                <font-awesome-icon :icon="['fas', 'plus']" />
              </button>
          </div>
        </div>
        <div class="row my-2" v-for="(item, index) in relationArray" :key="index">
           <div class="col-md-8">
             <el-select
                v-model="item.RelatedGoalId"
                filterable
                remote
                reserve-keyword
                placeholder="Nhập mục tiêu liên kết"
                :remote-method="remoteMethod"
                :loading="loading">
                <el-option
                  v-for="goal in options"
                  :key="goal.id"
                  :label="goal.name"
                  :value="goal.id">
                </el-option>
              </el-select>
           </div>
           <div class="col-md-4">
              <el-select v-model="item.Type" placeholder="Chọn loại liên kết">
                <el-option
                  v-for="type in commonData.relationshipType"
                  :key="type.code"
                  :label="type.name"
                  :value="type.code">
                </el-option>
              </el-select>
           </div>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-standard btn-medium mr-3" @click="modalViewRalation = false">
          Hủy
        </button>
        <button class="btn btn-primary btn-medium" @click="updateRelation">
          Xác nhận
        </button>
      </span>
    </el-dialog>

     <el-dialog title="Tạo mục tiêu con" :visible.sync="modalCreateSubGoal" class="transition-box-center" width="50%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <div class="form-group">
          <label>Tên mục tiêu con</label>
          <input type="text" class="input-primary medium" placeholder="Tên mục tiêu con" v-model="formCreateSubGoal.name"/>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-standard btn-medium mr-3" @click="modalCreateSubGoal = false">
          Hủy
        </button>
        <button class="btn btn-primary btn-medium" @click="confirmCreateSubGoal">
          Xác nhận
        </button>
      </span>
    </el-dialog>

    <el-dialog title="Chỉnh sửa kết quả chính" :visible.sync="modalEditMainResult" class="transition-box-center" width="80%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>
        <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Kết quả chính</label>
                <input type="text" class="input-primary medium" placeholder="Nhập kết quả chính" v-model="formEditMainResult.title"/>
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Kết quả mong muốn</label>
                <input type="number" class="input-primary medium" placeholder="Nhập kết quả mong muốn" v-model="formEditMainResult.targetPercent" />
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <div class="form-group">
                <label>Link kế hoạch</label>
                <input type="text" class="input-primary medium" placeholder="Nhập link kế hoạch" v-model="formEditMainResult.planLink" />
              </div>
            </div>
            <div class="col-md-6">
              <div class="form-group">
                <label>Link kết quả</label>
                <input type="text" class="input-primary medium" placeholder="Nhập link kết quả" v-model="formEditMainResult.resultLink" />
              </div>
            </div>
          </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-standard btn-medium mr-3" @click="modalEditMainResult = false">
          Hủy
        </button>
        <button class="btn btn-primary btn-medium" @click="confirmEditMainResult">
          Xác nhận
        </button>
      </span>
    </el-dialog>

    <el-dialog title="Xoá kết quả chính" :visible.sync="modalDeleteMainResult" class="transition-box-center" width="30%" :close-on-click-modal="false" :close-on-press-escape="false">
      <div>Bạn có chắc chắn muốn xóa kết quả này?</div>
       <span slot="footer" class="dialog-footer">
        <button class="btn btn-standard btn-medium mr-3" @click="modalDeleteMainResult = false">
          Hủy
        </button>
        <button class="btn btn-primary btn-medium" @click="confirmDeleteMainResult">
          Xác nhận
        </button>
      </span>
    </el-dialog>

    <el-dialog title="Form check-in kết quả chính" :visible.sync="modalCheckInMainResult" class="transition-box-center" width="80%" top="3vh" :close-on-click-modal="false" :close-on-press-escape="false">
      <div class="modal-body">
        <el-tabs v-model="activeTabMainResult">
          <el-tab-pane label="Check-in" name="check-in" v-if="resultDetail">
            <div class="row my-2">
              <div class="col-md-4 title">{{ $t("checkinPage.checkInForm.goal") }}</div>
              <div class="col-md-8">
                {{ resultDetail.title ?  resultDetail.title : "" }}
              </div>
            </div>
            <div class="row my-2">
              <div class="col-md-4 title">{{ $t("checkinPage.checkInForm.confidenceLevel") }}</div>
              <div class="col-md-8">
               <el-radio-group v-model="formCheckInMainResult.confidenceLevel" v-for="(item,k) in commonData.confidenceLevel" :key="k">
                <el-radio :label="item.code" class="mr-2">{{item.name}}</el-radio>
              </el-radio-group>
              </div>
            </div>
            <div class="row my-2">
              <div class="col-md-4 title">{{ $t("checkinPage.checkInForm.result") }}</div>
              <div class="col-md-8">
                <input class="input-primary medium" placeholder="Nhập kết quả" v-model="formCheckInMainResult.result" />
              </div>
            </div>
            <div class="row my-2">
              <div class="col-md-4 title">{{ $t("checkinPage.checkInForm.progress") }}</div>
              <div class="col-md-8">
                <input type="number" class="input-primary medium" placeholder="Nhập tiến độ" v-model="formCheckInMainResult.currentProgress" />
              </div> 
            </div>
            <div class="row my-2" v-for="(item, index) in questionsCompany" :key="index">
              <div class="col-md-4 title">{{ item.question }}</div>
              <div class="col-md-8">
                <textarea placeholder="Nhập trả lời" rows="4" class="w-100" v-if="item.orderNo == 1" v-model="formCheckInMainResult.answerFirst"></textarea>
                <textarea placeholder="Nhập trả lời" rows="4" class="w-100" v-if="item.orderNo == 2" v-model="formCheckInMainResult.answerSecond"></textarea>
                <textarea placeholder="Nhập trả lời" rows="4" class="w-100" v-if="item.orderNo == 3" v-model="formCheckInMainResult.answerThird"></textarea>
                <textarea placeholder="Nhập trả lời" rows="4" class="w-100" v-if="item.orderNo == 4" v-model="formCheckInMainResult.answerFourth"></textarea>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane label="Lịch sử" name="history">
            <div class="block mt-4" v-if="resultDetail && resultDetail.checkIn && resultDetail.checkIn.length">
              <el-timeline v-for="(item,index) in resultDetail.checkIn" :key="index">
                <el-timeline-item :timestamp="item.createdAt.slice(0,10)" placement="top">
                  <el-card>
                    <div>{{item.result ? item.result : 'Không có kết quả' }}</div>
                    <div><strong>Mức độ tự tin:</strong> {{ commonData.confidenceLevelDisplay[item.confidenceLevel] }}</div>
                    <div><strong>Tiến độ:</strong> {{ item.currentProgress }}%</div>
                    <div>Xem chi tiết</div>
                  </el-card>
                </el-timeline-item>
              </el-timeline>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
      <span slot="footer" class="dialog-footer">
        <button class="btn btn-standard btn-medium mr-3" @click="modalCheckInMainResult = false">
          Hủy
        </button>
        <button class="btn btn-primary btn-medium" @click="submitCheckInMainResult">
          Xác nhận
        </button>
      </span>
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
                <el-progress :percentage="item.currentProgress" :format="format" :color="customColorMethod"></el-progress>
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
import NoAvatar from "../../assets/imgs/no-images.jpg";
import _ from 'lodash';
export default {
  components: {},
  data() {
    return {
      NoAvatar,
      commonData,
      cycle: '',
      description: '',
      modalCheckIn: false,
      activeTab: "check-in",
      activeTabMainResult: "check-in",
      modalCreateGoal: false,
      modalViewMainResult: false,
      modalViewFeedback: false,
      modalViewRalation: false,
      modalCreateSubGoal: false,
      modalCreateMainResults: false,
      modalEditMainResult: false,
      modalDeleteMainResult: false,
      modalCheckInMainResult: false,
      modalReadMainResult: false,
      formCreate: {
        cycleId : '',
        userId : localStorage.getItem('userId'),
        higherUserId: '',
        name: '',
        linkPlan: null,
        confidenceLevel: 'fine',
        progressPercent: 0,
        image: null,
        isDelete: false,
        status: 'new'
      },
      formCheckIn: {
        goalId: '',
        result: '',
        confidenceLevel: '',
        currentProgress: 0,
        answerFirst: '',
        answerSecond: '',
        answerThird: '',
        answerFourth: '',
        isDelete: false
      },
      formCheckInMainResult: {
        goalId: '',
        resultId: null,
        result: '',
        confidenceLevel: '',
        currentProgress: 0,
        answerFirst: '',
        answerSecond: '',
        answerThird: '',
        answerFourth: '',
        isDelete: false
      },
      formCreateSubGoal: {
        name: '',
        isDelete: false
      },
      formCreateMainResult:{
        title: '',
        targetPercent: null,
        planLink: '',
        resultLink: '',
        isDelete: false
      },
      formEditMainResult:'',
      file: null,
      path: null,
      goalDetails: null,
      replyData: null,
      mainResult: null,
      checkInMainResultData: null,
      resultDetail: null,
      switchLayout: false,
      relationArray: [
        { GoalId: null, RelatedGoalId: null, Type: null  }
      ],
      loading: false,
      options: [],
      idTempMainResult: null,
    };
  },
  computed: {
    ...mapState({
      searchRequest: state => state.$_checkInUser.searchRequest,
    }),
    ...mapGetters({
      questionsCompany: "$_loginPage/getQuestionsCompany",
      cycleCompany: "$_loginPage/getCycleCompany",
      userCompany: "$_checkInUser/getUserList",
      goalList: "$_checkInUser/getGoalList",
      feedbackUser: "$_checkInUser/getUserList",
      evaluateCompany: "$_loginPage/getEvaluateCriteriaCompany",
      companyGoalList: "$_checkInUser/getCompanyGoalList",
    }),
  },
  async created() {
    var _this = this;
    const STORE_KEY = "$_checkInUser";
    if (!(STORE_KEY in this.$store._modules.root._children)) {
      _this.$store.registerModule(STORE_KEY, store);
    }
    await _this.$store.dispatch("$_checkInUser/getUserList");
    await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
    await _this.$store.dispatch("$_checkInUser/getAllGoalOfCompany");
  },
  methods: {
    async redirectToCardDetail(card){
      var _this = this;
      var boardIdOfCardGroup =  await _this.$store.dispatch("$_checkInUser/getBoardId", card.cardGroupId);
      var path = `/boardDetail/${boardIdOfCardGroup}?cardId=${card.id}`;
      window.open(path, "_blank");
    },
    clearRelation(){
      var _this = this;
      _this.relationArray = [
        { GoalId: null, RelatedGoalId: null, Type: null  }
      ]
    },
    clearRelationById(){
      var _this = this;
      _this.relationArray = [
        { GoalId: _this.updateRelationGoalId, RelatedGoalId: null, Type: null  }
      ]
    },
    addRelation(){
      var _this = this;
      _this.relationArray.push({
        GoalId: null, RelatedGoalId: null, Type: null
      });
    },
    addRelationById(){
      var _this = this;
      _this.relationArray.push({
        GoalId: _this.updateRelationGoalId, RelatedGoalId: null, Type: null
      });
    },
    handleCreateSubGoal(item){
      var _this = this;
      _this.formCreateSubGoal = _.cloneDeep(_this.formCreate);
      _this.formCreateSubGoal.userId = item.userId;
      _this.formCreateSubGoal.goalId = item.id;
      _this.formCreateSubGoal.cycleId = item.cycleId;
      _this.formCreateSubGoal.companyId = item.companyId;
      _this.formCreateSubGoal.higherUserId = item.higherUserId;
      _this.modalCreateSubGoal = true;
    },
    async confirmCreateSubGoal(){
      var _this = this;
      await _this.$store.dispatch("$_checkInUser/createSubGoal", _this.formCreateSubGoal);
      _this.modalCreateSubGoal = false;
      _this.formCreateSubGoal.userId = null;
      _this.formCreateSubGoal.goalId = null;
      _this.formCreateSubGoal.cycleId = null;
      _this.formCreateSubGoal.companyId = null;
      _this.formCreateSubGoal.higherUserId = null;
      await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
    },
    openModalCreateMainResult(item){
      var _this = this;
      _this.idTempMainResult = item.id
      _this.formCreateMainResult.goalId = item.id;
      _this.modalCreateMainResults = true;
    },
    async confirmCreateMainResult(){
      var _this = this;
      _this.formCreateMainResult.targetPercent = parseInt(_this.formCreateMainResult.targetPercent);
      await _this.$store.dispatch("$_checkInUser/createMainResult", _this.formCreateMainResult);
      _this.formCreateMainResult.goalId = null;
      _this.modalCreateMainResults = false;
      await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
      _this.mainResult = _.filter(_this.goalList, (o)=>{ return o.id === _this.idTempMainResult });
    },
    openModalEditMainResult(item, result){
      var _this = this;
      _this.idTempMainResult = item.id
      _this.formEditMainResult = _.cloneDeep(result);
      _this.modalEditMainResult = true;
    },
    async confirmEditMainResult(){
      var _this = this;
      _this.formEditMainResult.targetPercent = parseInt(_this.formEditMainResult.targetPercent);
      await _this.$store.dispatch("$_checkInUser/updateMainResult", _this.formEditMainResult);
      _this.modalEditMainResult = false;
      await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
      _this.mainResult = _.filter(_this.goalList, (o)=>{ return o.id === _this.idTempMainResult });
    },
    openModalDeleteMainResult(item, result){
      var _this = this;
      _this.idTempMainResult = item.id;
      _this.idDeleteMainResult = result.id;
      _this.modalDeleteMainResult = true;
    },
    async confirmDeleteMainResult(){
      var _this = this;
      await _this.$store.dispatch("$_checkInUser/deleteMainResult", _this.idDeleteMainResult);
      _this.modalDeleteMainResult = false;
      await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
      _this.mainResult = _.filter(_this.goalList, (o)=>{ return o.id === _this.idTempMainResult });
    },
    openModalCheckInMainResult(resultDetail){
      var _this = this;
      _this.resultDetail = _.cloneDeep(resultDetail);
      _this.formCheckInMainResult.goalId = resultDetail.goalId;
      _this.formCheckInMainResult.resultId = resultDetail.id;
      _this.formCheckInMainResult.companyId = resultDetail.companyId;
      _this.formCheckInMainResult.currentProgress = resultDetail.progressPercent;
      _this.formCheckInMainResult.confidenceLevel = resultDetail.confidenceLevel;
      _this.formCheckInMainResult.result = '',
      _this.formCheckInMainResult.answerFirst = '',
      _this.formCheckInMainResult.answerSecond = '',
      _this.formCheckInMainResult.answerThird = '',
      _this.formCheckInMainResult.answerFourth = '',
      _this.modalCheckInMainResult = true;
    },
    submitCheckInMainResult: _.debounce(async function () {
      var _this = this;
      try {
        var goalIdTemp = _this.formCheckInMainResult.goalId;
        _this.formCheckInMainResult.currentProgress = parseFloat(_this.formCheckInMainResult.currentProgress);
        await _this.$store.dispatch("$_checkInUser/editCheckInMainResult", _this.formCheckInMainResult);
        _this.$notify({
          title: "Chúc mừng",
          message: "Cập nhật thành công",
          type: "success",
        });
        _this.modalCheckInMainResult = false;
        _this.formCheckInMainResult = {
          goalId: '',
          resultId: null,
          confidenceLevel: '',
          currentProgress: 0,
          result: '',
          answerFirst: '',
          answerSecond: '',
          answerThird: '',
          answerFourth: '',
          isDelete: false
        };
        await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
        _this.modalViewMainResult = false;
        _this.handleModalMainResult(goalIdTemp);
      } catch (error) {
        _this.$notify.error({
          title: "Thất bại",
          message: "Cập nhật thất bại",
        });
      }
    }, 500),
    openModalReadMainResult(result){
      var _this = this;
      _this.checkInMainResultData = result.checkIn;
      _this.modalReadMainResult = true;
    },
    handleSwitchLayout(){
      var _this = this;
      _this.switchLayout = ! _this.switchLayout;
    },
    async handleSizeChange(val) {
      var _this = this;
      _this.searchRequest.pageSize = val;
      await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
    },
    async handleCurrentChange(val) {
      var _this = this;
      _this.searchRequest.pageIndex = val;
      await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
    },
    async handleSearch(){
      var _this = this;
      _this.searchRequest.description = _this.description;
      await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
    },
    async handleFilter(){
      var _this = this;
      _this.searchRequest.title = _this.cycle;
      await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
    },
    handleModalMainResult(val){
      var _this = this;
      _this.mainResult = _.filter(_this.goalList, (o)=>{ return o.id === val });
      _this.modalViewMainResult = true;
    },
    async handleModalViewFeedback(val){
      var _this = this;
      _this.replyData = _.filter(_this.goalList, (o)=>{ return o.id === val });
      _this.modalViewFeedback = true;
    },
    handleModalViewRalation(item){
      var _this = this;
      _this.updateRelationGoalId = item.id;
      if(item.relation && item.relation.length){
        _this.relationArray = [];
        _.forEach(item.relation, (o)=> {
          _this.relationArray.push({ GoalId: o.goalId, RelatedGoalId: o.relatedGoalId, Type: o.type });
        });
        _this.options = _.cloneDeep(_this.companyGoalList);
      }
      else
      {
        _this.clearRelationById();
      }
      _this.modalViewRalation = true;
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
    async handleFileUpload(e) {
      var _this = this;
      _this.file = e.target.files[0];
      if (_this.file) {
        var response = await this.$store.dispatch(
          "$_checkInUser/uploadImage",
          _this.file
        );
        if (response && response.path) {
          _this.path = response.path;
          _this.formCreate.image = _this.path;
        }
      } else {
        this.$notify.error({
          title: "Thất bại",
          message: "Ảnh k đúng định dạng",
        });
      }
    },
    format(percentage) {
      return percentage === 100 ? "Full" : `${percentage}%`;
    },
    handleOpenModalCheckIn(goalDetails) {
      var _this = this;
      _this.goalDetails = _.cloneDeep(goalDetails);
      _this.formCheckIn.goalId = goalDetails.id;
      _this.formCheckIn.companyId = goalDetails.companyId;
      _this.formCheckIn.currentProgress = goalDetails.progressPercent;
      _this.formCheckIn.confidenceLevel = goalDetails.confidenceLevel;
      _this.formCheckIn.result = '',
      _this.formCheckIn.answerFirst = '',
      _this.formCheckIn.answerSecond = '',
      _this.formCheckIn.answerThird = '',
      _this.formCheckIn.answerFourth = '',
      _this.modalCheckIn = true;
    },
    openCreateGoal(){
      var _this = this;
      _this.clearRelation();
      _this.modalCreateGoal = true;
    },
    submit: _.debounce(async function () {
      var _this = this;
      try {
        var response = await _this.$store.dispatch("$_checkInUser/editGoal", _this.formCreate);
        if(response && response.id){
          if(_this.relationArray && _this.relationArray.length && _this.relationArray[0].RelatedGoalId && _this.relationArray[0].Type){
            var relationArraySubmit = _.map(_this.relationArray, (o) => {
              o.GoalId = response.id;
              return o;
            });
            var arrayToString = JSON.stringify(relationArraySubmit);
            await _this.$store.dispatch("$_checkInUser/createRelation", arrayToString);
          }
        }
        _this.$notify({
          title: "Chúc mừng",
          message: "Cập nhật thành công",
          type: "success",
        });
        _this.modalCreateGoal = false;
        _this.formCreate = {
          cycleId : '',
          userId : localStorage.getItem('userId'),
          higherUserId: '',
          name: '',
          linkPlan: null,
          confidenceLevel: 'fine',
          progressPercent: 0,
          image: null,
          isDelete: false,
          status: 'new'
        };
        _this.clearRelation();
        await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
      } catch (error) {
        _this.$notify.error({
          title: "Thất bại",
          message: "Cập nhật thất bại",
        });
      }
    }, 500),
    submitCheckIn: _.debounce(async function () {
      var _this = this;
      try {
        _this.formCheckIn.currentProgress = parseFloat(_this.formCheckIn.currentProgress);
        await _this.$store.dispatch("$_checkInUser/editCheckIn", _this.formCheckIn);
        _this.$notify({
          title: "Chúc mừng",
          message: "Cập nhật thành công",
          type: "success",
        });
        _this.modalCheckIn = false;
        _this.formCheckIn = {
          goalId: '',
          confidenceLevel: '',
          currentProgress: 0,
          result: '',
          answerFirst: '',
          answerSecond: '',
          answerThird: '',
          answerFourth: '',
          isDelete: false
        };
        await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
      } catch (error) {
        _this.$notify.error({
          title: "Thất bại",
          message: "Cập nhật thất bại",
        });
      }
    }, 500),
    remoteMethod(query) {
        var _this = this;
        if (query !== '') {
          _this.loading = true;
          setTimeout(() => {
            _this.loading = false;
            _this.options = _this.companyGoalList.filter(item => {
              return item.name.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          _this.options = [];
        }
      },
    updateRelation: _.debounce(async function () {
      var _this = this;
      try {
          if(_this.relationArray && _this.relationArray.length && _this.relationArray[0].RelatedGoalId && _this.relationArray[0].Type){
            var arrayToString = JSON.stringify(_this.relationArray);
            await _this.$store.dispatch("$_checkInUser/createRelation", arrayToString);
          }
          _this.$notify({
            title: "Chúc mừng",
            message: "Cập nhật thành công",
            type: "success",
          });
        _this.modalViewRalation = false;
        _this.clearRelation();
        await _this.$store.dispatch("$_checkInUser/getGoalListOfUser");
      } catch (error) {
        _this.$notify.error({
          title: "Thất bại",
          message: "Cập nhật thất bại",
        });
      }
    }, 500),
  },
};
</script>
