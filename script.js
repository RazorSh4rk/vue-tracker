const app = new Vue({
    el: '#app',
    data: {
        records: dungeons,
        current: null,
        lastTime: 0,
        exported: '',
        search: '',
        confirmVisible: true
    },
    methods: {
        recordClick: function(index) {
            // start
            if(this.current == null) {
                this.current = {
                    object: this.records[index],
                    startTime: new Date(),
                    index: index
                }
            // stop
            } else {                
                this.lastTime = new Date().getTime() - this.current.startTime.getTime()
                this.records[index].times.push(this.lastTime)
                this.records[index].counter++
                this.current = null
            }
        },
        save: function() {
            window.localStorage.setItem('data', JSON.stringify(this.records))
        },
        load: function() {
            this.records = JSON.parse(window.localStorage.getItem('data'))
        },
        exp: function() {
            this.exported = JSON.stringify(this.records)
        },
        reset: function() {
            window.localStorage.removeItem('data')
        }
    },
    created: function() {
        let d = window.localStorage.getItem('data')
        if(d != null)
            this.records = JSON.parse(d)
    }
})
