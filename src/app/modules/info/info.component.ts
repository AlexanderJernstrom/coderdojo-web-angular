import { Component, OnInit } from '@angular/core'
import gql from 'graphql-tag'
import { Apollo } from 'apollo-angular'
import { ActivatedRoute } from '@angular/router'
import { GetPage, GetPageVariables } from 'src/graphql/__generated__/GetPage'
import { GET_PAGE } from 'src/graphql/GetPage'

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  page: any
  pageId: any
  constructor(private apollo: Apollo, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((param) => {
      this.pageId = param.get('pageId')
      this.fetchData()
    })
  }

  fetchData() {
    this.apollo
      .watchQuery<GetPage, GetPageVariables>({
        query: GET_PAGE,
        variables: {
          pageId: this.pageId,
        },
      })
      .valueChanges.subscribe(({ data }) => {
        this.page = data.page
      })
  }
}
